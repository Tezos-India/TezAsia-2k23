# Tezos DApp Backend Setup Guide

This guide will help you set up the backend for the Tezos DApp locally for development and testing purposes.

## Prerequisites

Before you start, make sure you have these installed:

- Node.js
- npm or Yarn
- PostgreSQL
- Prisma
- A code editor such as VS Code

## Instructions

### 1. Clone the repository

First, you need to clone the repository to your local machine. You can do this with the following command:

```bash
git clone <repository_url>
```

Replace `<repository_url>` with the URL of your Git repository.

### 2. Navigate to the project directory

```bash
cd <project_directory>
```

Replace `<project_directory>` with the name of the directory where your project is located.

### 3. Install dependencies

Next, install the project dependencies. If you're using `npm`, you can run:

```bash
npm install
```

If you're using `Yarn`, you can run:

```bash
yarn install
```

### 4. Configure the database

First, start your PostgreSQL server. Then, open `.env` and set the `DATABASE_URL` variable to match your database settings:

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"
```

Replace `<username>`, `<password>`, and `<database_name>` with your PostgreSQL username, password, and the name of your database.

### 5. Generate Prisma client

Next, generate the Prisma client by running:

```bash
npx prisma generate
```

or if you're using `yarn`, run:

```bash
yarn prisma generate
```

### 6. Apply database migrations

Then, apply the Prisma migrations to your database by running:

```bash
npx prisma db push
```

or if you're using `yarn`, run:

```bash
yarn prisma db push
```

### 7. Start the server

Finally, you can start the server. If you're using `npm`, you can run:

```bash
npm run start
```

If you're using `Yarn`, you can run:

```bash
yarn start
```

### 8. Visualize postgres DB with prisma

```bash
npx prisma studio
```


Your server should now be running at `http://localhost:5000`.

## Repository Structure and Components

### `src/`
The main source code for the backend.

#### `src/api/`
Controllers, services, and routes for users and games.

- `user/`: Handles user-related operations.
- `game/`: Manages game-related operations.

#### `src/config/`
Holds configuration files.

- `prisma.ts`: Prisma ORM configuration.
- `socketio.ts`: Socket.IO setup and configuration.

#### `src/middleware/`
Middleware components.

- `errorHandling.ts`: Error handling.
- `authentication.ts`: Authentication management.

#### `src/utils/`
Utility functions.

- `logger.ts`: Logging utility.

### `src/server.ts`
Main server file.

### `prisma/`
Prisma schema.

- `schema.prisma`: Database schema.

## Testing the APIs

You can now test the APIs using a tool like Postman or CURL. Examples:

- To create a user, send a POST request to `http://localhost:5000/user` with JSON:

```json
{
  "walletAddress": "<wallet_address>",
  "avatarName": "<avatar_name>"
}
```

- To get a user, send a GET request to `http://localhost:5000/user/<wallet_address>`, replacing `<wallet_address>` with the wallet address of the user.

## Conclusion

 Feel free to contribute and reach out with any questions or suggestions. Happy coding!

---