---
title: Express.js with TypeScript
description: Learn how to set up and use TypeScript with Express.js for strong typing and better developer experience.
---

Using TypeScript with Express.js brings static typing to your backend application, improving code quality, autocomplete in editors, and early error detection during development.

## Setup and Installation

First, initialize a new Node.js project and install the necessary dependencies:

```bash
npm init -y
npm install express
npm install -D typescript @types/node @types/express ts-node
```

- `typescript`: The TypeScript compiler.
- `@types/node` & `@types/express`: Type definitions for Node.js and Express.
- `ts-node`: An execution environment that runs TypeScript directly.

## Configuring TypeScript

Initialize a `tsconfig.json` file in your project root:

```bash
npx tsc --init
```

Update your `tsconfig.json` with recommended settings for Express:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Creating a Basic Server

Create a `src` directory and add an `index.ts` file:

```typescript
import express, { Request, Response, Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

Notice how we use the `Request`, `Response`, and `Application` types provided by `@types/express` to strongly type our application.

## Running the Application

You can use `ts-node` to run the application during development. Add the following scripts to your `package.json`:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "build": "tsc"
}
```

Now you can run the development server:

```bash
npm run dev
```

For production, you should build the project using `npm run build` and then run the compiled JavaScript file.

## Extending the Request Object

A common pattern in Express is attaching custom properties to the `Request` object (e.g., user data from authentication middleware). To do this in TypeScript, you need to use Declaration Merging:

Create a `types/express/index.d.ts` file:

```typescript
import { User } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Assuming you have a User model or interface
    }
  }
}
```

This allows you to safely access `req.user` in your route handlers without TypeScript throwing errors.
