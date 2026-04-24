# ProdMate API

ProdMate API is a backend service built with **Node.js + Express + TypeScript**, using **MariaDB (via Prisma ORM)** for data persistence.  
It provides endpoints to manage **Todos, Habits, and Events**, with integrated **Swagger UI** for API documentation.

---

## 🚀 Tech Stack
- **Node.js / Express** – Web framework
- **TypeScript** – Strongly typed language
- **Prisma ORM** – Database management
- **MariaDB** – Relational database
- **Helmet + CORS** – Security and cross-origin support
- **Morgan + Winston** – Logging
- **Swagger UI + swagger-jsdoc** – API documentation

---

## 📦 Installation

### Clone repository

```bash
git clone https://github.com/your-repo/prodmate-api.git
cd prodmate-api
```

### Install dependencies
npm install

### Configure environment

```bash
cp .env.example .env
```

Edit .env to match your local setup (DB_URL, NODE_ENV, PORT, JWT_SECRET, etc.)

### Development (auto reload with ts-node-dev)
npm run dev

### Build TypeScript -> JavaScript
npm run build

### Start server (production)
npm start

### Type-check project
npm run type-check

### Prisma migration
npx prisma migrate dev --name init

### Prisma Studio (UI for DB management)
npx prisma studio

---

## 📌 API Endpoints

### Root
- `GET /` → API information

### Health
- `GET /api/health` → Server health check

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

---

## 📖 Swagger Documentation

Swagger UI is available at: `http://localhost:3000/api-docs`

Here you can explore all endpoints, schemas, and test API calls interactively.

--- 

## 🔒 Authentication & Authorization (Upcoming)

Future enhancements will include:
- User table (email, username, password hash, role)
- Signup / Login endpoints
- JWT-based authentication
- Role-based authorization

---

## 📝 Notes
- Always run `npm run type-check` to ensure TypeScript type safety.
- For production, use `npm run build` + `npm start`.
- Consider Docker or PM2 for process management in deployment.

---

## 👩🏻‍💻 Author
- ProdMate Backend – Developed and maintained solely by Lan Anh
- Contact: dhlananh2309@gmail.com
