import { prisma } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email";


const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";
const RESET_SECRET = process.env.RESET_SECRET || "resetsecret";


/**
 * register a new user
 */
export async function registerUser(
  email: string,
  username: string,
  password: string,
  name?: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, username, password: hashedPassword, name }
  });
}


/**
 * login a user (email or username)
 */
export async function loginUser(
  identifier: string,
  password: string
) {
  // identifier can be email or username
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: identifier }
      ]
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "45m" }
  )

  const refreshToken = jwt.sign(
    { id: user.id },
    REFRESH_SECRET,
    { expiresIn: "7d" }
  )

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  return {
    accessToken,
    refreshToken,
    user
  };
}


/**
 * refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string) {
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken }
  });

  if (!storedToken) {
    throw new Error("Invalid refresh token");
  }

  if (storedToken.expiresAt < new Date()) {
    await prisma.refreshToken.delete({
      where: { token: refreshToken }
    });
    throw new Error("Refresh token expired");
  }

  const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number };

  const user = await prisma.user.findUnique({
    where: { id: decoded.id }
  })

  if (!user) {
    throw new Error("User not found");
  }

  const newAccessToken = jwt.sign(
    { id: user?.id, role: user?.role },
    JWT_SECRET,
    { expiresIn: "45m" }
  )

  return { accessToken: newAccessToken };
}


export async function sendResetEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }

  const token = jwt.sign(
    { id: user.id },
    RESET_SECRET,
    { expiresIn: "45m" }
  );

  const resetLink = `http://localhost:4000/reset-password?token=${token}`;
  await sendEmail(
    email,
    "Password Reset",
    `Click here to reset your password: ${resetLink}`
  );
}


export async function resetUserPassword(
  token: string,
  newPassword: string
) {
  const decoded = jwt.verify(token, RESET_SECRET) as { id: number };
  const storedToken = await prisma.refreshToken.findUnique({
    where: { token }
  });

  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error("Reset token invalid or expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: decoded.id },
    data: { password: hashedPassword }
  });

  await prisma.refreshToken.delete({ where: { token } });
}
