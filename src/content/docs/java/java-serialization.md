---
title: Serialization and Deserialization in Java
description: Learn how Java serialization converts objects into byte streams and back - Serializable, transient, serialVersionUID, custom read/write methods, security risks and modern alternatives.
---

**Serialization** turns a live Java object into a stream of bytes. **Deserialization** rebuilds an object from those bytes.

Why bother? An object lives in memory, and memory disappears when the program stops. Bytes can be written to a file, stored in a cache, or sent across a network. Serialization is the bridge between the two.

```
Object in memory  →  serialize  →  bytes  →  file / network
bytes  →  deserialize  →  Object in memory
```

---

## Making a Class Serializable

Implement `java.io.Serializable`. It is a **marker interface** - it has no methods. It simply flags the class as safe to convert.

```java
import java.io.Serializable;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;

    User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}
```

Without `Serializable`, any attempt to serialize the object throws `NotSerializableException`.

---

## Writing an Object

`ObjectOutputStream` does the work.

```java
import java.io.*;

User user = new User("Asha", 28);

try (ObjectOutputStream out =
         new ObjectOutputStream(new FileOutputStream("user.ser"))) {
    out.writeObject(user);
}
```

The `.ser` extension is only a convention. The file now holds a binary representation of the object.

---

## Reading an Object Back

`ObjectInputStream` reverses it. Note the cast - the stream returns `Object`.

```java
try (ObjectInputStream in =
         new ObjectInputStream(new FileInputStream("user.ser"))) {
    User restored = (User) in.readObject();
    System.out.println(restored);      // Asha (28)
}
```

`readObject` throws two checked exceptions you must handle:

- `IOException` - the file is missing or unreadable.
- `ClassNotFoundException` - the class named in the stream is not on the classpath.

### No constructor is called

This surprises people. Deserialization does **not** run the class's constructor. The JVM allocates the object and writes the fields in directly.

```java
class Account implements Serializable {
    private String id;

    Account(String id) {
        this.id = id;
        System.out.println("Constructor ran");   // never prints on deserialize
    }
}
```

Any validation or setup you put in the constructor is skipped. If an object must be valid, check it in `readObject` (shown below).

---

## The `transient` Keyword

Some fields should never be written out - passwords, open sockets, cached values, database connections. Mark them `transient`.

```java
class Session implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private transient String password;      // skipped
    private transient Connection db;        // not serializable anyway
}
```

On deserialization, transient fields get their **default value**: `null` for objects, `0` for numbers, `false` for booleans.

```java
Session s = new Session("asha", "secret123");
// after a round trip:
// username = "asha"
// password = null
```

Static fields are also skipped, because they belong to the class, not the object.

---

## serialVersionUID

Every serializable class has a version number. If you do not declare one, the JVM computes it from the class structure - field names, types, method signatures.

That is fragile. Add one field to the class and the computed ID changes, so old files can no longer be read:

```
java.io.InvalidClassException: User; local class incompatible:
stream classdesc serialVersionUID = 8237492..., local class = -1029384...
```

Declare it explicitly and control it yourself:

```java
private static final long serialVersionUID = 1L;
```

Rules of thumb:

- Keep the same value for **compatible** changes - adding a field, adding a method. Old data still loads; new fields come back as defaults.
- Change the value for **incompatible** changes - removing a field, changing a field's type, changing the class hierarchy.

---

## Serializing Object Graphs

Serialization follows references. Writing one object writes everything it points to.

```java
class Address implements Serializable {
    String city;
}

class Person implements Serializable {
    String name;
    Address address;      // Address must be Serializable too
}
```

If `Address` did not implement `Serializable`, writing a `Person` would fail with `NotSerializableException: Address`.

Java also handles **cycles and shared references** correctly. If two fields point at the same object, deserialization restores one shared object, not two copies.

```java
Address shared = new Address();
Person a = new Person("Asha", shared);
Person b = new Person("Ravi", shared);
// after a round trip, a.address == b.address is still true
```

---

## Inheritance Rules

If a parent class is `Serializable`, every subclass is serializable automatically.

If the parent is **not** serializable, the parent's fields are not written, and on deserialization the parent's **no-argument constructor runs** to initialise them. If the parent has no accessible no-arg constructor, deserialization throws `InvalidClassException`.

```java
class Base {                       // not Serializable
    int value = 10;

    Base() { }                     // required, or deserialization fails
}

class Child extends Base implements Serializable {
    String name;
}
```

After a round trip, `name` is restored from the stream but `value` is back to `10` from the constructor.

---

## Customising Serialization

For full control, add these two private methods. Java calls them by reflection.

```java
class Credentials implements Serializable {
    private static final long serialVersionUID = 1L;

    private String username;
    private transient String password;

    private void writeObject(ObjectOutputStream out) throws IOException {
        out.defaultWriteObject();              // write the normal fields
        out.writeObject(encrypt(password));    // then the custom part
    }

    private void readObject(ObjectInputStream in)
            throws IOException, ClassNotFoundException {
        in.defaultReadObject();                // read the normal fields
        this.password = decrypt((String) in.readObject());

        if (username == null || username.isBlank()) {
            throw new InvalidObjectException("username is required");
        }
    }
}
```

Two things worth noting:

- `defaultWriteObject` / `defaultReadObject` handle the ordinary fields, so you only write the special handling.
- `readObject` is the right place for **validation**, since the constructor never runs.

### readResolve for singletons

Deserialization creates a new object every time, which quietly breaks the singleton pattern. `readResolve` lets you substitute the canonical instance.

```java
class Config implements Serializable {
    private static final Config INSTANCE = new Config();

    private Config() { }

    public static Config getInstance() {
        return INSTANCE;
    }

    private Object readResolve() {
        return INSTANCE;     // discard the deserialized copy
    }
}
```

Enums avoid this problem entirely - the JVM guarantees enum identity across serialization, which is why an enum is the safest singleton in Java.

---

## Externalizable: Full Manual Control

`Externalizable` extends `Serializable` and hands you complete responsibility. Nothing is written automatically.

```java
class Point implements Externalizable {
    private int x, y;

    public Point() { }      // public no-arg constructor is REQUIRED

    @Override
    public void writeExternal(ObjectOutput out) throws IOException {
        out.writeInt(x);
        out.writeInt(y);
    }

    @Override
    public void readExternal(ObjectInput in) throws IOException {
        x = in.readInt();
        y = in.readInt();
    }
}
```

Unlike `Serializable`, this **does** call the public no-arg constructor. It produces smaller output, but you must maintain the read and write logic by hand as the class evolves.

---

## Serialization Is a Security Risk

This is the most important section on the page.

Deserializing untrusted bytes is genuinely dangerous. The stream tells the JVM which classes to instantiate, and carefully crafted input can chain together methods on classes already in your classpath to execute arbitrary code - the well-known "deserialization gadget chain" attack. It has produced critical vulnerabilities in many widely used libraries.

The rule is simple: **never deserialize data you do not fully control.**

If you must, use a filter (Java 9+) to allow only expected classes:

```java
ObjectInputFilter filter = ObjectInputFilter.Config.createFilter(
        "com.example.model.*;java.base/*;!*");   // allowlist, reject everything else

ObjectInputStream in = new ObjectInputStream(source);
in.setObjectInputFilter(filter);
```

The pattern reads left to right: allow your model package, allow core JDK classes, reject anything else.

---

## Modern Alternatives

For most work today - APIs, config files, message queues - a text format is the better default.

| Format   | Human readable | Cross-language | Typical use            |
| -------- | -------------- | -------------- | ---------------------- |
| JSON     | Yes            | Yes            | REST APIs, config      |
| XML      | Yes            | Yes            | Legacy, enterprise     |
| Protobuf | No             | Yes            | High-performance RPC   |
| Java serialization | No   | **No**         | JVM-to-JVM only        |

With Jackson, the equivalent round trip is:

```java
ObjectMapper mapper = new ObjectMapper();

String json = mapper.writeValueAsString(user);        // serialize
User restored = mapper.readValue(json, User.class);   // deserialize
```

Java's built-in serialization still has a place - `HttpSession` replication, RMI, some caching layers - but reach for it deliberately, not by default.

---

## Common Mistakes

**Forgetting `Serializable` on a nested type.** The outer class compiles fine and fails at runtime with `NotSerializableException`.

**Omitting `serialVersionUID`.** Works today, breaks the moment the class changes.

**Expecting the constructor to run.** It does not, for `Serializable`. Validate in `readObject` instead.

**Marking a field `transient` and then reading it.** It will be `null` or `0` after deserialization - re-initialise it in `readObject` if it needs a value.

**Serializing an inner (non-static) class.** A non-static inner class holds a hidden reference to its outer instance, which is dragged into the stream too. Make it a `static` nested class.

**Trusting the input.** See the security section - this is how real breaches happen.

---

## Summary

- `Serializable` is an empty marker interface; `ObjectOutputStream` and `ObjectInputStream` do the work.
- `transient` and `static` fields are excluded and come back as defaults.
- Always declare `serialVersionUID` so class changes do not break existing data.
- Serialization follows the whole object graph and preserves shared references and cycles.
- The constructor does not run on deserialization - validate inside `readObject`.
- `readResolve` protects singletons; `Externalizable` gives full manual control.
- Never deserialize untrusted input; use `ObjectInputFilter` allowlists if you must.
- Prefer JSON or Protobuf for anything crossing a system or language boundary.
