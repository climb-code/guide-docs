---
title: Logging in Node.js
description: Best practices and tools for effective logging in Node.js applications.
---

Logging is essential for monitoring, debugging, and maintaining Node.js applications. Good logs provide visibility into what the system is doing and help identify issues quickly.

## Best Practices
- **Log Levels**: Use different levels like `info`, `warn`, `error`, and `debug`.
- **Structured Logging**: Log in JSON format to make it easy for machines to parse and analyze.
- **Don't use `console.log`**: Avoid it in production as it is synchronous and lacks features.
- **Sensitive Data**: Never log passwords, tokens, or PII.

## Popular Logging Libraries

### 1. Winston
A flexible and feature-rich logging library with support for multiple transports (console, file, database).

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

logger.info('Application started');
```

### 2. Pino
A very low-overhead logging library that focuses on speed and structured output.

```javascript
const logger = require('pino')();

logger.info('hello world');
logger.error({ err: new Error('an error') }, 'something went wrong');
```

## Log Monitoring
Consider using external tools to aggregate and analyze your logs:
- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Datadog**
- **Sentry** (for error tracking)
- **Papertrail**
