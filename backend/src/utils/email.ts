import nodemailer from "nodemailer";
import env from "../config/env";


export async function sendEmail(
  to: string,
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: false
  });

  await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text
  });
}
