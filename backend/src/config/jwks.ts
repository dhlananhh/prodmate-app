import {
  importSPKI,
  exportJWK
} from "jose";
import fs from "fs";
import path from "path";
import jwkToPem from "jwk-to-pem";


/**
 * Load the public key from PEM file
 * - Ensure you have placed public.pem in src/config/keys/
 */
const publicKeyPath = path.join(__dirname, "keys", "public.pem");
const publicKeyPem = fs.readFileSync(publicKeyPath, "utf8");


/**
 * Convert PEM public key to JWKS format
 */
export async function getJWKS() {
  // Convert PEM string to CryptoKey
  const cryptoKey = await importSPKI(publicKeyPem, "RS256");

  // Export CryptoKey to JWK
  const jwk = await exportJWK(cryptoKey);

  return {
    keys: [
      {
        ...jwk,
        kid: "prodmate-key", // Key ID (customize if you rotate keys)
        use: "sig",          // Usage (signature)
        alg: "RS256",        // Algorithm
      },
    ],
  };
}


/**
 * Convert JWK to PEM format
 * - Useful for frontend or other services that use jsonwebtoken.verify()
 */
export async function getPublicKeyPEM(): Promise<string> {
  const cryptoKey = await importSPKI(publicKeyPem, "RS256");
  const jwk = await exportJWK(cryptoKey);

  // ép kiểu để phù hợp với jwk-to-pem
  const rsaJwk = {
    kty: "RSA" as const,
    n: jwk.n!,
    e: jwk.e!,
  };

  return jwkToPem(rsaJwk); // Convert JWK → PEM
}
