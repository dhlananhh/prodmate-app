import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  database: "prodmate_db",
  connectionLimit: 20,
  connectTimeout: 20000,
})

export const prisma = new PrismaClient({ adapter })
