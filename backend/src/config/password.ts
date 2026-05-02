import bcrypt from "bcrypt";


const SALT_ROUNDS = 10;


/**
 * hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}


/**
 * verify password
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
