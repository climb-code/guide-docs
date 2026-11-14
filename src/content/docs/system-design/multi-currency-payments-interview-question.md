---
title: Multi-Currency Payments System Design Interview Question
description: Design a payment system that lets customers pay in local currencies and records charges and merchant settlements accurately.
---

## How would you design a multi-currency payment system?

**Interviewer:** “Our product is sold in several countries. A customer in each country should see the price and pay in their local currency. How would you design the pricing, checkout, payment processing, and transaction history? Explain how you would handle currency conversion, exchange-rate changes, fees, failed payments, refunds, and the amount settled to the merchant.”

### Short answer you can say in an interview

> I would define a reference currency for product pricing and decide whether to convert prices dynamically or maintain market-specific local prices. At checkout, I would show the customer the exact amount and currency they will be charged, along with any applicable fees. I would use a trusted exchange-rate source and define when the rate is locked. For every payment, I would store the customer charge, currency, rate and timestamp if converted, fees, provider reference, status, and the merchant settlement amount and currency. I would make payment operations idempotent, reconcile uncertain outcomes with the provider, and link refunds to the original transaction.

## Example currency table

Assume the product's reference price is **$10 USD**. These exchange rates are fictional examples only. Actual rates, supported currencies, fees, and settlement currencies depend on the payment provider and market.

| Customer location | Local currency | Example rate | Amount shown and charged to customer | Example merchant settlement |
| --- | --- | ---: | ---: | ---: |
| India | INR | 1 USD = ₹83 | ₹830 INR | USD amount reported by provider, less applicable fees |
| United States | USD | 1 USD = $1 | $10 USD | USD amount reported by provider, less applicable fees |
| Euro area | EUR | 1 USD = €0.92 | €9.20 EUR | USD amount reported by provider, less applicable fees |

The customer-facing charge and the merchant's settlement can use different currencies and amounts. Store both from the payment provider's actual response or settlement report; do not infer the settlement from the displayed exchange rate.

## What a transaction record should show

| Field | Example |
| --- | --- |
| Order | `ORD-2048` |
| Customer charge | `₹830 INR` |
| Reference price | `$10 USD` |
| Exchange rate | `1 USD = ₹83`, with source and timestamp |
| Fees | Gateway or conversion fees, if applicable |
| Merchant settlement | Actual amount and currency reported by the provider |
| Payment details | Provider transaction ID and payment method |
| Status | Pending, paid, failed, refunded, or disputed |

The customer should see the amount charged in their local currency. The merchant or finance team should be able to see the original amount, conversion details, fees, and actual settlement amount for reconciliation.

## A simple payment flow

```text
Identify customer's market and preferred currency
  → retrieve local price or convert reference price
  → show exact charge amount, currency, and applicable fees
  → customer confirms payment
  → create payment with an idempotency key
  → receive provider result and update payment status
  → record charge, FX details, fees, and actual settlement
  → reconcile uncertain or pending payments with the provider
```

Store money as integer minor units with an ISO currency code; avoid floating-point values for financial arithmetic. Use currency metadata for currencies that have different minor-unit rules. Define a rate-lock window so the amount shown at checkout does not silently change before the customer confirms.

## Interviewer follow-ups

**“Would you convert one base price or set a local price for each country?”**

Dynamic conversion keeps prices tied to a reference price, but amounts can move with exchange rates and may look awkward locally. Market-specific prices give predictable local pricing but require maintaining prices and rules per market. Explain which approach you choose and how prices are updated.

**“What if the exchange rate changes during checkout?”**

Lock the displayed rate for a defined period. If it expires before payment confirmation, refresh the quote and show the customer the updated amount before charging. Store the rate and timestamp associated with the accepted quote.

**“How do you prevent duplicate charges?”**

Use an idempotency key for each payment attempt and enforce uniqueness in our database. If a request times out, check the provider's transaction status before retrying so an uncertain result does not create a second charge.

**“What if the payment provider settles in a different currency?”**

Keep the customer's charge and merchant settlement as separate amounts and currencies. Record provider fees and settlement references, then reconcile local payment records against provider reports.

**“How do refunds work when currencies differ?”**

Link the refund to the original payment, record the refund amount and currency returned by the provider, and retain any FX or fee differences in the ledger. Show the customer the actual refunded amount and currency.

**Remember:** show the customer a clear local-currency charge; record the provider's actual payment and settlement details for every transaction.
