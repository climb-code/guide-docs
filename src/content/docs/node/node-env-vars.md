---
title: Environment Variables & Configuration
description: Managing application settings and secrets using environment variables in Node.js.
---

# Environment Variables & Configuration

Environment variables allow you to separate your application's code from its configuration. This is essential for managing secrets (like API keys) and changing settings based on the environment (development, staging, production).

## 1. Why use Environment Variables?
- **Security**: Prevent hardcoding sensitive credentials in source code.
- **Flexibility**: Run the same code with different settings across multiple environments.
- **Standardization**: Most deployment platforms (Heroku, AWS, Docker) use environment variables for configuration.

## 2. Using `dotenv`
The `dotenv` package is the standard way to load environment variables from a `.env` file into `process.env`.

### Installation
```bash
npm install dotenv
```

### Creating a `.env` file
Create a file named `.env` in the root of your project:
```text
PORT=5000
DB_URL=mongodb://localhost:27017/myapp
API_KEY=your_secret_api_key
```

### Loading Variables
```javascript
import 'dotenv/config';

const port = process.env.PORT || 3000;
console.log(`Server will run on port: ${port}`);
console.log(`Database URL: ${process.env.DB_URL}`);
```

## 3. Best Practices
- **Never commit `.env` files**: Add `.env` to your `.gitignore` file to prevent secrets from being leaked to version control.
- **Use `.env.example`**: Create a template file with dummy values to show other developers what variables are needed.
- **Validation**: Use libraries like `envalid` or `joi` to ensure all required variables are present and correctly formatted at startup.

> [!WARNING]
> Storing secrets in plain text in `.env` files is only safe if access to the server and version control is restricted. For highly sensitive environments, consider using secret management services like AWS Secrets Manager or HashiCorp Vault.
