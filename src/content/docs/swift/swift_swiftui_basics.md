---
title: "SwiftUI Basics - Building Modern iOS Apps"
description: "Learn SwiftUI fundamentals including declarative UI, views, modifiers, state management, and data flow"
---

SwiftUI is Apple's modern, declarative framework for building user interfaces across all Apple platforms. Introduced in 2019, it revolutionizes how we create apps by using a declarative syntax that's easy to read and write.

## What is SwiftUI?

SwiftUI is a declarative UI framework that lets you build user interfaces by describing **what** you want, rather than **how** to create it. Instead of imperatively creating and managing views, you declare the structure and let SwiftUI handle the rest.

### Key Features

**🎨 Declarative Syntax**
- Describe your UI as a function of state
- SwiftUI automatically updates the UI when state changes
- Less code, fewer bugs

**⚡ Real-Time Preview**
- See changes instantly in Xcode's canvas
- Interactive previews for rapid development
- Test different configurations side-by-side

**🔄 Data-Driven**
- Built-in state management
- Automatic UI updates when data changes
- Reactive programming model

**🌐 Cross-Platform**
- Same code works on iOS, macOS, watchOS, and tvOS
- Platform-specific adaptations happen automatically
- Shared components across platforms

## SwiftUI vs UIKit

| Feature | SwiftUI | UIKit |
|---------|---------|-------|
| **Paradigm** | Declarative | Imperative |
| **Code Style** | Functional, composable | Object-oriented |
| **UI Updates** | Automatic | Manual |
| **Learning Curve** | Easier for beginners | Steeper |
| **Maturity** | Modern (2019+) | Mature (2008+) |
| **Storyboards** | No storyboards | Optional storyboards |

## Your First SwiftUI View

Let's create a simple "Hello, World!" view:

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, SwiftUI!")
    }
}

// Preview provider for Xcode canvas
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

**Understanding the Code:**
- `struct ContentView: View` - Every view conforms to the `View` protocol
- `var body: some View` - Required property that describes the view's content
- `Text("Hello, SwiftUI!")` - A built-in view that displays text
- `PreviewProvider` - Shows the view in Xcode's canvas

## Basic Views and Modifiers

### Text View

Display and style text:

```swift
struct TextExamples: View {
    var body: some View {
        VStack(spacing: 20) {
            // Basic text
            Text("Welcome to SwiftUI")
            
            // Styled text
            Text("Bold and Blue")
                .font(.title)
                .fontWeight(.bold)
                .foregroundColor(.blue)
            
            // Custom font
            Text("Custom Typography")
                .font(.system(size: 24, weight: .semibold, design: .rounded))
            
            // Multi-line text
            Text("This is a longer text that will wrap to multiple lines automatically")
                .multilineTextAlignment(.center)
                .lineLimit(3)
        }
        .padding()
    }
}
```

### Image View

Display images from assets or system symbols:

```swift
struct ImageExamples: View {
    var body: some View {
        VStack(spacing: 20) {
            // SF Symbol (Apple's icon library)
            Image(systemName: "star.fill")
                .font(.system(size: 50))
                .foregroundColor(.yellow)
            
            // Image from assets
            Image("myPhoto")
                .resizable()
                .scaledToFit()
                .frame(width: 200, height: 200)
                .clipShape(Circle())
                .shadow(radius: 10)
        }
    }
}
```

### Button View

Create interactive buttons:

```swift
struct ButtonExamples: View {
    var body: some View {
        VStack(spacing: 20) {
            // Simple button
            Button("Tap Me") {
                print("Button tapped!")
            }
            
            // Styled button
            Button(action: {
                print("Custom button tapped")
            }) {
                Text("Custom Button")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.blue)
                    .cornerRadius(10)
            }
            
            // Button with icon
            Button(action: {
                print("Icon button tapped")
            }) {
                Label("Save", systemImage: "square.and.arrow.down")
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}
```

## Layout Containers

SwiftUI provides powerful layout containers to arrange views.

### VStack - Vertical Stack

Arranges views vertically:

```swift
struct VStackExample: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("First Item")
            Text("Second Item")
            Text("Third Item")
        }
        .padding()
    }
}
```

### HStack - Horizontal Stack

Arranges views horizontally:

```swift
struct HStackExample: View {
    var body: some View {
        HStack(alignment: .center, spacing: 20) {
            Image(systemName: "person.fill")
            Text("John Doe")
            Spacer()
            Image(systemName: "chevron.right")
        }
        .padding()
    }
}
```

### ZStack - Depth Stack

Layers views on top of each other:

```swift
struct ZStackExample: View {
    var body: some View {
        ZStack {
            // Background
            Color.blue
                .ignoresSafeArea()
            
            // Middle layer
            Circle()
                .fill(Color.white.opacity(0.3))
                .frame(width: 200, height: 200)
            
            // Foreground
            Text("Layered View")
                .font(.title)
                .foregroundColor(.white)
        }
    }
}
```

### Complex Layout Example

Combining stacks for a profile card:

```swift
struct ProfileCard: View {
    var body: some View {
        VStack(spacing: 20) {
            // Profile image
            Image(systemName: "person.circle.fill")
                .font(.system(size: 100))
                .foregroundColor(.blue)
            
            // User info
            VStack(spacing: 8) {
                Text("Jane Smith")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text("iOS Developer")
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            
            // Stats
            HStack(spacing: 40) {
                VStack {
                    Text("128")
                        .font(.headline)
                    Text("Posts")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                VStack {
                    Text("2.5K")
                        .font(.headline)
                    Text("Followers")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
                
                VStack {
                    Text("340")
                        .font(.headline)
                    Text("Following")
                        .font(.caption)
                        .foregroundColor(.gray)
                }
            }
        }
        .padding()
        .background(Color.white)
        .cornerRadius(20)
        .shadow(radius: 10)
        .padding()
    }
}
```

## State Management

State management is crucial in SwiftUI. Views are a function of state - when state changes, the view automatically updates.

### @State - Local State

Use `@State` for simple, local view state:

```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Count: \(count)")
                .font(.largeTitle)
            
            HStack(spacing: 20) {
                Button("Decrease") {
                    count -= 1
                }
                .buttonStyle(.bordered)
                
                Button("Increase") {
                    count += 1
                }
                .buttonStyle(.borderedProminent)
            }
        }
        .padding()
    }
}
```

**Key Points:**
- `@State` creates a source of truth for the view
- Marked as `private` - it belongs to this view only
- When state changes, SwiftUI automatically re-renders the view
- Use for simple value types (Int, String, Bool, etc.)

### @Binding - Two-Way Connection

`@Binding` creates a two-way connection between parent and child views:

```swift
// Child view with binding
struct ToggleView: View {
    @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Feature Enabled", isOn: $isOn)
            .padding()
    }
}

// Parent view with state
struct SettingsView: View {
    @State private var notificationsEnabled = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Notifications: \(notificationsEnabled ? "ON" : "OFF")")
                .font(.headline)
            
            // Pass binding to child view using $
            ToggleView(isOn: $notificationsEnabled)
        }
        .padding()
    }
}
```

**Understanding Bindings:**
- `$` prefix creates a binding from a state variable
- Child can read AND write the parent's state
- Changes in child update parent, and vice versa

### @StateObject - Observable Objects

For complex state, use `@StateObject` with `ObservableObject`:

```swift
// Data model
class UserProfileViewModel: ObservableObject {
    @Published var username = ""
    @Published var email = ""
    @Published var bio = ""
    
    func saveProfile() {
        print("Saving: \(username), \(email)")
    }
}

// View using the model
struct ProfileEditView: View {
    @StateObject private var viewModel = UserProfileViewModel()
    
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
            
            Button("Save Profile") {
                viewModel.saveProfile()
            }
            .buttonStyle(.borderedProminent)
        }
    }
}
```

**Observable Object Pattern:**
- `ObservableObject` protocol for reference types
- `@Published` marks properties that trigger UI updates
- `@StateObject` creates and owns the object
- Use for complex models and business logic

### @ObservedObject - Shared State

When an object is created elsewhere and passed in:

```swift
class ShoppingCart: ObservableObject {
    @Published var items: [String] = []
    @Published var total: Double = 0.0
    
    func addItem(_ item: String, price: Double) {
        items.append(item)
        total += price
    }
}

struct ProductView: View {
    @ObservedObject var cart: ShoppingCart
    
    var body: some View {
        VStack {
            Text("Items in cart: \(cart.items.count)")
            Text("Total: $\(cart.total, specifier: "%.2f")")
            
            Button("Add Item") {
                cart.addItem("Product", price: 29.99)
            }
        }
    }
}
```

### @EnvironmentObject - Global State

Share data across many views without passing it explicitly:

```swift
class AppSettings: ObservableObject {
    @Published var isDarkMode = false
    @Published var fontSize: Double = 16
}

// Root view
struct MainApp: View {
    @StateObject private var settings = AppSettings()
    
    var body: some View {
        NavigationView {
            ContentView()
        }
        .environmentObject(settings)  // Inject into environment
    }
}

// Any descendant view can access it
struct SettingsView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Form {
            Toggle("Dark Mode", isOn: $settings.isDarkMode)
            
            Slider(value: $settings.fontSize, in: 12...24)
            Text("Font Size: \(settings.fontSize, specifier: "%.0f")")
        }
    }
}
```

## Common Modifiers

Modifiers customize view appearance and behavior.

### Styling Modifiers

```swift
struct ModifierExamples: View {
    var body: some View {
        Text("Styled Text")
            // Font and text
            .font(.title)
            .fontWeight(.bold)
            .foregroundColor(.white)
            
            // Spacing
            .padding()
            .padding(.horizontal, 20)
            
            // Background and shape
            .background(Color.blue)
            .cornerRadius(10)
            
            // Border
            .border(Color.red, width: 2)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.white, lineWidth: 2)
            )
            
            // Shadow
            .shadow(color: .gray, radius: 5, x: 0, y: 2)
            
            // Opacity
            .opacity(0.9)
    }
}
```

### Layout Modifiers

```swift
struct LayoutModifiers: View {
    var body: some View {
        VStack {
            Text("Fixed Size")
                .frame(width: 200, height: 100)
                .background(Color.blue)
            
            Text("Flexible")
                .frame(maxWidth: .infinity)
                .background(Color.green)
            
            Text("Aligned")
                .frame(width: 200, height: 100, alignment: .topLeading)
                .background(Color.orange)
        }
    }
}
```

### Order Matters!

Modifier order affects the result:

```swift
struct ModifierOrder: View {
    var body: some View {
        VStack(spacing: 20) {
            // Padding then background
            Text("Padding First")
                .padding()
                .background(Color.blue)
            
            // Background then padding
            Text("Background First")
                .background(Color.blue)
                .padding()
        }
    }
}
```

The first example has blue background around the text, the second has padding around the blue background!

## Lists and Navigation

### Simple List

```swift
struct FruitList: View {
    let fruits = ["Apple", "Banana", "Orange", "Mango", "Strawberry"]
    
    var body: some View {
        List(fruits, id: \.self) { fruit in
            HStack {
                Image(systemName: "leaf.fill")
                    .foregroundColor(.green)
                Text(fruit)
            }
        }
    }
}
```

### List with Custom Data

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    var isCompleted: Bool
}

struct TaskListView: View {
    @State private var tasks = [
        Task(title: "Learn SwiftUI", isCompleted: false),
        Task(title: "Build an app", isCompleted: false),
        Task(title: "Deploy to App Store", isCompleted: false)
    ]
    
    var body: some View {
        List($tasks) { $task in
            HStack {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(task.isCompleted ? .green : .gray)
                Text(task.title)
                    .strikethrough(task.isCompleted)
            }
            .onTapGesture {
                task.isCompleted.toggle()
            }
        }
    }
}
```

### Navigation

```swift
struct NavigationExample: View {
    var body: some View {
        NavigationView {
            List {
                NavigationLink("Profile") {
                    ProfileDetailView()
                }
                
                NavigationLink("Settings") {
                    SettingsDetailView()
                }
                
                NavigationLink("About") {
                    AboutView()
                }
            }
            .navigationTitle("Menu")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

struct ProfileDetailView: View {
    var body: some View {
        Text("Profile Details")
            .navigationTitle("Profile")
    }
}
```

## Forms and Input

SwiftUI makes forms easy:

```swift
struct RegistrationForm: View {
    @State private var username = ""
    @State private var email = ""
    @State private var password = ""
    @State private var agreeToTerms = false
    @State private var selectedCountry = "USA"
    
    let countries = ["USA", "Canada", "UK", "Australia"]
    
    var body: some View {
        NavigationView {
            Form {
                Section("Account Info") {
                    TextField("Username", text: $username)
                        .textInputAutocapitalization(.never)
                    
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .textInputAutocapitalization(.never)
                    
                    SecureField("Password", text: $password)
                }
                
                Section("Location") {
                    Picker("Country", selection: $selectedCountry) {
                        ForEach(countries, id: \.self) { country in
                            Text(country)
                        }
                    }
                }
                
                Section {
                    Toggle("I agree to terms and conditions", isOn: $agreeToTerms)
                }
                
                Section {
                    Button("Create Account") {
                        print("Account created for \(username)")
                    }
                    .disabled(!agreeToTerms || username.isEmpty)
                }
            }
            .navigationTitle("Register")
        }
    }
}
```

## Practical Example - Todo App

Let's build a complete Todo app combining everything we've learned:

```swift
// Data model
struct TodoItem: Identifiable {
    let id = UUID()
    var title: String
    var isCompleted: Bool = false
}

// View model
class TodoViewModel: ObservableObject {
    @Published var todos: [TodoItem] = [
        TodoItem(title: "Learn SwiftUI basics"),
        TodoItem(title: "Build a project"),
        TodoItem(title: "Master state management")
    ]
    
    func addTodo(title: String) {
        let newTodo = TodoItem(title: title)
        todos.append(newTodo)
    }
    
    func toggleComplete(for todo: TodoItem) {
        if let index = todos.firstIndex(where: { $0.id == todo.id }) {
            todos[index].isCompleted.toggle()
        }
    }
    
    func deleteTodo(at offsets: IndexSet) {
        todos.remove(atOffsets: offsets)
    }
}

// Main view
struct TodoListView: View {
    @StateObject private var viewModel = TodoViewModel()
    @State private var newTodoTitle = ""
    
    var body: some View {
        NavigationView {
            VStack {
                // Input section
                HStack {
                    TextField("New todo...", text: $newTodoTitle)
                        .textFieldStyle(.roundedBorder)
                    
                    Button(action: addTodo) {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                    }
                    .disabled(newTodoTitle.isEmpty)
                }
                .padding()
                
                // Todo list
                List {
                    ForEach(viewModel.todos) { todo in
                        TodoRow(todo: todo) {
                            viewModel.toggleComplete(for: todo)
                        }
                    }
                    .onDelete(perform: viewModel.deleteTodo)
                }
                
                // Stats
                HStack {
                    Text("\(viewModel.todos.count) total")
                    Spacer()
                    Text("\(completedCount) completed")
                }
                .font(.caption)
                .foregroundColor(.gray)
                .padding()
            }
            .navigationTitle("My Todos")
        }
    }
    
    private var completedCount: Int {
        viewModel.todos.filter { $0.isCompleted }.count
    }
    
    private func addTodo() {
        guard !newTodoTitle.isEmpty else { return }
        viewModel.addTodo(title: newTodoTitle)
        newTodoTitle = ""
    }
}

// Row view
struct TodoRow: View {
    let todo: TodoItem
    let onToggle: () -> Void
    
    var body: some View {
        HStack {
            Image(systemName: todo.isCompleted ? "checkmark.circle.fill" : "circle")
                .foregroundColor(todo.isCompleted ? .green : .gray)
                .font(.title3)
            
            Text(todo.title)
                .strikethrough(todo.isCompleted)
                .foregroundColor(todo.isCompleted ? .gray : .primary)
            
            Spacer()
        }
        .contentShape(Rectangle())
        .onTapGesture {
            onToggle()
        }
    }
}
```

## Best Practices

### 1. Keep Views Small

Break down complex views into smaller, reusable components:

```swift
// ❌ Bad - One massive view
struct ProfileView: View {
    var body: some View {
        VStack {
            // 100+ lines of code...
        }
    }
}

// ✅ Good - Modular components
struct ProfileView: View {
    var body: some View {
        VStack {
            ProfileHeader()
            ProfileStats()
            ProfileBio()
            ProfileActions()
        }
    }
}
```

### 2. Use Computed Properties

For derived data:

```swift
struct ShoppingCartView: View {
    let items: [CartItem]
    
    var totalPrice: Double {
        items.reduce(0) { $0 + $1.price }
    }
    
    var body: some View {
        Text("Total: $\(totalPrice, specifier: "%.2f")")
    }
}
```

### 3. Extract Subviews

Use `@ViewBuilder` for complex conditional views:

```swift
struct ContentView: View {
    @State private var isLoading = false
    
    var body: some View {
        VStack {
            headerView
            mainContent
        }
    }
    
    @ViewBuilder
    private var mainContent: some View {
        if isLoading {
            ProgressView("Loading...")
        } else {
            Text("Content loaded")
        }
    }
    
    private var headerView: some View {
        Text("My App")
            .font(.title)
    }
}
```

### 4. Prefer Immutability

Use `let` for properties that don't change:

```swift
// ✅ Good
struct UserCard: View {
    let username: String
    let avatarURL: String
    
    var body: some View {
        // ...
    }
}
```

## Common Patterns

### Loading State

```swift
struct DataView: View {
    @State private var isLoading = true
    @State private var data: [String] = []
    
    var body: some View {
        Group {
            if isLoading {
                ProgressView("Loading...")
            } else if data.isEmpty {
                Text("No data available")
                    .foregroundColor(.gray)
            } else {
                List(data, id: \.self) { item in
                    Text(item)
                }
            }
        }
        .onAppear {
            loadData()
        }
    }
    
    func loadData() {
        // Simulate network call
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            data = ["Item 1", "Item 2", "Item 3"]
            isLoading = false
        }
    }
}
```

### Alert Pattern

```swift
struct AlertExample: View {
    @State private var showAlert = false
    @State private var alertMessage = ""
    
    var body: some View {
        Button("Show Alert") {
            alertMessage = "This is an important message!"
            showAlert = true
        }
        .alert("Notification", isPresented: $showAlert) {
            Button("OK", role: .cancel) { }
            Button("Delete", role: .destructive) {
                print("Deleted")
            }
        } message: {
            Text(alertMessage)
        }
    }
}
```

## Next Steps

Now that you understand SwiftUI basics, you can:

1. **Build Real Apps** - Start with simple projects
2. **Learn Advanced Topics**:
   - Custom view modifiers
   - Animations and transitions
   - Gestures
   - Shape and path drawing
3. **Explore Frameworks**:
   - Combine for reactive programming
   - Core Data integration
   - CloudKit for backend

## Summary

- ✅ **SwiftUI is declarative** - Describe what you want, not how to build it
- ✅ **Views are structs** - Lightweight and efficient
- ✅ **State drives UI** - When state changes, views update automatically
- ✅ **Modifiers customize views** - Chain modifiers to style and layout
- ✅ **Layout containers** - VStack, HStack, ZStack for composition
- ✅ **State management** - @State, @Binding, @StateObject, @ObservedObject, @EnvironmentObject
- ✅ **Lists and Navigation** - Built-in components for common patterns
- ✅ **Forms** - Easy data input and validation

**Ready to build amazing iOS apps?** Start practicing with small projects and gradually increase complexity! 🚀

---

*Next: Learn about UIKit fundamentals for apps that need more control or integration with legacy code.*
