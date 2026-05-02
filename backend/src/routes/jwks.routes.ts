import { Router } from "express";
import {
  getJWKS,
  getPublicKeyPEM
} from "../config/jwks";


const router = Router();


// Expose JWKS at a standard endpoint
router.get("/.well-known/jwks.json", (req, res) => {
  res.json(getJWKS());
});

// PEM endpoint
// for frontend verification, use JSON Web Token to easily verify JWT
router.get("/.well-known/jwks.pem", async (req, res) => {
  const pem = await getPublicKeyPEM();
  res.type("text/plain").send(pem);
});


export default router;
