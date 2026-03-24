---
title: Task Scheduling (node-cron)
description: Automating recurring tasks in Node.js.
---

# Task Scheduling

Many applications need to run tasks at specific intervals—like sending weekly emails, cleaning up temporary files, or syncing data with an external API.

## Using `node-cron`
`node-cron` is a tiny task scheduler in pure JavaScript for node.js based on GNU crontab.

### 1. Installation
```bash
npm install node-cron
```

### 2. Basic Schedule
The cron syntax uses six fields: `minute hour day-of-month month day-of-week`.

```javascript
const cron = require('node-cron');

// Runs every minute
cron.schedule('* * * * *', () => {
  console.log('Running a task every minute');
});

// Runs every day at midnight (00:00)
cron.schedule('0 0 * * *', () => {
  console.log('Running a task at 00:00 every day');
});
```

### 3. Controlling a Task
You can start and stop tasks programmatically.

```javascript
const task = cron.schedule('* * * * *', () => {
  console.log('Stopped task');
}, {
  scheduled: false
});

task.start();
// task.stop();
```

## Cron Syntax Overview
```text
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # * * * * * *
```

> [!TIP]
> For more complex jobs involving multi-process concurrency or persistent queues, consider using **BullMQ** with Redis.
