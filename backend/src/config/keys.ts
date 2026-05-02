import fs from "fs";
import path from "path";
import env from "./env";


const privateKeyPath = env.PRIVATE_KEY_PATH || path.join(__dirname, "keys/private.pem");
const publicKeyPath = env.PUBLIC_KEY_PATH || path.join(__dirname, "keys/public.pem");

let privateKey: string;
let publicKey: string;


try {
  privateKey = fs.readFileSync(privateKeyPath, "utf8");
} catch (error) {
  throw new Error(`❌ Cannot read private key at ${privateKeyPath}: ${(error as Error).message}`);
}

try {
  publicKey = fs.readFileSync(publicKeyPath, "utf8");
} catch (err) {
  throw new Error(`❌ Cannot read public key at ${publicKeyPath}: ${(err as Error).message}`);
}


export {
  privateKey,
  publicKey
};
