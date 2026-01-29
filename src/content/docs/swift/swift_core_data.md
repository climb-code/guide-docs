---
title: "Core Data in Swift"
description: "Master persistent data storage in Swift using Core Data for iOS apps"
---

Core Data is Apple's powerful framework for persisting data in iOS applications. It provides object graph management and allows you to work with data as objects rather than SQL queries. In this guide, you'll learn how to set up Core Data, create models, and perform CRUD operations.

## What is Core Data?

Core Data is a framework for managing the model layer of your app. It provides:
- **Object Graph Management** - Work with objects instead of database rows
- **Persistence** - Save data permanently on disk
- **Undo/Redo** - Built-in undo/redo support
- **Validation** - Automatic data validation
- **Relationships** - Link objects together
- **Memory Management** - Efficient memory usage with faulting

**Note:** Core Data is NOT a database. It's an object persistence framework that can use SQLite as its backing store.

## Core Data Stack

The Core Data stack consists of:

```swift
1. NSManagedObjectModel - Describes your data schema
2. NSPersistentStoreCoordinator - Manages the persistent store
3. NSManagedObjectContext - Where you work with objects
4. NSPersistentContainer - Wraps everything together (iOS 10+)
```

### Setting Up Core Data

**Create with NSPersistentContainer (Modern Approach):**

```swift
import CoreData

class PersistenceController {
    static let shared = PersistenceController()
    
    let container: NSPersistentContainer
    
    init() {
        container = NSPersistentContainer(name: "AppModel")
        container.loadPersistentStores { description, error in
            if let error = error {
                fatalError("Unable to load persistent stores: \(error)")
            }
        }
    }
    
    var viewContext: NSManagedObjectContext {
        container.viewContext
    }
}
```

## Creating Data Models

### Define Entities in Xcode

1. Create a `.xcdatamodeld` file
2. Add entities (like database tables)
3. Add attributes (like columns)
4. Define relationships

### Example Entity: Person

**Attributes:**
- `name`: String
- `age`: Int16
- `email`: String (optional)
- `createdAt`: Date

**In Code (NSManagedObject Subclass):**

```swift
import CoreData

@objc(Person)
public class Person: NSManagedObject {
    @NSManaged public var name: String
    @NSManaged public var age: Int16
    @NSManaged public var email: String?
    @NSManaged public var createdAt: Date
}
```

## CRUD Operations

### Create (Insert)

```swift
func createPerson(name: String, age: Int, email: String?) {
    let context = PersistenceController.shared.viewContext
    
    let person = Person(context: context)
    person.name = name
    person.age = Int16(age)
    person.email = email
    person.createdAt = Date()
    
    do {
        try context.save()
        print("✅ Person saved successfully")
    } catch {
        print("❌ Failed to save: \(error)")
    }
}

// Usage
createPerson(name: "John Doe", age: 30, email: "john@example.com")
```

### Read (Fetch)

**Fetch All:**
```swift
func fetchAllPeople() -> [Person] {
    let context = PersistenceController.shared.viewContext
    let fetchRequest: NSFetchRequest<Person> = Person.fetchRequest()
    
    do {
        let people = try context.fetch(fetchRequest)
        return people
    } catch {
        print("❌ Failed to fetch: \(error)")
        return []
    }
}

// Usage
let allPeople = fetchAllPeople()
for person in allPeople {
    print("\(person.name), Age: \(person.age)")
}
```

**Fetch with Predicate (Filter):**
```swift
func fetchPeople(olderThan age: Int) -> [Person] {
    let context = PersistenceController.shared.viewContext
    let fetchRequest: NSFetchRequest<Person> = Person.fetchRequest()
    
    // Filter: age > specified age
    fetchRequest.predicate = NSPredicate(format: "age > %d", age)
    
    // Sort by name
    fetchRequest.sortDescriptors = [NSSortDescriptor(key: "name", ascending: true)]
    
    do {
        return try context.fetch(fetchRequest)
    } catch {
        print("❌ Failed to fetch: \(error)")
        return []
    }
}

// Usage
let adults = fetchPeople(olderThan: 18)
```

**Fetch with Sort:**
```swift
func fetchPeopleSorted() -> [Person] {
    let context = PersistenceController.shared.viewContext
    let fetchRequest: NSFetchRequest<Person> = Person.fetchRequest()
    
    fetchRequest.sortDescriptors = [
        NSSortDescriptor(key: "age", ascending: false),
        NSSortDescriptor(key: "name", ascending: true)
    ]
    
    do {
        return try context.fetch(fetchRequest)
    } catch {
        return []
    }
}
```

### Update

```swift
func updatePerson(_ person: Person, newEmail: String) {
    let context = PersistenceController.shared.viewContext
    
    person.email = newEmail
    
    do {
        try context.save()
        print("✅ Person updated successfully")
    } catch {
        print("❌ Failed to update: \(error)")
    }
}

// Usage
if let firstPerson = fetchAllPeople().first {
    updatePerson(firstPerson, newEmail: "newemail@example.com")
}
```

### Delete

```swift
func deletePerson(_ person: Person) {
    let context = PersistenceController.shared.viewContext
    
    context.delete(person)
    
    do {
        try context.save()
        print("✅ Person deleted successfully")
    } catch {
        print("❌ Failed to delete: \(error)")
    }
}

// Delete all people
func deleteAllPeople() {
    let context = PersistenceController.shared.viewContext
    let fetchRequest: NSFetchRequest<NSFetchRequestResult> = Person.fetchRequest()
    let deleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
    
    do {
        try context.execute(deleteRequest)
        try context.save()
        print("✅ All people deleted")
    } catch {
        print("❌ Failed to delete: \(error)")
    }
}
```

## Predicates (Filtering)

### Basic Predicates

```swift
// Exact match
NSPredicate(format: "name == %@", "John")

// Contains
NSPredicate(format: "name CONTAINS[cd] %@", "john")  // case/diacritic insensitive

// Starts with
NSPredicate(format: "name BEGINSWITH %@", "J")

// Greater than
NSPredicate(format: "age > %d", 18)

// Between
NSPredicate(format: "age BETWEEN {18, 65}")

// IN
NSPredicate(format: "name IN %@", ["John", "Jane", "Bob"])
```

### Compound Predicates

```swift
// AND
let predicate1 = NSPredicate(format: "age > 18")
let predicate2 = NSPredicate(format: "email != nil")
let compound = NSCompoundPredicate(andPredicateWithSubpredicates: [predicate1, predicate2])

// OR
let orPredicate = NSCompoundPredicate(orPredicateWithSubpredicates: [predicate1, predicate2])

// NOT
let notPredicate = NSCompoundPredicate(notPredicateWith: predicate1)
```

## Relationships

### One-to-Many Relationship

**Example: Person has many Posts**

```swift
// Person entity
@objc(Person)
public class Person: NSManagedObject {
    @NSManaged public var name: String
    @NSManaged public var posts: NSSet?
}

// Post entity
@objc(Post)
public class Post: NSManagedObject {
    @NSManaged public var title: String
    @NSManaged public var content: String
    @NSManaged public var author: Person?
}

// Create person with posts
func createPersonWithPosts() {
    let context = PersistenceController.shared.viewContext
    
    let person = Person(context: context)
    person.name = "John"
    
    let post1 = Post(context: context)
    post1.title = "First Post"
    post1.content = "Content here"
    post1.author = person
    
    let post2 = Post(context: context)
    post2.title = "Second Post"
    post2.content = "More content"
    post2.author = person
    
    do {
        try context.save()
        print("✅ Person with posts saved")
    } catch {
        print("❌ Error: \(error)")
    }
}

// Access related objects
if let firstPerson = fetchAllPeople().first {
    if let posts = firstPerson.posts as? Set<Post> {
        for post in posts {
            print("Post: \(post.title)")
        }
    }
}
```

### Many-to-Many Relationship

**Example: Student enrolls in many Courses**

```swift
@objc(Student)
public class Student: NSManagedObject {
    @NSManaged public var name: String
    @NSManaged public var courses: NSSet?
}

@objc(Course)
public class Course: NSManagedObject {
    @NSManaged public var title: String
    @NSManaged public var students: NSSet?
}

// Enroll student in course
func enrollStudent(_ student: Student, in course: Course) {
    let context = PersistenceController.shared.viewContext
    
    student.addToCourses(course)
    
    do {
        try context.save()
    } catch {
        print("Error: \(error)")
    }
}
```

## Core Data with SwiftUI

### Setup in App

```swift
import SwiftUI

@main
struct MyApp: App {
    let persistenceController = PersistenceController.shared
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.viewContext)
        }
    }
}
```

### Using @FetchRequest

```swift
import SwiftUI
import CoreData

struct PeopleListView: View {
    @Environment(\.managedObjectContext) private var viewContext
    
    @FetchRequest(
        entity: Person.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \Person.name, ascending: true)]
    )
    private var people: FetchedResults<Person>
    
    var body: some View {
        NavigationView {
            List {
                ForEach(people) { person in
                    VStack(alignment: .leading) {
                        Text(person.name)
                            .font(.headline)
                        Text("Age: \(person.age)")
                            .font(.caption)
                    }
                }
                .onDelete(perform: deletePeople)
            }
            .navigationTitle("People")
            .toolbar {
                Button("Add") {
                    addPerson()
                }
            }
        }
    }
    
    private func addPerson() {
        let newPerson = Person(context: viewContext)
        newPerson.name = "New Person"
        newPerson.age = 25
        newPerson.createdAt = Date()
        
        do {
            try viewContext.save()
        } catch {
            print("Error: \(error)")
        }
    }
    
    private func deletePeople(offsets: IndexSet) {
        offsets.map { people[$0] }.forEach(viewContext.delete)
        
        do {
            try viewContext.save()
        } catch {
            print("Error: \(error)")
        }
    }
}
```

### Dynamic @FetchRequest

```swift
struct FilteredPeopleView: View {
    @Environment(\.managedObjectContext) private var viewContext
    @State private var minAge = 18
    
    var body: some View {
        VStack {
            Stepper("Min Age: \(minAge)", value: $minAge, in: 0...100)
                .padding()
            
            PeopleList(minAge: minAge)
        }
    }
}

struct PeopleList: View {
    @FetchRequest private var people: FetchedResults<Person>
    
    init(minAge: Int) {
        let predicate = NSPredicate(format: "age >= %d", minAge)
        _people = FetchRequest(
            entity: Person.entity(),
            sortDescriptors: [NSSortDescriptor(keyPath: \Person.name, ascending: true)],
            predicate: predicate
        )
    }
    
    var body: some View {
        List(people) { person in
            Text("\(person.name) - \(person.age)")
        }
    }
}
```

## Complete CRUD Example with SwiftUI

```swift
import SwiftUI
import CoreData

struct PersonFormView: View {
    @Environment(\.managedObjectContext) private var viewContext
    @Environment(\.dismiss) private var dismiss
    
    @State private var name = ""
    @State private var age = 18
    @State private var email = ""
    
    var body: some View {
        NavigationView {
            Form {
                Section("Personal Info") {
                    TextField("Name", text: $name)
                    Stepper("Age: \(age)", value: $age, in: 0...120)
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                }
                
                Section {
                    Button("Save") {
                        savePerson()
                    }
                    .disabled(name.isEmpty)
                }
            }
            .navigationTitle("Add Person")
            .toolbar {
                Button("Cancel") {
                    dismiss()
                }
            }
        }
    }
    
    private func savePerson() {
        let newPerson = Person(context: viewContext)
        newPerson.name = name
        newPerson.age = Int16(age)
        newPerson.email = email.isEmpty ? nil : email
        newPerson.createdAt = Date()
        
        do {
            try viewContext.save()
            dismiss()
        } catch {
            print("Error saving: \(error)")
        }
    }
}

struct PeopleView: View {
    @Environment(\.managedObjectContext) private var viewContext
    @FetchRequest(
        entity: Person.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \Person.name, ascending: true)]
    )
    private var people: FetchedResults<Person>
    
    @State private var showingAddPerson = false
    
    var body: some View {
        NavigationView {
            List {
                ForEach(people) { person in
                    NavigationLink {
                        PersonDetailView(person: person)
                    } label: {
                        VStack(alignment: .leading) {
                            Text(person.name)
                                .font(.headline)
                            HStack {
                                Text("Age: \(person.age)")
                                if let email = person.email {
                                    Text("• \(email)")
                                }
                            }
                            .font(.caption)
                            .foregroundColor(.gray)
                        }
                    }
                }
                .onDelete(perform: deletePeople)
            }
            .navigationTitle("People (\(people.count))")
            .toolbar {
                Button {
                    showingAddPerson = true
                } label: {
                    Image(systemName: "plus")
                }
            }
            .sheet(isPresented: $showingAddPerson) {
                PersonFormView()
            }
        }
    }
    
    private func deletePeople(offsets: IndexSet) {
        offsets.map { people[$0] }.forEach(viewContext.delete)
        
        do {
            try viewContext.save()
        } catch {
            print("Error deleting: \(error)")
        }
    }
}
```

## Best Practices

### 1. Use Background Contexts for Heavy Operations

```swift
func importLargeDataset() {
    let container = PersistenceController.shared.container
    
    container.performBackgroundTask { context in
        // Perform heavy work here
        for i in 0..<10000 {
            let person = Person(context: context)
            person.name = "Person \(i)"
            person.age = Int16(i % 100)
        }
        
        do {
            try context.save()
            print("✅ Import complete")
        } catch {
            print("❌ Error: \(error)")
        }
    }
}
```

### 2. Save Efficiently

```swift
// ✅ Good - Save only when needed
func saveBatch(_ items: [Data]) {
    let context = PersistenceController.shared.viewContext
    
    for item in items {
        let person = Person(context: context)
        // Set properties
    }
    
    // Save once after all inserts
    do {
        try context.save()
    } catch {
        print("Error: \(error)")
    }
}

// ❌ Avoid - Saving in loop
for item in items {
    let person = Person(context: context)
    try? context.save()  // Don't do this!
}
```

### 3. Handle Errors Properly

```swift
// ✅ Good - Proper error handling
do {
    try viewContext.save()
} catch let error as NSError {
    print("Core Data error: \(error), \(error.userInfo)")
}

// ❌ Avoid - Silent failures
try? viewContext.save()
```

### 4. Use Faulting for Memory Efficiency

```swift
// Core Data automatically faults (doesn't load all data)
// Only load what you need
fetchRequest.propertiesToFetch = ["name", "age"]
fetchRequest.returnsObjectsAsFaults = true
```

## Summary

Core Data provides powerful data persistence:

✅ **Object-Oriented** - Work with objects, not SQL  
✅ **Relationships** - Link data naturally  
✅ **SwiftUI Integration** - @FetchRequest for automatic updates  
✅ **Performance** - Faulting and batching for efficiency  
✅ **Validation** - Built-in data validation  

**Key Takeaways:**
- Use NSPersistentContainer for setup
- Define entities in .xcdatamodeld file
- Perform CRUD through NSManagedObjectContext
- Use predicates for filtering
- @FetchRequest in SwiftUI for reactive data
- Save context after modifications
- Use background contexts for heavy operations

---

**Congratulations!** 🎉 You've completed the entire Swift learning guide! You now have the knowledge to build complete iOS applications with data persistence!
