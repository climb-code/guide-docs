---
title: "SwiftUI Data Flow - Master State Management"
description: "Deep dive into SwiftUI state management with @State, @Binding, @ObservedObject, @StateObject, @EnvironmentObject, and data flow patterns"
---

Understanding data flow is crucial for building robust SwiftUI apps. SwiftUI is a declarative framework where UI is a function of state - when state changes, views automatically update.

## The SwiftUI State System

SwiftUI uses property wrappers to manage different types of state:

| Property Wrapper | Purpose | Ownership | Scope |
|-----------------|---------|-----------|-------|
| `@State` | Simple value types | View owns it | Single view |
| `@Binding` | Two-way connection | Parent owns it | Parent ↔ Child |
| `@StateObject` | Observable objects | View creates it | View's lifetime |
| `@ObservedObject` | Observable objects | External ownership | Injected |
| `@EnvironmentObject` | Shared state | App/scene level | Deep hierarchy |

## @State - Local View State

Use `@State` for simple, private state that belongs to a single view.

### Basic @State

```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.largeTitle)
            
            HStack {
                Button("-") { count -= 1 }
                Button("+") { count += 1 }
            }
        }
    }
}
```

**When to use @State:**
- Simple value types (Int, String, Bool, etc.)
- State belongs only to this view
- Marked `private` - doesn't escape view

### Multiple @State Properties

```swift
struct FormView: View {
    @State private var name = ""
    @State private var age = 18
    @State private var isStudent = false
    @State private var selectedColor = Color.blue
    
    var body: some View {
        Form {
            TextField("Name", text: $name)
            Stepper("Age: \(age)", value: $age, in: 0...120)
            Toggle("Student", isOn: $isStudent)
            ColorPicker("Favorite Color", selection: $selectedColor)
        }
    }
}
```

### @State with Structs

```swift
struct User {
    var name: String
    var email: String
}

struct UserEditView: View {
    @State private var user = User(name: "", email: "")
    
    var body: some View {
        Form {
            TextField("Name", text: $user.name)
            TextField("Email", text: $user.email)
        }
    }
}
```

## @Binding - Two-Way Data Flow

`@Binding` creates a two-way connection between parent and child views.

### Basic @Binding

```swift
// Child view with binding
struct ToggleView: View {
    @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Feature", isOn: $isOn)
    }
}

// Parent view with state
struct ParentView: View {
    @State private var featureEnabled = false
    
    var body: some View {
        VStack {
            Text(featureEnabled ? "ON" : "OFF")
                .font(.largeTitle)
            
            // Pass binding with $
         ToggleView(isOn: $featureEnabled)
        }
    }
}
```

**Key Points:**
- Child can read AND write parent's state
- Use `$` to create binding from @State
- Changes sync automatically

### Custom Bindings

Create bindings with custom get/set:

```swift
struct TemperatureConverter: View {
    @State private var celsius: Double = 0
    
    var fahrenheitBinding: Binding<Double> {
        Binding(
            get: { celsius * 9/5 + 32 },
            set: { celsius = ($0 - 32) * 5/9 }
        )
    }
    
    var body: some View {
        VStack {
            HStack {
                Text("Celsius:")
                TextField("°C", value: $celsius, format: .number)
                    .textFieldStyle(.roundedBorder)
                    .frame(width: 100)
            }
            
            HStack {
                Text("Fahrenheit:")
                TextField("°F", value: fahrenheitBinding, format: .number)
                    .textFieldStyle(.roundedBorder)
                    .frame(width: 100)
            }
        }
        .padding()
    }
}
```

### Constant Bindings

For previews or read-only cases:

```swift
struct Preview: View {
    var body: some View {
        ToggleView(isOn: .constant(true))
    }
}
```

## Observable Objects

For complex state, use classes conforming to `ObservableObject`.

### Creating an Observable Object

```swift
class UserViewModel: ObservableObject {
    @Published var username = ""
    @Published var email = ""
    @Published var bio = ""
    @Published var isLoading = false
    
    func saveProfile() {
        isLoading = true
        
        // Simulate network call
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.isLoading = false
            print("Saved: \(self.username)")
        }
    }
    
    func validateEmail() -> Bool {
        email.contains("@")
    }
}
```

**@Published Properties:**
- Automatically triggers view updates
- Use for any property that affects UI
- Works with value and reference types

## @StateObject - Owning Observable Objects

Use `@StateObject` when creating and owning an observable object.

### Basic @StateObject

```swift
struct ProfileView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        Form {
            Section("Personal Info") {
                TextField("Username", text: $viewModel.username)
                TextField("Email", text: $viewModel.email)
            }
            
            Section("Bio") {
                TextEditor(text: $viewModel.bio)
                    .frame(height: 100)
            }
            
            if viewModel.isLoading {
                ProgressView()
            } else {
                Button("Save") {
                    viewModel.saveProfile()
                }
                .disabled(!viewModel.validateEmail())
            }
        }
    }
}
```

**When to use @StateObject:**
- View creates the object
- Object should survive view updates
- Object lifetime tied to view

## @ObservedObject - Injected Observable Objects

Use `@ObservedObject` when object is created elsewhere.

### Passing Observable Objects

```swift
class ShoppingCart: ObservableObject {
    @Published var items: [String] = []
    @Published var total: Double = 0.0
    
    func addItem(_ name: String, price: Double) {
        items.append(name)
        total += price
    }
    
    func removeItem(at index: Int) {
        if index < items.count {
            items.remove(at: index)
            // Simplified - real app would track prices
        }
    }
}

// Parent creates and owns
struct ShopApp: View {
    @StateObject private var cart = ShoppingCart()
    
    var body: some View {
        TabView {
            ProductListView(cart: cart)
                .tabItem { Label("Shop", systemImage: "bag") }
            
            CartView(cart: cart)
                .tabItem { Label("Cart", systemImage: "cart") }
        }
    }
}

// Child receives via @ObservedObject
struct ProductListView: View {
    @ObservedObject var cart: ShoppingCart
    
    var body: some View {
        List {
            Button("Add iPhone ($999)") {
                cart.addItem("iPhone", price: 999)
            }
            
            Button("Add MacBook ($1999)") {
                cart.addItem("MacBook", price: 1999)
            }
        }
    }
}

struct CartView: View {
    @ObservedObject var cart: ShoppingCart
    
    var body: some View {
        List {
            ForEach(Array(cart.items.enumerated()), id: \.offset) { index, item in
                Text(item)
            }
            .onDelete { indexSet in
                indexSet.forEach { cart.removeItem(at: $0) }
            }
            
            Text("Total: $\(cart.total, specifier: "%.2f")")
                .font(.headline)
        }
    }
}
```

## @EnvironmentObject - Dependency Injection

Share objects across the view hierarchy without explicit passing.

### Creating Environment Objects

```swift
class AppSettings: ObservableObject {
    @Published var isDarkMode = false
    @Published var fontSize: Double = 16
    @Published var notificationsEnabled = true
}

// Inject at root level
@main
struct MyApp: App {
    @StateObject private var settings = AppSettings()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settings)
        }
    }
}

// Access anywhere in hierarchy
struct SettingsView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Form {
            Toggle("Dark Mode", isOn: $settings.isDarkMode)
            Toggle("Notifications", isOn: $settings.notificationsEnabled)
            
            Slider(value: $settings.fontSize, in: 12...24)
            Text("Font Size: \(settings.fontSize, specifier: "%.0f")")
        }
    }
}

// Even deeply nested views can access
struct DeepNestedView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Text("Settings loaded!")
            .font(.system(size: settings.fontSize))
    }
}
```

**When to use @EnvironmentObject:**
- Global/app-wide state
- Shared across many views
- Avoids passing through intermediate views

## Data Flow Patterns

### Unidirectional Data Flow

```swift
// Model
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool
}

// ViewModel (single source of truth)
class TodoViewModel: ObservableObject {
    @Published var todos: [TodoItem] = []
    
    func addTodo(title: String) {
        let todo = TodoItem(title: title, isCompleted: false)
        todos.append(todo)
    }
    
    func toggleComplete(id: UUID) {
        if let index = todos.firstIndex(where: { $0.id == id }) {
            todos[index].isCompleted.toggle()
        }
    }
    
    func deleteTodo(id: UUID) {
        todos.removeAll { $0.id == id }
    }
}

// View
struct TodoListView: View {
    @StateObject private var viewModel = TodoViewModel()
    @State private var newTodoTitle = ""
    
    var body: some View {
        VStack {
            // Input
            HStack {
                TextField("New todo", text: $newTodoTitle)
                Button("Add") {
                    viewModel.addTodo(title: newTodoTitle)
                    newTodoTitle = ""
                }
            }
            .padding()
            
            // List
            List {
                ForEach(viewModel.todos) { todo in
                    TodoRow(
                        todo: todo,
                        onToggle: { viewModel.toggleComplete(id: todo.id) },
                        onDelete: { viewModel.deleteTodo(id: todo.id) }
                    )
                }
            }
        }
    }
}

struct TodoRow: View {
    let todo: TodoItem
    let onToggle: () -> Void
    let onDelete: () -> Void
    
    var body: some View {
        HStack {
            Button(action: onToggle) {
                Image(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
            }
            
            Text(todo.title)
                .strikethrough(todo.isCompleted)
            
            Spacer()
            
            Button(action: onDelete) {
                Image(systemName: "trash")
                    .foregroundColor(.red)
            }
        }
    }
}
```

### Parent-Child Communication

```swift
// Child emits events, parent handles them
struct SearchBar: View {
    @Binding var text: String
    let onSearch: () -> Void
    
    var body: some View {
        HStack {
            TextField("Search...", text: $text)
                .textFieldStyle(.roundedBorder)
            
            Button("Search", action: onSearch)
        }
    }
}

struct ParentSearchView: View {
    @State private var searchText = ""
    @State private var results: [String] = []
    
    var body: some View {
        VStack {
            SearchBar(text: $searchText) {
                performSearch()
            }
            
            List(results, id: \.self) { result in
                Text(result)
            }
        }
    }
    
    func performSearch() {
        results = ["Result 1", "Result 2", "Result 3"]
            .filter { $0.contains(searchText) }
    }
}
```

## Performance Considerations

### Avoiding Unnecessary Updates

```swift
// ✅ Good - Specific published properties
class ViewModel: ObservableObject {
    @Published var username: String = ""
    @Published var isLoading: Bool = false
    
    var internalCache: [String: Any] = [:]  // Not @Published
}

// ❌ Avoid - Everything triggers updates
class BadViewModel: ObservableObject {
    @Published var allData: [String: Any] = [:]  // Changes often
}
```

### Using Equatable

```swift
struct User: Equatable {
    let id: UUID
    var name: String
    var email: String
}

class UserViewModel: ObservableObject {
    @Published var user: User = User(id: UUID(), name: "", email: "")
}

// SwiftUI only updates if user actually changes
```

## Best Practices

### 1. Choose the Right Property Wrapper

```swift
// ✅ Local simple state
@State private var count = 0

// ✅ Parent-child connection
@Binding var isEnabled: Bool

// ✅ View owns complex state
@StateObject private var viewModel = ViewModel()

// ✅ Injected complex state
@ObservedObject var cart: ShoppingCart

// ✅ App-wide state
@EnvironmentObject var settings: AppSettings
```

### 2. Keep State Private

```swift
// ✅ Good - State is private
@State private var isExpanded = false

// ❌ Avoid - State should be internal
@State var isExpanded = false
```

### 3. Single Source of Truth

```swift
// ✅ Good - One source
class ViewModel: ObservableObject {
    @Published var items: [Item] = []
    
    var completedItems: [Item] {
        items.filter { $0.isCompleted }
    }
}

// ❌ Avoid - Duplicate state
class BadViewModel: ObservableObject {
    @Published var items: [Item] = []
    @Published var completedItems: [Item] = []  // Duplicate!
}
```

### 4. Minimize Published Properties

```swift
// ✅ Good - Only UI-affecting properties
class ViewModel: ObservableObject {
    @Published var displayText: String = ""
    
    private var cache: [String: Data] = [:]  // Internal only
}
```

## Summary

- ✅ **@State** - Simple, private view state
- ✅ **@Binding** - Two-way parent-child connection
- ✅ **@StateObject** - View creates and owns observable object
- ✅ **@ObservedObject** - Observable object passed from parent
- ✅ **@EnvironmentObject** - App-wide dependency injection
- ✅ **@Published** - Properties that trigger UI updates
- ✅ **Single Source of Truth** - One place for each piece of state
- ✅ **Unidirectional Flow** - Data flows down, events flow up

**Master data flow to build scalable, maintainable SwiftUI apps!** 🎯

---

*Next: Explore SwiftUI Gestures for interactive touch-based interfaces.*
