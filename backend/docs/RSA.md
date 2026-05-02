Here’s a complete **README.md** file in English that explains how to generate a new RSA key pair using OpenSSL. You can place this file in your project (for example, `docs/README-RSA.md`) so that anyone working on **prodmate-backend** knows how to create and manage keys.

---

# Generating RSA Key Pair with OpenSSL

This guide explains how to generate a new RSA public/private key pair using **OpenSSL**.  
These keys will be used in the `prodmate-backend` project for signing and verifying JWT tokens with the **RS256** algorithm.

---

## Prerequisites

- Install **OpenSSL** on your system:
  - **Linux/macOS**: OpenSSL is usually pre-installed. If not, install via your package manager:
    - Ubuntu/Debian: `sudo apt install openssl`
    - macOS (Homebrew): `brew install openssl`
  - **Windows**: Download from [https://slproweb.com/products/Win32OpenSSL.html](https://slproweb.com/products/Win32OpenSSL.html)

---

## Step 1: Generate a Private Key

Run the following command to generate a 2048-bit RSA private key:

```bash
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048
```

- `genpkey -algorithm RSA`: generates an RSA key.
- `-out private.pem`: saves the private key to `private.pem`.
- `rsa_keygen_bits:2048`: sets the key length to 2048 bits (recommended).  
  For stronger security, you can use 4096 bits:  
  ```bash
  openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:4096
  ```

---

## Step 2: Extract the Public Key

Once you have the private key, generate the corresponding public key:

```bash
openssl rsa -pubout -in private.pem -out public.pem
```

- `-in private.pem`: reads the private key.
- `-pubout`: outputs the public key.
- `-out public.pem`: saves the public key to `public.pem`.

---

## Step 3: Verify the Keys

You can check the contents of the generated files:

```bash
cat private.pem
cat public.pem
```

Expected output:
- `private.pem` starts with `-----BEGIN PRIVATE KEY-----`
- `public.pem` starts with `-----BEGIN PUBLIC KEY-----`

---

## Step 4: Security Recommendations

- **Do not commit `private.pem`** to version control (GitHub, GitLab, etc.).
- Add `private.pem` to `.gitignore`.
- Store the private key securely (e.g., environment variables, secret manager).
- The **public key** can be safely committed, since it is only used for verification.

---

## Step 5: Usage in Project

- Use `private.pem` to **sign JWT tokens**.
- Use `public.pem` to **verify JWT tokens**.
- Configure your project to load these files from `src/config/keys/`.

---

## Example Commands Recap

```bash
# Generate private key (2048-bit)
openssl genpkey -algorithm RSA -out private.pem -pkeyopt rsa_keygen_bits:2048

# Extract public key
openssl rsa -pubout -in private.pem -out public.pem
```

---

## Notes

- RSA 2048-bit is secure for most applications. Use 4096-bit for higher security needs.
- Always protect your private key. Treat it like a password.
- If your private key is compromised, regenerate a new key pair immediately.
