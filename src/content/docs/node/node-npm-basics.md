---
title: NPM Basics
description: Learn how to manage packages and dependencies using NPM.
---

# NPM (Node Package Manager)

NPM is the world's largest software registry. It is installed automatically when you install Node.js.

## Initializing a Project
To start a new project, run:
```bash
npm init
```
This creates a `package.json` file which tracks your dependencies. You can also use `npm init -y` to skip the questions and use defaults.

## Installing Packages
- **Local installation** (for use in your project):
  ```bash
  npm install lodash
  ```
- **Development installation** (only for testing/building):
  ```bash
  npm install --save-dev nodemon
  ```
- **Global installation** (to use as a command line tool):
  ```bash
  npm install -g vercel
  ```

## Working with Scripts
You can define custom scripts in `package.json`:
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
Run them using `npm run <name>`, e.g., `npm run dev`.

> [!CAUTION]
> Avoid committing the `node_modules` folder to Git. Always use a `.gitignore` file to exclude it.
