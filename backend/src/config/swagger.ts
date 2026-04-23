import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prodmate Backend API",
      version: "1.0.0",
      description: "API documentation for Todos, Habits, Events",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Buy groceries" },
            completed: { type: "boolean", example: false },
            userId: { type: "integer", example: 1 }
          }
        },
        TodoInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Buy groceries" },
            completed: { type: "boolean", example: false }
          },
          required: [ "title" ]
        },
        Habit: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "Drink 2 liters of water" },
            frequency: { type: "string", example: "daily" },
            userId: { type: "integer", example: 1 }
          }
        },
        HabitInput: {
          type: "object",
          properties: {
            name: { type: "string", example: "Drink 2 liters of water" },
            frequency: { type: "string", example: "daily" }
          },
          required: [ "name", "frequency" ]
        },
        Event: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Team meeting" },
            description: { type: "string", example: "Discuss project progress" },
            date: { type: "string", format: "date-time", example: "2026-04-22T10:00:00Z" },
            userId: { type: "integer", example: 1 }
          }
        },
        EventInput: {
          type: "object",
          properties: {
            title: { type: "string", example: "Team meeting" },
            description: { type: "string", example: "Discuss project progress" },
            date: { type: "string", format: "date-time", example: "2026-04-22T10:00:00Z" }
          },
          required: [ "title", "date" ]
        },
      }
    },
  },
  apis: [ "./src/routes/*.ts" ],
}

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
