import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prodmate Backend API",
      version: "1.0.0",
      description: "API documentation for Prodmate backend",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearbearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
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
        HabitWithTodoInput: {
          type: "object",
          required: [ "name", "todo" ],
          properties: {
            name: { type: "string", example: "Morning Routine" },
            todo: { $ref: "#/components/schemas/TodoInput" }
          }
        },
        HabitWithEventInput: {
          type: "object",
          required: [ "name", "event" ],
          properties: {
            name: { type: "string", example: "Morning Routine" },
            description: { type: "string", example: "Daily morning routine with meditation" },
            frequency: { type: "string", enum: [ "daily", "weekly", "monthly" ], example: "daily" },
            startDate: { type: "string", format: "date", example: "2026-05-01" },
            endDate: { type: "string", format: "date", example: "2026-06-01" },
            status: { type: "string", enum: [ "active", "paused", "completed" ], example: "active" },
            event: {
              type: "object",
              required: [ "title", "date", "type", "status" ],
              properties: {
                title: { type: "string", example: "Meditation Session" },
                description: { type: "string", example: "15 minutes of mindfulness meditation" },
                date: { type: "string", format: "date-time", example: "2026-05-01T06:30:00Z" },
                type: { type: "string", enum: [ "personal", "work", "health", "other" ], example: "health" },
                status: { type: "string", enum: [ "scheduled", "completed", "cancelled" ], example: "scheduled" },
                location: { type: "string", example: "Home living room" },
                notes: { type: "string", example: "Prepare a quiet space" },
                startDate: { type: "string", format: "date-time", example: "2026-05-01T06:30:00Z" },
                endDate: { type: "string", format: "date-time", example: "2026-05-01T07:00:00Z" },
                frequency: { type: "string", enum: [ "once", "daily", "weekly", "monthly" ], example: "once" }
              }
            }
          }
        },
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [ "./src/routes/*.ts" ],
}

const swaggerSpec = swaggerJsdoc(options);


export const setupSwagger = (app: Application) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
}
