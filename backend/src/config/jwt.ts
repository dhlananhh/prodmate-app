import jwt, { SignOptions } from "jsonwebtoken"
import { privateKey, publicKey } from "./keys"


export function signToken(
  payload: object,
  options?: SignOptions
): string {
  return jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    ...(options || {}),
  });
}


export function verifyToken<T>(token: string): T {
  return jwt.verify(token, publicKey, {
    algorithms: [ "RS256" ]
  }) as T;
}
