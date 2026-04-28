import {
  Request,
  Response,
  NextFunction
} from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";


const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";


export async function autoRefresh(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No access token provided"
    });
  }

  const accessToken = authHeader.split(" ")[ 1 ];
  try {
    // verify access token
    const decoded = jwt.verify(accessToken, JWT_SECRET) as { id: number; role: string };
    (req as any).user = decoded;
    return next();
  } catch (error: any) {
    // if token expired, try refresh
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.headers[ "x-refresh-token" ] as string;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "No refresh token provided"
        });
      }

      try {
        const storedToken = await prisma.refreshToken.findUnique({
          where: { token: refreshToken }
        });

        if (!storedToken || storedToken.expiresAt < new Date()) {
          return res.status(401).json({
            success: false,
            message: "Refresh token invalid or expired"
          });
        }

        const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number };

        const user = await prisma.user.findUnique({
          where: { id: decodedRefresh.id }
        });

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "User not found"
          });
        }

        // issue new access token
        const newAccessToken = jwt.sign(
          { id: user.id, role: user.role },
          JWT_SECRET,
          { expiresIn: "45m" }
        );
        (req as any).user = { id: user.id, role: user.role };

        // attach new token to response header
        res.setHeader("x-access-token", newAccessToken);

        return next();
      } catch (refreshError) {
        return res.status(401).json({
          success: false,
          message: "Failed to refresh token"
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token"
    });
  }
}
