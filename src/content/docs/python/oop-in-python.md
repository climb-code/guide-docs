---
title: Object-Oriented Programming (OOP) in Python
description: Learn the fundamentals of Object-Oriented Programming in Python, including classes, objects, methods, and inheritance.
---

Object-Oriented Programming (OOP) is a programming paradigm that uses **classes** and **objects** to structure software into reusable pieces of code.

---

## Classes and Objects

- A **Class** is a blueprint for creating objects.
- An **Object** is an instance of a class.

```python
class Dog:
    pass

# Creating an instance (object)
my_dog = Dog()
```

---

## The `__init__` Method (Constructor)

The `__init__` method is a special method called automatically when a new object is created. It is used to initialize the object's attributes.

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name   # Instance variable
        self.breed = breed # Instance variable

my_dog = Dog("Buddy", "Golden Retriever")
print(my_dog.name) # Output: Buddy
```

---

## Instance Variables vs Class Variables

- **Instance Variables**: Unique to each instance.
- **Class Variables**: Shared by all instances of a class.

```python
class Dog:
    species = "Canis familiaris" # Class variable

    def __init__(self, name):
        self.name = name # Instance variable

dog1 = Dog("Buddy")
dog2 = Dog("Miles")

print(dog1.species) # Output: Canis familiaris
print(dog2.species) # Output: Canis familiaris
```

---

## Methods (Function inside a Class)

Methods are functions defined inside a class that define the behaviors of an object.

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self, sound):
        return f"{self.name} says {sound}"

my_dog = Dog("Buddy")
print(my_dog.speak("Woof!")) # Output: Buddy says Woof!
```

---

## Inheritance

Inheritance allows us to define a class that inherits all the methods and properties from another class.

- **Parent Class**: The class being inherited from.
- **Child Class**: The class that inherits from another class.

```python
class Animal:
    def speak(self):
        print("Animal makes a sound")

class Dog(Animal): # Dog inherits from Animal
    def speak(self):
        print("Bark!")

my_dog = Dog()
my_dog.speak() # Output: Bark!
```

---

## Encapsulation (Access Modifiers)

Python uses underscores to indicate the intended visibility of attributes:
- `_variable`: Protected (should not be accessed outside the class/subclass).
- `__variable`: Private (uses name mangling to make it harder to access from outside).

```python
class Account:
    def __init__(self, balance):
        self._balance = balance # Protected attribute

    def get_balance(self):
        return self._balance
```

---

## Polymorphism

Polymorphism allows different classes to be treated as instances of the same general class through the same interface.

```python
class Cat:
    def speak(self):
        return "Meow!"

class Dog:
    def speak(self):
        return "Woof!"

def make_animal_speak(animal):
    print(animal.speak())

make_animal_speak(Cat()) # Output: Meow!
make_animal_speak(Dog()) # Output: Woof!
```
