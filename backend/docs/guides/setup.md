# Backend Setup Guide

This guide provides step-by-step instructions to set up the backend environment for the Todo API project.

---

## 1. Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version >= 18.x)
- **npm** or **yarn** (latest stable version)
- **PostgreSQL** (version >= 14.x)
- **Git** (for version control)
- **VSCode** or any preferred IDE

---

## 2. Project Structure

```
backend/
├── src/
│   ├── controllers/       # Handle incoming requests
│   ├── routes/            # Define API routes
│   ├── services/          # Business logic
│   ├── prisma/            # Prisma schema and client
│   └── index.ts           # Entry point
├── docs/                  # Documentation
│   ├── api/
│   ├── architecture/
│   └── guides/
├── package.json
├── tsconfig.json
└── .env
```

---

## 3. Clone the Repository

```bash
git clone https://github.com/your-org/todo-api-backend.git
cd todo-api-backend/backend
```

---

## 4. Install Dependencies

```bash
npm install
# or
yarn install
```

---

## 5. Configure Environment Variables

Create a `.env` file in the `backend/` directory with the following content:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"
PORT=3000
NODE_ENV=development
```

- Replace `username`, `password`, and `todo_db` with your actual PostgreSQL credentials and database name.

---

## 6. Setup Database with Prisma

1. Initialize Prisma schema:
   ```bash
   npx prisma init
   ```

2. Define models in `prisma/schema.prisma` (Todo, Habit, Event).

3. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

---

## 7. Run the Development Server

```bash
npm run dev
```

- The server will start at `http://localhost:3000/api`.

---

## 8. API Documentation

- **OpenAPI specification:** `docs/api/openapi.yaml`
- **Endpoints overview:** `docs/api/endpoints.md`
- **Example request bodies:** `docs/api/todo-api-examples.json`

---

## 9. Testing with Postman

1. Import `docs/api/openapi.yaml` into Postman.
2. Use `docs/api/todo-api-examples.json` for request bodies.
3. Test endpoints such as:
   - `POST /todos`
   - `POST /habits/{habitId}/todos`
   - `POST /events/{eventId}/todos`

---

## 10. Deployment Notes

- For production, set `NODE_ENV=production`.
- Use a managed PostgreSQL service (e.g., AWS RDS, Supabase).
- Configure environment variables securely.
- Run migrations before starting the server:
  ```bash
  npx prisma migrate deploy
  ```

---

## Notes

- Always keep `.env` out of version control (`.gitignore`).
- Update `docs/` regularly to keep API documentation in sync.
- Use ESLint and Prettier for code formatting and linting.
