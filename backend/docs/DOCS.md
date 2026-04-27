# Project Documentation Overview

This document provides an overview of the documentation structure for the Todo API backend project.  
It serves as the entry point for all technical and architectural references stored in the `docs/` directory.

---

## Documentation Structure

```
docs/
├── DOCS.md                  # Overview of documentation (this file)
├── api/                     # API specifications and examples
│   ├── openapi.yaml         # OpenAPI/Swagger specification
│   ├── endpoints.md         # Human-readable API endpoints overview
│   └── todo-api-examples.json # Example request bodies for Postman testing
├── architecture/            # System design and architecture diagrams
│   ├── erd-diagram.md       # Entity Relationship Diagram (ERD)
│   └── system-design.md     # Flowchart of request processing
├── guides/                  # Setup and deployment guides
│   ├── setup.md             # Development environment setup guide
│   └── deployment.md        # Deployment instructions (production)
└── changelog/               # Version history and release notes
└── CHANGELOG.md
```

---

## Contents

### 1. API Documentation (`docs/api/`)
- **openapi.yaml**: Full OpenAPI specification for Swagger UI and Postman import.
- **endpoints.md**: Overview of all API endpoints, parameters, and responses.
- **todo-api-examples.json**: Example request bodies for `POST` and `PUT` endpoints.

### 2. Architecture (`docs/architecture/`)
- **erd-diagram.md**: Entity Relationship Diagram (ERD) with Mermaid script.
- **system-design.md**: Flowchart showing request flow from Client → API → Controller → Service → Database.

### 3. Guides (`docs/guides/`)
- **setup.md**: Step-by-step instructions to set up the backend environment.
- **deployment.md**: Instructions for deploying the backend to production environments.

### 4. Changelog (`docs/changelog/`)
- **CHANGELOG.md**: Version history, release notes, and major updates.

---

## Usage Notes

- Use **`openapi.yaml`** to import API definitions into Swagger UI or Postman.
- Refer to **`todo-api-examples.json`** for ready-to-use request bodies when testing endpoints.
- Diagrams in **`architecture/`** are written in Mermaid syntax and can be rendered in GitHub, VSCode (with Mermaid plugin), or Obsidian.
- Guides in **`guides/`** provide setup and deployment instructions for developers and DevOps engineers.
- Keep **`DOCS.md`** updated whenever new documentation files are added.

---

## Best Practices

- Always keep documentation in sync with code changes.
- Push documentation files to Git for team collaboration.
- Use consistent naming conventions (`api/`, `architecture/`, `guides/`, `changelog/`).
- Keep sensitive information (like `.env` values) out of documentation.

---
