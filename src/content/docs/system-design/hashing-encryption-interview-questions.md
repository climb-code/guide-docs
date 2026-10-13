---
title: Hashing and Encryption Interview Questions
description: Understand password hashing, bcrypt, salts, encryption, and database security with simple interview answers, examples, and a diagram.
---

Learn when to hash passwords and when to encrypt private data. Start with the main answer, then practice the interviewer follow-ups.

For access tokens, refresh tokens, and logout, see [JWT Interview Questions](/system-design/jwt-interview-questions/).

## Before you start: two simple terms

| Term | Easy meaning |
| --- | --- |
| Hashing | A one-way operation. Password hashes are checked, not decrypted. |
| Encryption | Protecting data with a key so an authorized app can read it again. |

## 1. How would you secure sensitive data stored in a database?

**Interviewer:** “Our application stores passwords, phone numbers, and addresses. How would you protect this data?”

### Answer you can say in an interview

> I would hash passwords using a password-hashing algorithm, and encrypt sensitive fields that the application needs to read again. For example, bcrypt can protect password storage, while authenticated encryption such as AES-GCM can protect an address. I would keep encryption keys outside the database, restrict database access, and use parameterized queries to prevent SQL injection. Bcrypt protects passwords; it does not secure every kind of database data.

**So, was your bcrypt answer wrong?**

If the question was about **storing passwords**, bcrypt was a relevant answer. If the question was about **securing all database data**, it was only one part of the answer. Without the interviewer's exact wording, we cannot say why they rejected it.

### Example 1: storing a password

At signup, the password library creates a salted password hash. Store that hash, not the original password.

```text
Signup: password → password hash → save hash
Login:  entered password + saved hash → verify → match / no match
```

With bcrypt, use the library's `hash` function at signup and `compare` function at login. You do not decrypt the stored hash or generate a fresh random-salt hash and compare the strings yourself.

### Example 2: storing a private address

The app needs Rahul's original address to deliver an order. A one-way hash cannot provide it. Encrypt the address before storage, then decrypt it only when an authorized operation needs it.

```text
Save: address + encryption key → encrypted address → database
Read: encrypted address + correct key → original address
```

![Passwords are hashed and verified during login. Recoverable private fields are encrypted and read using a separately protected key.](/system-design/database-protection.svg)

### Interviewer follow-ups

**“Is bcrypt encryption?”**

No. It is password hashing. Encryption is reversible with a key; password hashing is one-way. An attacker can still try password guesses against stolen hashes, which is why slow password hashing matters.

**“What is a salt?”**

A unique random value used when hashing each password. It makes users with the same password have different stored hashes. Bcrypt handles salts through its library; the salt is stored with the hash and does not need to be secret.

**“Should we encrypt passwords twice?”**

For normal login passwords, use a proper password hash instead of reversible encryption. For other data, simply saying “encrypt twice” does not explain the security design. Explain the layers: database encryption at rest protects stored files, while application field encryption can protect selected fields from someone who obtains a database copy without the application keys. Keys and access controls still matter. [OWASP cryptographic storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html).

**“Would you choose bcrypt for a new application?”**

OWASP prefers **Argon2id** for new password-storage designs and gives bcrypt guidance for legacy systems. Bcrypt is a password-hashing answer, not an encryption answer. If discussing bcrypt, mention its cost factor and 72-byte input limit. [OWASP password storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html).

**“What else would you do besides hashing and encryption?”**

Use a database account with only the required permissions, restrict network access, use TLS for connections, protect backups, and use parameterized SQL queries. Encryption alone does not prevent an attacker from reading data through a compromised application. [OWASP database security guidance](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html).

**Remember:** password → hash; recoverable private data → encrypt; database → restrict access and protect keys.

## Quick revision before the interview

| If the interviewer asks… | Start with… |
| --- | --- |
| “How do you protect database data?” | Hash passwords; encrypt recoverable sensitive fields; restrict access and protect keys. |
| “Is bcrypt encryption?” | No. It is password hashing. |
| “How do you check a login password?” | Use the password library to verify it against the saved hash. |
| “Can we hash an address?” | If the app needs the original address, use encryption instead. |

**Practice pattern:** describe the risk → explain the control → walk through an example → mention the tradeoff.

## Article compared while preparing these answers

[GeeksforGeeks: password hashing with bcrypt](https://www.geeksforgeeks.org/python/hashing-passwords-in-python-with-bcrypt/) covers creating a salted password hash and checking a login password. This page explains bcrypt through signup and login before discussing other database fields.

The article is a reference for explanation style, not one answer expected by every Indian interviewer. Security details are checked against the linked OWASP guidance. The answers and examples here are written for this guide.
