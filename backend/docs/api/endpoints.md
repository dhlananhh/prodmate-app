# Todo API Endpoints

This document provides an overview of all available endpoints in the Todo API, including standalone todos, todos linked to habits, and todos linked to events.

---

## Standalone Todos

### GET /todos
- **Description:** Retrieve all todos.
- **Response:** Returns an array of todos.

### GET /todos/{id}
- **Description:** Retrieve a single todo by its ID.
- **Parameters:**
  - `id` (integer, required): The ID of the todo.
- **Response:** Returns the todo object if found, otherwise 404.

### POST /todos
- **Description:** Create a new standalone todo.
- **Request Body:**
  - `title` (string, required)
  - `description` (string, optional)
  - `deadline` (string, ISO 8601 datetime, optional)
  - `priority` (string, enum: low, medium, high, required)
  - `status` (string, enum: pending, in-progress, completed, required)
- **Response:** Returns the created todo object.

### PUT /todos/{id}
- **Description:** Update an existing standalone todo by ID.
- **Parameters:**
  - `id` (integer, required)
- **Request Body:** Same as POST /todos.
- **Response:** Returns the updated todo object.

### DELETE /todos/{id}
- **Description:** Delete a standalone todo by ID.
- **Parameters:**
  - `id` (integer, required)
- **Response:** Returns 204 if deleted successfully, otherwise 404.

---

## Habit Todos

### POST /habits/{habitId}/todos
- **Description:** Create a new todo linked to a specific habit.
- **Parameters:**
  - `habitId` (integer, required): The ID of the habit.
- **Request Body:** Same as POST /todos.
- **Response:** Returns the created todo object linked to the habit.

### PUT /habits/{habitId}/todos/{todoId}
- **Description:** Update a todo linked to a specific habit.
- **Parameters:**
  - `habitId` (integer, required)
  - `todoId` (integer, required)
- **Request Body:** Same as POST /todos.
- **Response:** Returns the updated todo object.

### DELETE /habits/{habitId}/todos/{todoId}
- **Description:** Delete a todo linked to a specific habit.
- **Parameters:**
  - `habitId` (integer, required)
  - `todoId` (integer, required)
- **Response:** Returns 204 if deleted successfully, otherwise 404.

---

## Event Todos

### POST /events/{eventId}/todos
- **Description:** Create a new todo linked to a specific event.
- **Parameters:**
  - `eventId` (integer, required): The ID of the event.
- **Request Body:** Same as POST /todos.
- **Response:** Returns the created todo object linked to the event.

### PUT /events/{eventId}/todos/{todoId}
- **Description:** Update a todo linked to a specific event.
- **Parameters:**
  - `eventId` (integer, required)
  - `todoId` (integer, required)
- **Request Body:** Same as POST /todos.
- **Response:** Returns the updated todo object.

### DELETE /events/{eventId}/todos/{todoId}
- **Description:** Delete a todo linked to a specific event.
- **Parameters:**
  - `eventId` (integer, required)
  - `todoId` (integer, required)
- **Response:** Returns 204 if deleted successfully, otherwise 404.

---

## Notes
- All request bodies must be in JSON format.
- `deadline` must follow ISO 8601 datetime format (e.g., `2026-04-30T18:00:00.000Z`).
- `priority` values: `low`, `medium`, `high`.
- `status` values: `pending`, `in-progress`, `completed`.
