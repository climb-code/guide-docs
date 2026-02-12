---
title: Configuring tsconfig.json
description: Learn how to configure TypeScript projects with tsconfig.json. Master compiler options, project references, and recommended configurations for different project types.
---

Welcome! The `tsconfig.json` file is the heart of your TypeScript project configuration. This guide will show you how to configure it effectively! 🚀

## What is tsconfig.json?

`tsconfig.json` is a configuration file that specifies:
- How TypeScript should compile your code
- Which files to include/exclude
- Compiler options and strictness levels
- Project settings and paths

### Creating tsconfig.json

```bash
tsc --init
```

This creates a default `tsconfig.json` with recommended settings.

---

## Basic Structure

```json
{
  "compilerOptions": {
    // Compiler options go here
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Essential Compiler Options

### `target` - JavaScript Version

Specifies which JavaScript version to compile to:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

**Options**: `ES3`, `ES5`, `ES2015`, `ES2016`, `ES2017`, `ES2018`, `ES2019`, `ES2020`, `ES2021`, `ES2022`, `ESNext`

**Recommendation**: Use `ES2020` or higher for modern environments.

### `module` - Module System

Specifies the module code generation:

```json
{
  "compilerOptions": {
    "module": "ESNext"
  }
}
```

**Options**: `CommonJS`, `AMD`, `UMD`, `ES2015`, `ES2020`, `ESNext`, `Node16`, `NodeNext`

**Recommendation**:
- **Node.js**: Use `CommonJS` or `NodeNext`
- **Modern bundlers** (Vite, Webpack): Use `ESNext`

### `lib` - Type Definitions

Specifies which built-in library types to include:

```json
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM"]
  }
}
```

**Common libraries**:
- `ES2015`, `ES2020`, `ESNext` - JavaScript features
- `DOM` - Browser APIs
- `DOM.Iterable` - DOM iteration methods
- `WebWorker` - Web Worker APIs

### `outDir` and `rootDir`

Control where compiled files go:

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## Strict Type Checking

### `strict` - Enable All Strict Checks

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Recommendation**: Always enable `strict` mode!

This enables:
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitAny`
- `noImplicitThis`
- `alwaysStrict`

### Individual Strict Options

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

---

## Module Resolution

### `moduleResolution`

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

**Options**:
- `node` - Node.js-style resolution (default for CommonJS)
- `node16`/`nodenext` - Node.js 16+ with ESM support
- `bundler` - For bundlers like Webpack, Vite

### `baseUrl` and `paths`

Set up path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

**Usage**:
```typescript
import Button from "@components/Button";
import { formatDate } from "@utils/date";
```

---

## Include and Exclude

### `include` - Files to Compile

```json
{
  "include": [
    "src/**/*",
    "tests/**/*"
  ]
}
```

### `exclude` - Files to Ignore

```json
{
  "exclude": [
    "node_modules",
    "dist",
    "build",
    "**/*.spec.ts"
  ]
}
```

### `files` - Explicit File List

```json
{
  "files": [
    "src/index.ts",
    "src/app.ts"
  ]
}
```

---

## Source Maps

### `sourceMap` - Generate Source Maps

```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```

**Use when**: You need to debug TypeScript in the browser or Node.js.

### `inlineSourceMap` and `inlineSources`

```json
{
  "compilerOptions": {
    "inlineSourceMap": true,
    "inlineSources": true
  }
}
```

**Use when**: You want source maps embedded in the output files.

---

## Declaration Files

### `declaration` - Generate `.d.ts` Files

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types"
  }
}
```

**Use when**: Building a library that others will use.

### `emitDeclarationOnly`

```json
{
  "compilerOptions": {
    "emitDeclarationOnly": true
  }
}
```

**Use when**: Using a bundler for JavaScript, but want type definitions.

---

## Project References

For large projects, split configuration into multiple `tsconfig.json` files:

### Main `tsconfig.json`

```json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true
  },
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/utils" }
  ]
}
```

### Package `tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

---

## Common Configurations

### React + Vite Project

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### Node.js Project

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Library Project

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["ES2015"],
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## Important Options Reference

### Type Checking

| Option | Description | Recommendation |
|--------|-------------|----------------|
| `strict` | Enable all strict checks | ✅ Always enable |
| `noImplicitAny` | Error on implicit `any` | ✅ Enable |
| `strictNullChecks` | Strict null checking | ✅ Enable |
| `noUnusedLocals` | Error on unused variables | ✅ Enable |
| `noUnusedParameters` | Error on unused params | ✅ Enable |

### Module Options

| Option | Description | Use Case |
|--------|-------------|----------|
| `esModuleInterop` | Better CommonJS/ES module compatibility | ✅ Node.js projects |
| `allowSyntheticDefaultImports` | Allow default imports from modules | React, some libraries |
| `resolveJsonModule` | Import JSON files | Config files |
| `isolatedModules` | Each file as separate module | Bundlers, Babel |

### Emit Options

| Option | Description | Use Case |
|--------|-------------|----------|
| `noEmit` | Don't emit files | Using external bundler |
| `removeComments` | Remove comments from output | Smaller bundle size |
| `importHelpers` | Use tslib helpers | Smaller bundle |
| `downlevelIteration` | Better iteration polyfills | Target < ES2015 |

---

## Useful Tips

### Extending Configurations

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Multiple Configurations

- `tsconfig.json` - Main config
- `tsconfig.build.json` - Production build
- `tsconfig.test.json` - Testing

### Skip Library Checks

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

**Use when**: Library type definitions have errors (speeds up compilation).

---

## Key Takeaways

- Always enable `strict` mode for type safety
- Use `moduleResolution: "node"` for Node.js, `"bundler"` for bundlers
- Set `target` based on your runtime environment
- Configure `paths` for clean imports
- Use project references for monorepos
- Extend base configurations for consistency
- Generate declaration files when building libraries

---

## 💡 Conclusion

A well-configured `tsconfig.json` is essential for a productive TypeScript development experience. Start with strict mode and adjust based on your project's needs!

Happy coding with TypeScript! 🎉
