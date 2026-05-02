import crypto from "crypto";

export function generateResetSecret(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

const RESET_SECRET = generateResetSecret();
console.log(RESET_SECRET);
