---
title: Payment Webhook Interview Question
description: Explain how to handle duplicate or missed payment gateway webhooks with idempotency, retries, and reconciliation.
---

## A payment webhook is missed or delivered twice. How do you handle it?

**Interviewer:** “A third-party payment gateway may send the same webhook more than once, or our server may miss one. How would you keep payment and order status correct?”

### Short answer you can say in an interview

> I would verify the gateway's signature, then process each event idempotently using its event ID and a database unique constraint. I would acknowledge the webhook only after it has been durably recorded, and use a worker with retries to process it. To recover events we never received, I would reconcile pending payments against the gateway's API or settlement reports. Payment updates would use safe state transitions so duplicate or out-of-order events cannot fulfill an order twice.

**In one line:** idempotency handles duplicate delivery; reconciliation recovers missed delivery.

## Case 1: the same webhook arrives more than once

Gateways commonly retry when they do not receive a successful response quickly enough. Treat delivery as **at least once**: the same event may be delivered repeatedly, and your handler must make repeated processing safe.

1. Read the raw request body and verify the gateway signature using its documented method. Reject invalid signatures.
2. Insert the event into a `webhook_events` table with a unique key such as `(provider, event_id)`. A database unique constraint is the final guard against concurrent duplicate requests.
3. In one transaction, record the event and apply the payment/order state change, or durably enqueue it for a worker. Do not rely on an in-memory check or Redis-only lock for correctness.
4. If the event ID is already recorded, return the gateway's expected success response without repeating the business action.

Example:

```text
EVT001: payment succeeded → record event; mark payment paid; fulfill once
EVT001 arrives again   → unique key detects duplicate; no second fulfillment
```

Use the provider's event ID for delivery deduplication. Also guard the business operation: for example, update a payment only from an allowed state and ensure an order can be fulfilled only once. This protects against two different events describing the same payment outcome.

## Case 2: the webhook never reaches our server

Keep a payment `PENDING` until its status is known. Run a reconciliation job that finds payments pending beyond a reasonable time, queries the gateway using the payment or transaction reference, and applies the verified current status. Retry temporary API failures with backoff, record attempts, and alert on items that keep failing. Settlement reports can provide another way to compare gateway transactions with local records.

```text
Payment stays PENDING → reconciliation queries gateway
Gateway says succeeded → mark paid and continue order flow once
Gateway says failed    → mark failed
Gateway unavailable    → retry later; retain the current known status
```

Do not trust a browser redirect or the customer's claim as proof of payment. The gateway API response or a verified webhook is the source of truth.

## A reliable processing shape

```text
Gateway
  → webhook endpoint: verify signature, durably record event
  → return 2xx promptly after durable acceptance
  → worker: process with retries and idempotent state changes
  → failed repeatedly: dead-letter queue / manual investigation

Scheduled reconciliation
  → find stale PENDING payments
  → query gateway status
  → repair local state safely
```

If processing is done asynchronously, persist the event before returning success; otherwise a crash after acknowledgment could lose it. If the event and a queue message must both be written reliably, use a transactional outbox or an equivalent durable handoff. Keep logs and metrics for signature failures, duplicates, processing retries, stale pending payments, and reconciliation mismatches.

## Follow-up questions

**What is idempotency?**

Repeating the same operation has the same final effect as doing it once. For a webhook, the payment can become paid and the order can be fulfilled once even if delivery repeats.

**Why is checking before inserting not enough?**

Two requests can both check at the same time, see no event, and both process it. Use a unique constraint and an atomic insert (for example, `INSERT ... ON CONFLICT DO NOTHING`), then perform the state transition only for the request that claimed the event.

**What if the server crashes during processing?**

Record work durably and make processing retryable. If the database transaction rolls back, the event can be retried. If an external action such as shipping cannot share that transaction, give that action its own idempotency key and retry mechanism.

**What if events arrive out of order?**

Do not blindly apply every event as the latest truth. Validate allowed state transitions, use provider sequence/version information when available, or fetch the current payment state from the gateway before applying a conflicting update. Never move a terminal paid state back to pending just because an older event arrived later.

**Should the webhook handler do all work before responding?**

Usually it should verify and durably accept the event, then let a worker do slower work. Return success only after durable acceptance. Follow the gateway's response-time and retry requirements.

**What is a dead-letter queue (DLQ)?**

A place for events that still fail after the configured retries. It lets the team inspect and replay them without silently dropping payment updates.

## Quick revision

| Problem | Main control |
| --- | --- |
| Duplicate webhook | Event ID, database unique constraint, idempotent state change |
| Missed webhook | Reconciliation against the gateway API or settlement report |
| Temporary processing failure | Durable queue, retries with backoff, and DLQ |
| Forged request | Verify signature against the raw request body |
| Duplicate order fulfillment | Guard the business action and use its own idempotency key |

**Remember:** verify → durably record → process idempotently → retry failures → reconcile pending payments.
