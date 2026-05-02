import bcrypt from "bcrypt";


const SALT_ROUNDS = 10;


/**
 * generate a random 6-digit numeric code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


/**
 * hash the verification code for secure storage
 */
export async function hashVerificationCode(code: string): Promise<string> {
  return bcrypt.hash(code, SALT_ROUNDS);
}


/**
 * verify a code against its hash
 */
export async function verifyCode(
  code: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(code, hash);
}
