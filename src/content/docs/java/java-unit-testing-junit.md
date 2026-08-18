---
title: Unit Testing Java with JUnit 5
description: Learn how to write focused Java unit tests with JUnit 5 assertions, lifecycle methods, and parameterized tests.
---

**Unit tests** verify a small, isolated piece of code—usually one method or class. They give fast feedback when behavior changes and make refactoring safer.

JUnit 5 is the current generation of the JUnit testing framework. Its main APIs are in the `org.junit.jupiter` package.

---

## Add JUnit 5 to a Project

In a Maven project, add the JUnit Jupiter dependency to `pom.xml`:

```xml
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.14.3</version>
    <scope>test</scope>
</dependency>
```

Keep test classes under `src/test/java`. Maven and Gradle treat this folder as test code, so it is not included in the production artifact.

:::note
Use the version managed by your project's dependency platform or parent POM when it provides one. That prevents version mismatches between JUnit components.
:::

---

## Write Your First Test

Suppose the application contains this class:

```java
public final class PriceCalculator {
    public int withTax(int price, int taxPercent) {
        return price + (price * taxPercent / 100);
    }
}
```

Create a matching test class. A test method uses `@Test` and an assertion to state the expected behavior.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class PriceCalculatorTest {
    private final PriceCalculator calculator = new PriceCalculator();

    @Test
    void addsTaxToThePrice() {
        int total = calculator.withTax(200, 18);

        assertEquals(236, total);
    }
}
```

A clear test name describes the outcome, not the implementation. When this test fails, the name should explain what behavior is broken.

---

## Common Assertions

JUnit assertions compare the actual result with the expectation. Add an optional message when it would make a failure easier to understand.

```java
import static org.junit.jupiter.api.Assertions.*;

assertEquals(4, list.size());
assertTrue(user.isActive());
assertFalse(cart.isEmpty());
assertNull(cache.get("missing"));
assertNotNull(response);
assertSame(first, second);
assertArrayEquals(new int[] {1, 2}, numbers);
```

Use `assertThrows` to test an expected error:

```java
@Test
void rejectsANegativePrice() {
    PriceCalculator calculator = new PriceCalculator();

    IllegalArgumentException error = assertThrows(
        IllegalArgumentException.class,
        () -> calculator.withTax(-1, 18)
    );

    assertEquals("price must not be negative", error.getMessage());
}
```

The production method must validate the input for this test to pass:

```java
public int withTax(int price, int taxPercent) {
    if (price < 0) {
        throw new IllegalArgumentException("price must not be negative");
    }
    return price + (price * taxPercent / 100);
}
```

---

## Prepare and Clean Up Test Data

JUnit creates a new instance of the test class for every test method. Use lifecycle annotations to set up the state each test needs.

```java
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ShoppingCartTest {
    private ShoppingCart cart;

    @BeforeEach
    void createCart() {
        cart = new ShoppingCart();
    }

    @AfterEach
    void clearCart() {
        cart.clear();
    }

    @Test
    void startsEmpty() {
        assertTrue(cart.isEmpty());
    }
}
```

Use `@BeforeAll` and `@AfterAll` for expensive setup that the whole class can share, such as starting a test server. Those methods are normally `static`.

---

## Test Several Inputs with a Parameterized Test

Parameterized tests run the same test logic for several input sets. This keeps simple, data-driven cases readable.

```java
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class PriceCalculatorTest {
    private final PriceCalculator calculator = new PriceCalculator();

    @ParameterizedTest
    @CsvSource({
        "100, 0, 100",
        "100, 5, 105",
        "200, 18, 236"
    })
    void calculatesTax(int price, int taxPercent, int expected) {
        assertEquals(expected, calculator.withTax(price, taxPercent));
    }
}
```

---

## Good Unit-Test Habits

- Test observable behavior and public contracts, rather than private implementation details.
- Keep each test independent; it should pass when run alone or in any order.
- Follow **Arrange, Act, Assert**: prepare data, call the code, then verify the result.
- Use realistic boundary cases: empty values, zero, the largest valid input, and invalid input.
- Prefer fakes or mocks for slow dependencies such as HTTP services and databases. Do not make a unit test rely on a live external service.
- Keep tests fast. Slow tests are less likely to be run often.

---

## Run Tests

Run all Maven tests from the project root:

```sh
mvn test
```

For Gradle projects, run:

```sh
./gradlew test
```

Your IDE can also run an individual test method or test class directly. Start with a few focused unit tests, then build up coverage around the behavior that matters most.

---

### Next Steps ➡️

Review **Exception Handling** to design clear failures worth testing, then explore mocking libraries when tests need to isolate external collaborators.
