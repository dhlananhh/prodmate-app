# ProdMate Backend

ProdMate API is a backend service built with **Node.js + Express + TypeScript**, using **MariaDB (via Prisma ORM)** for data persistence.  
It provides endpoints to manage **Users, Todos, Habits, and Events**, with integrated **Swagger UI** for API documentation and **OpenTelemetry** for observability.

---

## 🚀 Tech Stack
- **Node.js / Express** – Web framework
- **TypeScript** – Strongly typed language
- **Prisma ORM** – Database management
- **MariaDB** – Relational database
- **Helmet + CORS** – Security and cross-origin support
- **Morgan + Winston** – Logging
- **Swagger UI + swagger-jsdoc** – API documentation
- **OpenTelemetry** – Monitoring and tracing
- **Nodemailer** – Email sending via SMTP

---

## 📦 Installation

### Clone repository

```bash
git clone https://github.com/your-repo/prodmate-backend.git
cd prodmate-backend
```

### Install dependencies

```bash
npm install
```

### Configure environment

```bash
cp .env.example .env
```

Edit `.env` to match your local setup (DATABASE_URL, NODE_ENV, PORT, JWT_SECRET, PRIVATE_KEY_PATH, PUBLIC_KEY_PATH, SMTP_HOST, SMTP_PORT, EMAIL_FROM, etc.).

---

## 🛠️ Development

Run the server with auto reload:

```bash
npm run dev
```

---

## 🔨 Build & Run (Production)

⚠️ **Important**: Before building and starting the server, make sure you already have or have generated two RSA key files:

- `src/config/keys/private.pem` (private key)
- `src/config/keys/public.pem` (public key)

If you don’t know how to generate RSA keys, please refer to the detailed guide in [RSA.md](./docs/RSA.md)

Once the keys are in place, run:

```bash
npm run copy-keys
```

Then build and start the server:

```bash
npm run build
npm start
```

## 🔖 Useful Commands

- **Type-check project**:

```bash
npm run type-check
```

- **Prisma migration**:

```bash
npx prisma migrate dev --name init
```

- **Prisma Studio (UI for DB management)**:

```bash
npx prisma studio
```

---

## 📌 API Endpoints

### Root
- `GET /` → API information

### Health
- `GET /api/health` → Server health check

### Users
- `POST /api/users/register` → Register new user  
- `POST /api/users/login` → Login user  
- `POST /api/users/refresh` → Refresh token  
- `POST /api/users/forgot-password` → Send reset email  
- `POST /api/users/reset-password` → Reset password  

### Todos
- `GET /api/todos` → Get all todos
- `POST /api/todos` → Create a new todo
- `GET /api/todos/{id}` → Get todo by ID
- `PUT /api/todos/{id}` → Update todo by ID
- `DELETE /api/todos/{id}` → Delete todo by ID

### Habits
- `GET /api/habits` → Get all habits
- `POST /api/habits` → Create a new habit
- `GET /api/habits/{id}` → Get habit by ID
- `PUT /api/habits/{id}` → Update habit by ID
- `DELETE /api/habits/{id}` → Delete habit by ID

### Events
- `GET /api/events` → Get all events
- `POST /api/events` → Create a new event
- `GET /api/events/{id}` → Get event by ID
- `PUT /api/events/{id}` → Update event by ID
- `DELETE /api/events/{id}` → Delete event by ID

### Metrics
- `GET /metrics` → Retrieve traces from OpenTelemetry logs  

---

## 📖 Swagger Documentation

Swagger UI is available at: `http://localhost:4000/api-docs`

Here you can explore all endpoints, schemas, and test API calls interactively.

--- 

## 🔑 RSA Key Management

To generate and manage RSA keys for JWT authentication, please refer to the detailed guide in: [RSA.md](./docs/RSA.md)

This document explains how to create a new RSA key pair using OpenSSL, security recommendations, and how to configure the keys in the project.

---

## 🔒 Authentication & Authorization

- JWT-based authentication (RS256 with RSA keys)
- Role-based authorization

---

## 📝 Notes

- Always run `npm run type-check` to ensure TypeScript type safety.
- For production, ensure RSA keys exist, then use command `npm run copy-keys && npm run build && npm start`.
- Consider Docker or PM2 for process management in deployment.

---

## 👩🏻‍💻 Author
- ProdMate Backend – Developed and maintained by **Lan Anh**

- Contact: 

<div align="left">
  <a href="mailto:dhlananh2309@gmail.com" target="_blank">
    <img
      src="https://img.shields.io/badge/Gmail-dhlananh2309@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white"
      alt="Gmail"
    />
  </a>
  <a href="https://github.com/dhlananhh" target="_blank">
    <img
      src="https://img.shields.io/badge/GitHub-dhlananhh-blue?style=for-the-badge&logo=github"
      alt="Github"
    />
  </a>
</div>

---
