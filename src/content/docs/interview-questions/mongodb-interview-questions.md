---
title: MongoDB Interview Questions
description: Comprehensive collection of MongoDB interview questions covering database concepts, CRUD operations, indexing, aggregation, replication, sharding, performance optimization, and advanced MongoDB features for developers and database administrators.
---

### 1. What is MongoDB and why is it called a NoSQL database?

**Answer:** MongoDB stores data in flexible, JSON-like documents, making it suitable for handling unstructured or semi-structured data. The term "NoSQL" stands for "Not Only SQL," highlighting MongoDB's departure from the tabular structure and rigid schema of SQL databases.

**Key Characteristics:**

- **Document-Oriented**: Data is stored in BSON (Binary JSON) documents
- **Schema Flexibility**: No predefined schema required
- **Horizontal Scalability**: Can scale across multiple servers
- **High Performance**: Optimized for read/write operations
- **Rich Query Language**: Supports complex queries and aggregations

**Why "NoSQL":**

- **Not Only SQL**: Supports both SQL-like queries and non-relational operations
- **Non-Relational**: Doesn't use tables, rows, and columns like traditional RDBMS
- **Flexible Schema**: Documents can have different fields and structures
- **Scalability**: Designed for distributed, cloud-based applications

**Visual Comparison:**

```
SQL Database (Relational)
┌─────────────────┐    ┌─────────────────┐
│     Users       │    │     Orders      │
├─────────────────┤    ├─────────────────┤
│ id | name | age │    │ id | user_id    │
│ 1  | John | 25  │    │ 1  | 1          │
│ 2  | Jane | 30  │    │ 2  | 1          │
└─────────────────┘    └─────────────────┘

MongoDB (Document-Oriented)
┌─────────────────────────────────────┐
│            Users Collection         │
├─────────────────────────────────────┤
│ {                                   │
│   "_id": ObjectId("..."),           │
│   "name": "John",                   │
│   "age": 25,                        │
│   "orders": [                       │
│     { "product": "Laptop",          │
│       "price": 999.99 },            │
│     { "product": "Mouse",           │
│       "price": 29.99 }              │
│   ]                                 │
│ }                                   │
└─────────────────────────────────────┘
```

**Benefits of MongoDB's NoSQL Approach:**

- **Flexibility**: Easy to modify document structure
- **Performance**: Faster queries for complex data
- **Scalability**: Horizontal scaling across clusters
- **Developer-Friendly**: JSON-like documents are familiar to developers
- **Big Data Ready**: Efficiently handles large volumes of data

---

### 4. Explain the basic structure of a MongoDB document.

**Answer:** A MongoDB document is a data structure composed of `key-value` pairs, similar to a JSON object. Each document has a unique `_id` field and can contain various data types including strings, numbers, booleans, objects, arrays, and dates.

**Example Document:**

```json
{
   "_id": ObjectId("6179eaee62c43dbab52f07d7"),
   "name": "John Doe",
   "age": 30,
   "email": "john@example.com",
   "address": {
      "city": "New York",
      "street": "123 Main St"
   },
   "hobbies": ["reading", "swimming"],
   "isActive": true
}
```
- **Size Limit**: Maximum 16MB per document

### 3. What is sharding in MongoDB ?

**Answer:** Sharding in MongoDB is a database architecture that is used to horizontally scale your databases by distributing data across multiple clusters or servers. It is useful for large scale data.

**How it works:**

- Let's suppose we have 10 million records of user data in a single database
- If we want to get data by name, then we have to find the name in 10 million records and that will take a lot of time
- So we can break down the data:
  - Names starting with A to D → One database
  - Names starting with E to F → Another database
  - Names starting with J to M → Another database
  - And so on...

**Visual Representation:**

```
Single Database (10M records)
┌────────────────────────────────────┐
│  All User Data (10M records)       │
│  ┌─────────────────────────────┐   │
│  │  Search: "Saurabh"          │   │
│  │  Time: Search in 10M        │   │
│  └─────────────────────────────┘   │
└────────────────────────────────────┘

Sharded Databases (7 databases)
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Database 1  │ │ Database 2  │ │ Database 3  │ │ Database 4  │
│ A-D Names   │ │ E-F Names   │ │ G-I Names   │ │ J-L Names   │
│ ~1.4M recs  │ │ ~1.4M recs  │ │ ~1.4M recs  │ │ ~1.4M recs  │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Database 5  │ │ Database 6  │ │ Database 7  │
│ M-P Names   │ │ Q-T Names   │ │ U-Z Names   │
│ ~1.4M recs  │ │ ~1.4M recs  │ │ ~1.4M recs  │
└─────────────┘ └─────────────┘ └─────────────┘

Search: "Saurabh" → Database 6 (Q-T) → Search in ~1.4M records
```

**Result:** We have 7 databases in total. Now if we receive a request with name "Saurabh", then we have to find this in the right database and then we have to find that name in 1.4 million records, which is less than 10 million.

**Sharding Key:** The parameter we use to distribute data (like name in this example) is called the **Sharding Key**. We can use other parameters like geoLocations as well.

---

### 4. What is replication/replica set in MongoDB?

**Answer:** Replication in MongoDB is a process of maintaining multiple copies of the same data across different servers to ensure high availability, data redundancy, and fault tolerance.

**How it works:**

- A replica set consists of multiple MongoDB instances (servers)
- One server acts as the **Primary** node (handles all write operations)
- Other servers act as **Secondary** nodes (maintain copies of the data)
- If the primary node fails, one of the secondary nodes automatically becomes the new primary

**Visual Representation:**

```
MongoDB Replica Set
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Primary       │    │   Secondary 1   │    │   Secondary 2   │
│   (Master)      │    │   (Slave)       │    │   (Slave)       │
│                 │    │                 │    │                 │
│  ┌──────────┐   │    │  ┌──────────┐   │    │  ┌──────────┐   │
│  │ Write    │   │    │  │ Read     │   │    │  │ Read     │   │
│  │Operations│   │    │  │Operations│   │    │  │Operations│   │
│  └──────────┘   │    │  └──────────┘   │    │  └──────────┘   │
│                 │    │                 │    │                 │
│  ┌──────────┐   │    │  ┌──────────┐   │    │  ┌──────────┐   │
│  │ Data     │◄──┼────┼──│ Data     │   │    │  │ Data     │   │
│  │ Copy 1   │   │    │  │ Copy 2   │   │    │  │ Copy 3   │   │
│  └──────────┘   │    │  └──────────┘   │    │  └──────────┘   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    Automatic Failover
                    (If Primary fails)
```

**Benefits:**

- **High Availability**: If primary fails, secondary takes over
- **Data Redundancy**: Multiple copies of data prevent data loss
- **Read Scaling**: Can distribute read operations across secondaries
- **Disaster Recovery**: Data is safe even if one server fails
- **Geographic Distribution**: Can place replicas in different locations

**Replica Set Members:**

- **Primary**: Handles all write operations and maintains the oplog
- **Secondary**: Maintains a copy of the primary's data set
- **Arbiter**: Participates in elections but doesn't hold data (optional)

---

### 5. What is a collection in MongoDB?

**Answer:** A collection in MongoDB is a grouping of documents stored in the database. Collections are created implicitly when the first document is inserted, and they support dynamic schema evolution.

**Key Characteristics:**

- **Implicit Creation**: Created automatically when first document is inserted
- **Dynamic Evolution**: Can add/remove fields without schema changes
- **Namespace**: Follows format `database.collection`

**Example Collections:**

```
Users Collection:
┌────────────────────────────────────┐
│ { "_id": ObjectId("..."),          │
│   "name": "John", "age": 25 }      │
│ { "_id": ObjectId("..."),          │
│   "name": "Jane", "email": "..." } │
│ { "_id": ObjectId("..."),          │
│   "name": "Bob", "phone": "..." }  │
└────────────────────────────────────┘

Products Collection:
┌────────────────────────────────────┐
│ { "_id": ObjectId("..."),          │
│   "name": "Laptop", "price": 999 } │
│ { "_id": ObjectId("..."),          │
│   "name": "Mouse", "brand": "..." }│
└────────────────────────────────────┘
```


### 6. How do you insert a document into a MongoDB collection?

**Answer:** To insert a document into a MongoDB collection, you can use the `insertOne()` or `insertMany()` methods provided by the MongoDB driver or shell.

**Example:**

```javascript
db.users.insertOne({
  name: "Alice",
  age: 25,
  email: "alice@example.com",
});
```

**Key Methods:**

- **insertOne()**: Inserts a single document
- **insertMany()**: Inserts multiple documents at once
- **insert()**: Legacy method (deprecated in favor of insertOne/insertMany)

**Example with insertMany():**

```javascript
db.users.insertMany([
  {
    name: "Alice",
    age: 25,
    email: "alice@example.com",
  },
  {
    name: "Bob",
    age: 30,
    email: "bob@example.com",
  },
]);
```



### 7. What is the \_id field in MongoDB and why is it important?

**Answer:** The `_id` field is a unique identifier assigned to each document in a MongoDB collection. It acts as a primary key and ensures the uniqueness of documents within the collection. MongoDB automatically generates an `_id` for each inserted document if one is not provided explicitly.

**Key Characteristics:**

- **Automatic Generation**: MongoDB creates ObjectId if not provided
- **Unique Constraint**: No two documents can have the same `_id`
- **Immutable**: Cannot be changed after document creation
- **Indexed**: Automatically indexed for fast lookups
- **12-byte ObjectId**: Contains timestamp, machine ID, process ID, and counter
- **Timestamp** : Contains creation time information

**Example:**

```javascript
// MongoDB automatically generates _id
db.users.insertOne({
  name: "Alice",
  age: 25,
});
// Result: { "_id": ObjectId("6179eaee62c43dbab52f07d7"), "name": "Alice", "age": 25 }

// Custom _id
db.users.insertOne({
  _id: "user123",
  name: "Bob",
  age: 30,
});
```

**ObjectId Structure:**

```
ObjectId("6179eaee62c43dbab52f07d7")
│        │        │        │
│        │        │        └── Counter (3 bytes)
│        │        └── Process ID (3 bytes)
│        └── Machine ID (3 bytes)
└── Timestamp (4 bytes)
```



---

### 8. What is the primary difference between findOne() and find() methods in MongoDB?

**Answer:** The `findOne()` method retrieves the first document that matches the specified query criteria, while the `find()` method returns a cursor to all documents that match the query criteria. `findOne()` returns a single document or null, while `find()` returns a cursor, which can be iterated over to access multiple documents.

**Comparison:**

| Method      | Returns                 | Use Case        | Performance                    |
| ----------- | ----------------------- | --------------- | ------------------------------ |
| `findOne()` | Single document or null | Get first match | Fast (stops after first match) |
| `find()`    | Cursor to all documents | Get all matches | Depends on result size         |

**Examples:**

```javascript
// findOne() - Returns single document
db.users.findOne({ age: { $gt: 25 } });
// Result: { "_id": ObjectId("..."), "name": "Alice", "age": 30 }

// find() - Returns cursor
db.users.find({ age: { $gt: 25 } });
// Result: Cursor with all matching documents
```

### 9. How do you query documents in MongoDB?

**Answer:** In MongoDB, you can query documents using the `find()` method, providing query criteria to filter the results. Query criteria can include conditions based on field values, comparison operators, logical operators, and more.

**Basic Query Examples:**

```javascript
// Find all documents
db.users.find();

// Find documents with specific field value
db.users.find({ age: 25 });

// Find documents with comparison operators
db.users.find({ age: { $gt: 30 } });

// Find documents with multiple conditions
db.users.find({ age: { $gt: 25 }, city: "New York" });

// Find documents with logical operators
db.users.find({ $or: [{ age: { $lt: 25 } }, { age: { $gt: 35 } }] });
```

**Comparison Operators:**

| Operator | Description           | Example                             |
| -------- | --------------------- | ----------------------------------- |
| `$eq`    | Equal to              | `{ "age": { $eq: 25 } }`            |
| `$gt`    | Greater than          | `{ "age": { $gt: 25 } }`            |
| `$gte`   | Greater than or equal | `{ "age": { $gte: 25 } }`           |
| `$lt`    | Less than             | `{ "age": { $lt: 25 } }`            |
| `$lte`   | Less than or equal    | `{ "age": { $lte: 25 } }`           |
| `$ne`    | Not equal             | `{ "age": { $ne: 25 } }`            |
| `$in`    | In array              | `{ "age": { $in: [25, 30, 35] } }`  |
| `$nin`   | Not in array          | `{ "age": { $nin: [25, 30, 35] } }` |

**Logical Operators:**

```javascript
// AND (implicit)
db.users.find({ age: { $gt: 25 }, city: "New York" });

// OR
db.users.find({ $or: [{ age: { $lt: 25 } }, { age: { $gt: 35 } }] });

// AND with OR
db.users.find({
  city: "New York",
  $or: [{ age: { $lt: 25 } }, { age: { $gt: 35 } }],
});
```

**Array Queries:**

```javascript
// Find documents where array contains element
db.users.find({ hobbies: "reading" });

// Find documents with array size
db.users.find({ hobbies: { $size: 3 } });

// Find documents with array element matching condition
db.users.find({ scores: { $elemMatch: { $gt: 80 } } });
```

**Projection (Selecting Fields):**

```javascript
// Include only specific fields
db.users.find({}, { name: 1, age: 1, _id: 0 });

// Exclude specific fields
db.users.find({}, { password: 0, ssn: 0 });
```

---

### 10. What is the purpose of indexing in MongoDB?

**Answer:** Indexing in MongoDB improves query performance by allowing the database to quickly locate documents based on indexed fields. Indexes support efficient execution of queries, sorting, and aggregation operations. MongoDB supports various types of indexes, including single field, compound, multi-key, and geospatial indexes.

**Why Indexing is Important:**

- **Performance**: Dramatically faster query execution
- **Sorting**: Efficient sorting operations
- **Unique Constraints**: Enforce uniqueness on fields
- **Text Search**: Enable full-text search capabilities
- **Geospatial**: Support location-based queries

**Types of Indexes:**

**1. Single Field Index:**

```javascript
// Create index on single field
db.users.createIndex({ email: 1 });

// Query using indexed field
db.users.find({ email: "alice@example.com" });
```

**2. Compound Index:**

```javascript
// Create compound index
db.users.createIndex({ age: 1, city: 1 });

// Query using compound index
db.users.find({ age: { $gt: 25 }, city: "New York" });
```

**3. Multi-key Index (Array):**

```javascript
// Create index on array field
db.users.createIndex({ tags: 1 });

// Query array elements
db.users.find({ tags: "javascript" });
```

**4. Text Index:**

```javascript
// Create text index
db.articles.createIndex({ content: "text" });

// Text search
db.articles.find({ $text: { $search: "mongodb tutorial" } });
```

**5. Geospatial Index:**

```javascript
// Create geospatial index
db.places.createIndex({ location: "2dsphere" });

// Geospatial query
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-73.97, 40.77],
      },
      $maxDistance: 1000,
    },
  },
});
```

**Index Properties:**

```javascript
// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Sparse index (only on documents with field)
db.users.createIndex({ phone: 1 }, { sparse: true });

// TTL index (automatic deletion)
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });
```

**Visual Representation:**

```
Without Index
┌─────────────────────────────────────┐
│  Collection: users (1M documents)   │
│                                     │
│  Query: { "email": "alice@..." }   │
│                                     │
│  Process: Scan all 1M documents    │
│  Time: ~1000ms                     │
└─────────────────────────────────────┘

With Index
┌─────────────────────────────────────┐
│  Index: email → document pointer    │
│                                     │
│  Query: { "email": "alice@..." }   │
│                                     │
│  Process: Lookup in index          │
│  Time: ~1ms                        │
└─────────────────────────────────────┘
```

### 11. Explain the concept of aggregation in MongoDB.

**Answer:** Aggregation in MongoDB involves processing and transforming documents to compute aggregated results. The Aggregation Framework provides a powerful set of operators and stages for data transformation, filtering, grouping, sorting, and computing aggregate functions like sum, average, count, etc.

**Key Concepts:**

- **Pipeline Processing**: Documents flow through a series of stages
- **Stage-based Operations**: Each stage transforms the documents
- **Flexible Output**: Can produce complex results from simple operations
- **Performance**: Optimized for large datasets

**Basic Aggregation Example:**

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
]);
```

**Common Aggregation Stages:**

| Stage      | Purpose          | Example                                            |
| ---------- | ---------------- | -------------------------------------------------- |
| `$match`   | Filter documents | `{ $match: { "age": { $gt: 25 } } }`               |
| `$group`   | Group by field   | `{ $group: { _id: "$city", count: { $sum: 1 } } }` |
| `$sort`    | Sort results     | `{ $sort: { "name": 1 } }`                         |
| `$project` | Select fields    | `{ $project: { name: 1, age: 1, _id: 0 } }`        |
| `$limit`   | Limit results    | `{ $limit: 10 }`                                   |
| `$skip`    | Skip documents   | `{ $skip: 5 }`                                     |

**Advanced Aggregation Example:**

```javascript
db.sales.aggregate([
  // Filter completed sales
  { $match: { status: "completed" } },

  // Group by product and calculate totals
  {
    $group: {
      _id: "$productId",
      totalSales: { $sum: "$amount" },
      avgPrice: { $avg: "$price" },
      count: { $sum: 1 },
    },
  },

  // Sort by total sales
  { $sort: { totalSales: -1 } },

  // Limit to top 10
  { $limit: 10 },
]);
```

**Visual Representation:**

```
Input Documents
┌─────────────────────────────────────┐
│ { "product": "Laptop", "amount": 999 } │
│ { "product": "Mouse", "amount": 29 }   │
│ { "product": "Laptop", "amount": 999 } │
│ { "product": "Keyboard", "amount": 59 }│
└─────────────────────────────────────┘
         │
         ▼
   $match Stage
┌─────────────────────────────────────┐
│ Filter: amount > 50                 │
│ { "product": "Laptop", "amount": 999 } │
│ { "product": "Laptop", "amount": 999 } │
│ { "product": "Keyboard", "amount": 59 }│
└─────────────────────────────────────┘
         │
         ▼
   $group Stage
┌─────────────────────────────────────┐
│ Group by: product                   │
│ { "_id": "Laptop", "total": 1998 } │
│ { "_id": "Keyboard", "total": 59 } │
└─────────────────────────────────────┘
         │
         ▼
   $sort Stage
┌─────────────────────────────────────┐
│ Sort by: total (descending)        │
│ { "_id": "Laptop", "total": 1998 } │
│ { "_id": "Keyboard", "total": 59 } │
└─────────────────────────────────────┘
```

**Benefits of Aggregation:**

- **Complex Queries**: Handle sophisticated data analysis
- **Performance**: Optimized for large datasets
- **Flexibility**: Custom transformations and calculations
- **Real-time**: Process data as it flows through pipeline
- **Scalable**: Works efficiently with distributed data

---

### 12. What is the $lookup aggregation stage used for?

**Answer:** The `$lookup` aggregation stage in MongoDB is used for performing a left outer join between documents from two collections in the same database. It allows you to enrich the documents in the input collection with fields from documents in a secondary collection based on a matching condition.

**Key Features:**

- **Left Outer Join**: Includes all documents from the input collection
- **Field Enrichment**: Adds fields from joined collection
- **Array Output**: Matched documents are returned as an array
- **Same Database**: Both collections must be in the same database

**Example: Orders and Customers**

```javascript
// Orders collection
{ "_id": 1, "customerId": 101, "amount": 150, "product": "Laptop" }
{ "_id": 2, "customerId": 102, "amount": 50, "product": "Mouse" }
{ "_id": 3, "customerId": 101, "amount": 200, "product": "Keyboard" }

// Customers collection
{ "_id": 101, "name": "Alice", "email": "alice@example.com" }
{ "_id": 102, "name": "Bob", "email": "bob@example.com" }
{ "_id": 103, "name": "Charlie", "email": "charlie@example.com" }

// $lookup query
db.orders.aggregate([
   {
      $lookup: {
         from: "customers",
         localField: "customerId",
         foreignField: "_id",
         as: "customer"
      }
   }
])
```

**Result:**

```javascript
{
   "_id": 1,
   "customerId": 101,
   "amount": 150,
   "product": "Laptop",
   "customer": [
      {
         "_id": 101,
         "name": "Alice",
         "email": "alice@example.com"
      }
   ]
}
```

**Visual Representation:**

```
Orders Collection          Customers Collection
┌─────────────────┐       ┌─────────────────┐
│ _id: 1          │       │ _id: 101        │
│ customerId: 101 │◄──────┤ name: "Alice"   │
│ amount: 150     │       │ email: "..."    │
└─────────────────┘       └─────────────────┘
│ _id: 2          │       │ _id: 102        │
│ customerId: 102 │◄──────┤ name: "Bob"     │
│ amount: 50      │       │ email: "..."    │
└─────────────────┘       └─────────────────┘

$lookup Result
┌─────────────────────────────────────┐
│ _id: 1, customerId: 101, amount: 150 │
│ customer: [{ name: "Alice", ... }]   │
├─────────────────────────────────────┤
│ _id: 2, customerId: 102, amount: 50  │
│ customer: [{ name: "Bob", ... }]     │
└─────────────────────────────────────┘
```

**Advanced $lookup Examples:**

**1. Multiple Fields Match:**

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerInfo",
    },
  },
]);
```

**2. Pipeline in $lookup:**

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      let: { customerId: "$customerId" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$customerId"] } } },
        { $project: { name: 1, email: 1, _id: 0 } },
      ],
      as: "customer",
    },
  },
]);
```

**Benefits:**

- **Data Enrichment**: Combine data from multiple collections
- **Flexible Joins**: Support for complex matching conditions
- **Performance**: Optimized for large datasets
- **Real-time**: No need for pre-joined data

---

### 13. How do you update a document in MongoDB?

**Answer:** To update a document in MongoDB, you can use the `updateOne()` or `updateMany()` methods, specifying a filter to match the documents to be updated and the update operation to be performed.

**Key Methods:**

- **updateOne()**: Updates the first document that matches the filter
- **updateMany()**: Updates all documents that match the filter
- **replaceOne()**: Replaces the entire document (except \_id)

**Basic Update Example:**

```javascript
// Update email for user named "Alice"
db.users.updateOne(
  { name: "Alice" },
  { $set: { email: "new_email@example.com" } }
);
```

**Update Operators:**

| Operator  | Purpose                 | Example                                 |
| --------- | ----------------------- | --------------------------------------- |
| `$set`    | Set field value         | `{ $set: { "age": 30 } }`               |
| `$unset`  | Remove field            | `{ $unset: { "tempField": "" } }`       |
| `$inc`    | Increment numeric value | `{ $inc: { "score": 10 } }`             |
| `$push`   | Add to array            | `{ $push: { "tags": "newTag" } }`       |
| `$pull`   | Remove from array       | `{ $pull: { "tags": "oldTag" } }`       |
| `$rename` | Rename field            | `{ $rename: { "oldName": "newName" } }` |

**Complex Update Examples:**

```javascript
// Update multiple fields
db.users.updateOne(
  { name: "Alice" },
  {
    $set: {
      email: "new_email@example.com",
      lastUpdated: new Date(),
    },
    $inc: { loginCount: 1 },
  }
);

// Update array elements
db.users.updateOne({ name: "Alice" }, { $push: { hobbies: "swimming" } });

// Update with conditions
db.users.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } });
```

**Return Value:**

```javascript
// updateOne() returns
{
   "acknowledged": true,
   "matchedCount": 1,
   "modifiedCount": 1,
   "upsertedId": null
}

// updateMany() returns
{
   "acknowledged": true,
   "matchedCount": 5,
   "modifiedCount": 5,
   "upsertedId": null
}
```

**Upsert Option:**

```javascript
// Create document if not found
db.users.updateOne(
  { email: "alice@example.com" },
  { $set: { name: "Alice", age: 25 } },
  { upsert: true }
);
```

**Visual Representation:**

```
Before Update
┌─────────────────────────────────────┐
│ { "_id": ObjectId("..."),           │
│   "name": "Alice",                  │
│   "email": "old@example.com",       │
│   "age": 25 }                       │
└─────────────────────────────────────┘
         │
         ▼
   updateOne()
┌──────────────────────────────────────────┐
│ Filter: { "name": "Alice" }              │
│ Update: { $set: { "email": "new@..." } } │
└──────────────────────────────────────────┘
         │
         ▼
After Update
┌─────────────────────────────────────┐
│ { "_id": ObjectId("..."),           │
│   "name": "Alice",                  │
│   "email": "new@example.com",       │
│   "age": 25 }                       │
└─────────────────────────────────────┘
```

---

### 14. What is the purpose of the $set operator in MongoDB updates?

**Answer:** The `$set` operator in MongoDB updates is used to set the value of a field in a document. It can be used to update existing fields or add new fields to the document if they don't already exist.

**Key Features:**

- **Field Creation**: Adds new fields if they don't exist
- **Field Update**: Updates existing field values
- **Safe Operation**: Won't overwrite entire document
- **Flexible**: Works with any data type

**Basic Usage:**

```javascript
// Update existing field
db.users.updateOne(
  { name: "Alice" },
  { $set: { email: "new_email@example.com" } }
);

// Add new field
db.users.updateOne({ name: "Alice" }, { $set: { phone: "123-456-7890" } });
```

**Multiple Fields:**

```javascript
db.users.updateOne(
  { name: "Alice" },
  {
    $set: {
      email: "new_email@example.com",
      phone: "123-456-7890",
      lastUpdated: new Date(),
      status: "active",
    },
  }
);
```

**Nested Fields:**

```javascript
// Update nested object
db.users.updateOne(
  { name: "Alice" },
  { $set: { "address.city": "Los Angeles" } }
);

// Update array element
db.users.updateOne({ name: "Alice" }, { $set: { "hobbies.0": "reading" } });
```

**Comparison with Other Operators:**

| Operator | Purpose         | Example                           |
| -------- | --------------- | --------------------------------- |
| `$set`   | Set field value | `{ $set: { "age": 30 } }`         |
| `$unset` | Remove field    | `{ $unset: { "tempField": "" } }` |
| `$inc`   | Increment value | `{ $inc: { "score": 10 } }`       |
| `$push`  | Add to array    | `{ $push: { "tags": "new" } }`    |

**Visual Example:**

```
Before $set
┌─────────────────────────────────────┐
│ { "_id": ObjectId("..."),           │
│   "name": "Alice",                  │
│   "email": "old@example.com",       │
│   "age": 25 }                       │
└─────────────────────────────────────┘
         │
         ▼
   $set Operation
┌─────────────────────────────────────┐
│ { $set: {                           │
│   "email": "new@example.com",       │
│   "phone": "123-456-7890",          │
│   "status": "active"                │
│ } }                                 │
└─────────────────────────────────────┘
         │
         ▼
After $set
┌─────────────────────────────────────┐
│ { "_id": ObjectId("..."),           │
│   "name": "Alice",                  │
│   "email": "new@example.com",       │
│   "age": 25,                        │
│   "phone": "123-456-7890",          │
│   "status": "active"                │
└─────────────────────────────────────┘
```

**Benefits:**

- **Safe**: Only updates specified fields
- **Flexible**: Works with any data type
- **Additive**: Can add new fields
- **Atomic**: Single operation for multiple fields

---

### 15. How do you delete documents in MongoDB?

**Answer:** To delete documents in MongoDB, you can use the `deleteOne()` or `deleteMany()` methods, specifying a filter to match the documents to be deleted.

**Key Methods:**

- **deleteOne()**: Deletes the first document that matches the filter
- **deleteMany()**: Deletes all documents that match the filter
- **remove()**: Legacy method (deprecated)

**Basic Delete Examples:**

```javascript
// Delete single document
db.users.deleteOne({ name: "Alice" });

// Delete multiple documents
db.users.deleteMany({ age: { $gt: 40 } });

// Delete all documents in collection
db.users.deleteMany({});
```

**Delete with Complex Filters:**

```javascript
// Delete users with specific criteria
db.users.deleteMany({
  age: { $gt: 40 },
  status: "inactive",
  lastLogin: { $lt: new Date("2023-01-01") },
});

// Delete documents with array conditions
db.users.deleteMany({
  tags: { $in: ["spam", "bot"] },
});
```

**Return Value:**

```javascript
// deleteOne() returns
{
   "acknowledged": true,
   "deletedCount": 1
}

// deleteMany() returns
{
   "acknowledged": true,
   "deletedCount": 5
}
```

**Visual Representation:**

```
Before Delete
┌─────────────────────────────────────┐
│ Collection: users                   │
│                                     │
│ { "_id": 1, "name": "Alice", ... }  │
│ { "_id": 2, "name": "Bob", ... }    │
│ { "_id": 3, "name": "Charlie", ... }│
│ { "_id": 4, "name": "David", ... }  │
└─────────────────────────────────────┘
         │
         ▼
   deleteMany({ "age": { $gt: 40 } })
┌──────────────────────────────────────────┐
│ Filter: age > 40                         │
│ Matches: Bob (age: 45), David (age: 50)  │
└──────────────────────────────────────────┘
         │
         ▼
After Delete
┌─────────────────────────────────────┐
│ Collection: users                   │
│                                     │
│ { "_id": 1, "name": "Alice", ... }  │
│ { "_id": 3, "name": "Charlie", ... }│
└─────────────────────────────────────┘
```

**Safety Considerations:**

```javascript
// Always use specific filters
// ❌ Dangerous - deletes everything
db.users.deleteMany({});

// ✅ Safe - specific filter
db.users.deleteMany({ status: "deleted" });

// Use deleteOne() for single documents
db.users.deleteOne({ _id: ObjectId("...") });
```

**Benefits:**

- **Flexible**: Support for complex filters
- **Atomic**: Single operation for multiple deletes
- **Safe**: Can use specific criteria
- **Efficient**: Optimized for large datasets

---

### 16. What is the difference between updateOne() and updateMany() methods in MongoDB?

**Answer:** The `updateOne()` method updates the first document that matches the specified filter, while the `updateMany()` method updates all documents that match the filter.

**Key Differences:**

| Method         | Scope            | Use Case                | Performance                    |
| -------------- | ---------------- | ----------------------- | ------------------------------ |
| `updateOne()`  | First match only | Single document updates | Fast (stops after first match) |
| `updateMany()` | All matches      | Bulk updates            | Depends on number of matches   |

**Examples:**

```javascript
// updateOne() - Updates only first match
db.users.updateOne(
  { name: "Alice" },
  { $set: { email: "new_email@example.com" } }
);

// updateMany() - Updates all matches
db.users.updateMany(
  { name: "Alice" },
  { $set: { email: "new_email@example.com" } }
);
```

**Visual Comparison:**

```
Collection with Multiple "Alice" Documents
┌─────────────────────────────────────┐
│ { "_id": 1, "name": "Alice", ... }  │
│ { "_id": 2, "name": "Bob", ... }    │
│ { "_id": 3, "name": "Alice", ... }  │
│ { "_id": 4, "name": "Alice", ... }  │
└─────────────────────────────────────┘
         │
         ▼
   updateOne({ "name": "Alice" })
┌─────────────────────────────────────┐
│ Updates: Document 1 only            │
│ Result: 1 document updated          │
└─────────────────────────────────────┘
         │
         ▼
After updateOne()
┌─────────────────────────────────────────────────┐
│ { "_id": 1, "name": "Alice", email: "new@..." } │
│ { "_id": 2, "name": "Bob", ... }                │
│ { "_id": 3, "name": "Alice", ... }              │
│ { "_id": 4, "name": "Alice", ... }              │
└─────────────────────────────────────────────────┘
```

```
Same Collection
┌─────────────────────────────────────┐
│ { "_id": 1, "name": "Alice", ... }  │
│ { "_id": 2, "name": "Bob", ... }    │
│ { "_id": 3, "name": "Alice", ... }  │
│ { "_id": 4, "name": "Alice", ... }  │
└─────────────────────────────────────┘
         │
         ▼
   updateMany({ "name": "Alice" })
┌─────────────────────────────────────┐
│ Updates: Documents 1, 3, 4          │
│ Result: 3 documents updated         │
└─────────────────────────────────────┘
         │
         ▼
After updateMany()
┌─────────────────────────────────────────────────┐
│ { "_id": 1, "name": "Alice", email: "new@..." } │
│ { "_id": 2, "name": "Bob", ... }                │
│ { "_id": 3, "name": "Alice", email: "new@..." } │
│ { "_id": 4, "name": "Alice", email: "new@..." } │
└─────────────────────────────────────────────────┘
```

**Return Values:**

```javascript
// updateOne() returns
{
   "acknowledged": true,
   "matchedCount": 1,
   "modifiedCount": 1,
   "upsertedId": null
}

// updateMany() returns
{
   "acknowledged": true,
   "matchedCount": 3,
   "modifiedCount": 3,
   "upsertedId": null
}
```

**When to Use Each:**

**updateOne():**

- Updating a specific document by unique identifier
- When you only want to update the first match
- Performance-critical scenarios
- Single record operations

**updateMany():**

- Bulk updates across multiple documents
- Data migration scenarios
- Batch processing operations
- When you need to update all matching documents

**Performance Considerations:**

- `updateOne()` is faster as it stops after first match
- `updateMany()` processes all matches, so slower for large datasets
- Use indexes on filter fields for better performance
- Consider using `updateMany()` with `limit` for controlled bulk updates

---
