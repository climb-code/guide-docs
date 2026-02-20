---
title: Hello World & REPL
description: Learn how to run your first Node.js script and use the REPL.
---

# Hello World & REPL

Getting started with Node.js is easy. In this guide, we will run our first script and explore the interactive terminal.

## Run Your First Script

1.  **Create a file** named `app.js`.
2.  **Add the following code**:
    ```javascript
    console.log("Hello, Node.js!");
    ```
3.  **Run it** from your terminal:
    ```bash
    node app.js
    ```

You should see `Hello, Node.js!` printed in your console.

## The REPL (Read-Eval-Print Loop)

The REPL is an interactive environment where you can execute JavaScript code line by line. It's great for testing small snippets.

### How to use it:
1.  Open your terminal and type `node`.
2.  Start typing JavaScript:
    ```javascript
    > 2 + 2
    4
    > const name = "Antigravity"
    undefined
    > `Hello ${name}`
    'Hello Antigravity'
    ```

### Useful REPL Commands:
- `.exit` or `Ctrl + C` (twice): Exit the REPL.
- `.help`: See all available commands.
- `.clear`: Resets the context.

> [!TIP]
> Use the REPL to quickly test a new JavaScript method or debug a logic piece before putting it into a file.
