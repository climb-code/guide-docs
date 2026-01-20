---
title: "SwiftUI Navigation - Master App Navigation"
description: "Learn SwiftUI navigation patterns including NavigationStack, NavigationLink, programmatic navigation, deep linking, and tab navigation"
---

Navigation is essential for creating multi-screen iOS apps. SwiftUI provides powerful, declarative navigation tools that make it easy to create intuitive user flows.

## What is SwiftUI Navigation?

SwiftUI navigation allows users to move between different views in your app. Unlike UIKit's imperative approach, SwiftUI uses a declarative system where you describe the navigation structure and let SwiftUI handle the implementation.

### Navigation Evolution

**iOS 13-15: NavigationView (Legacy)**
- Original navigation container
- Limited programmatic control
- Still works but deprecated

**iOS 16+: NavigationStack (Modern)** ⭐
- Type-safe navigation
- Programmatic control
- Better performance
- Recommended for new projects

## NavigationStack Basics

The `NavigationStack` is the foundation of SwiftUI navigation.

### Simple Navigation

```swift
struct ContentView: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Text("Welcome!")
                    .font(.largeTitle)
                
                NavigationLink("Go to Details") {
                    DetailView()
                }
                .buttonStyle(.borderedProminent)
            }
            .navigationTitle("Home")
        }
    }
}

struct DetailView: View {
    var body: some View {
        Text("Detail Screen")
            .font(.title)
            .navigationTitle("Details")
    }
}
```

**Key Points:**
- `NavigationStack` wraps your content
- `NavigationLink` creates clickable navigation
- Back button appears automatically
- Navigation title shows at the top

### NavigationLink Styles

Different ways to create navigation links:

```swift
struct NavigationLinkExamples: View {
    var body: some View {
        NavigationStack {
            List {
                // Style 1: Simple text link
                NavigationLink("Simple Link") {
                    Text("Destination 1")
                }
                
                // Style 2: Custom label
                NavigationLink {
                    Text("Destination 2")
                } label: {
                    HStack {
                        Image(systemName: "star.fill")
                        Text("Custom Label")
                        Spacer()
                        Text("New")
                            .font(.caption)
                            .foregroundColor(.white)
                            .padding(.horizontal, 8)
                            .background(Color.red)
                            .cornerRadius(8)
                    }
                }
                
                // Style 3: With value (type-safe)
                NavigationLink("Profile", value: "profile")
                NavigationLink("Settings", value: "settings")
            }
            .navigationTitle("Links")
            .navigationDestination(for: String.self) { value in
                DestinationView(id: value)
            }
        }
    }
}

struct DestinationView: View {
    let id: String
    
    var body: some View {
        Text("Viewing: \(id)")
            .navigationTitle(id.capitalized)
    }
}
```

## Programmatic Navigation

Control navigation with state using `NavigationPath`.

### NavigationPath - Type-Safe Navigation

```swift
struct ProgrammaticNavigationExample: View {
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            VStack(spacing: 20) {
                Text("Programmatic Navigation")
                    .font(.title)
                
                Button("Push Screen A") {
                    path.append("ScreenA")
                }
                
                Button("Push Screen B") {
                    path.append("ScreenB")
                }
                
                Button("Push Multiple Screens") {
                    path.append("ScreenA")
                    path.append("ScreenB")
                    path.append("ScreenC")
                }
                
                Button("Go to Root") {
                    path.removeLast(path.count)
                }
                .disabled(path.isEmpty)
                
                Text("Path Count: \(path.count)")
                    .foregroundColor(.gray)
            }
            .navigationTitle("Home")
            .navigationDestination(for: String.self) { screen in
                ScreenView(name: screen, path: $path)
            }
        }
    }
}

struct ScreenView: View {
    let name: String
    @Binding var path: NavigationPath
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Screen: \(name)")
                .font(.title)
            
            Button("Go Back") {
                path.removeLast()
            }
            
            Button("Go to Root") {
                path.removeLast(path.count)
            }
            
            Button("Push Another Screen") {
                path.append("\(name)-Child")
            }
        }
        .navigationTitle(name)
    }
}
```

**NavigationPath Features:**
- Type-erased container for navigation
- Can hold different types
- Supports append, removeLast, and more
- Perfect for deep linking

### Multiple Destination Types

Handle different data types in navigation:

```swift
enum Route: Hashable {
    case profile(User)
    case settings
    case article(Article)
}

struct User: Hashable {
    let id: Int
    let name: String
}

struct Article: Hashable {
    let id: Int
    let title: String
}

struct MultiTypeNavigationExample: View {
    @State private var path: [Route] = []
    
    var body: some View {
        NavigationStack(path: $path) {
            List {
                Button("View Profile") {
                    path.append(.profile(User(id: 1, name: "John Doe")))
                }
                
                Button("Open Settings") {
                    path.append(.settings)
                }
                
                Button("Read Article") {
                    path.append(.article(Article(id: 1, title: "SwiftUI Navigation")))
                }
            }
            .navigationTitle("Menu")
            .navigationDestination(for: Route.self) { route in
                switch route {
                case .profile(let user):
                    ProfileView(user: user)
                case .settings:
                    SettingsView()
                case .article(let article):
                    ArticleView(article: article)
                }
            }
        }
    }
}

struct ProfileView: View {
    let user: User
    
    var body: some View {
        Text("Profile: \(user.name)")
            .navigationTitle("Profile")
    }
}

struct SettingsView: View {
    var body: some View {
        Text("Settings")
            .navigationTitle("Settings")
    }
}

struct ArticleView: View {
    let article: Article
    
    var body: some View {
        Text(article.title)
            .navigationTitle("Article")
    }
}
```

## Navigation Bar Customization

### Title Display Modes

```swift
struct TitleModesExample: View {
    var body: some View {
        NavigationStack {
            List(1...50, id: \.self) { number in
                Text("Item \(number)")
            }
            .navigationTitle("Large Title")
            .navigationBarTitleDisplayMode(.large) // or .inline or .automatic
        }
    }
}
```

### Toolbar Items

```swift
struct ToolbarExample: View {
    @State private var showingSheet = false
    
    var body: some View {
        NavigationStack {
            Text("Content")
                .navigationTitle("Toolbar Demo")
                .toolbar {
                    // Leading items
                    ToolbarItem(placement: .navigationBarLeading) {
                        Button("Cancel") {
                            print("Cancel tapped")
                        }
                    }
                    
                    // Trailing items
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button {
                            showingSheet = true
                        } label: {
                            Image(systemName: "plus")
                        }
                    }
                    
                    // Or use ToolbarItemGroup for multiple items
                    ToolbarItemGroup(placement: .navigationBarTrailing) {
                        Button {
                            print("Edit")
                        } label: {
                            Image(systemName: "pencil")
                        }
                        
                        Button {
                            print("Share")
                        } label: {
                            Image(systemName: "square.and.arrow.up")
                        }
                    }
                }
                .sheet(isPresented: $showingSheet) {
                    Text("Sheet Content")
                }
        }
    }
}
```

### Hide Navigation Bar

```swift
struct HiddenNavBarExample: View {
    var body: some View {
        NavigationStack {
            Text("No navigation bar")
                .navigationBarHidden(true)
                // or use .toolbar(.hidden)
        }
    }
}
```

## Tab Navigation with TabView

Create tab-based navigation:

```swift
struct TabNavigationExample: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTab()
                .tabItem {
                    Label("Home", systemImage: "house.fill")
                }
                .tag(0)
            
            SearchTab()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                }
                .tag(1)
            
            ProfileTab()
                .tabItem {
                    Label("Profile", systemImage: "person.fill")
                }
                .tag(2)
        }
    }
}

struct HomeTab: View {
    var body: some View {
        NavigationStack {
            List(1...20, id: \.self) { item in
                NavigationLink("Item \(item)") {
                    Text("Detail \(item)")
                }
            }
            .navigationTitle("Home")
        }
    }
}

struct SearchTab: View {
    @State private var searchText = ""
    
    var body: some View {
        NavigationStack {
            VStack {
                TextField("Search...", text: $searchText)
                    .textFieldStyle(.roundedBorder)
                    .padding()
                
                Text("Search for: \(searchText)")
            }
            .navigationTitle("Search")
        }
    }
}

struct ProfileTab: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 20) {
                Image(systemName: "person.circle.fill")
                    .font(.system(size: 100))
                
                Text("John Doe")
                    .font(.title)
            }
            .navigationTitle("Profile")
        }
    }
}
```

### Tab Badge

Show notifications on tabs:

```swift
struct TabBadgeExample: View {
    var body: some View {
        TabView {
            Text("Messages")
                .tabItem {
                    Label("Messages", systemImage: "message.fill")
                }
                .badge(5)  // Shows number badge
            
            Text("Settings")
                .tabItem {
                    Label("Settings", systemImage: "gear")
                }
                .badge("!")  // Shows text badge
        }
    }
}
```

## Deep Linking

Handle deep links and universal links:

```swift
struct DeepLinkingApp: View {
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            List {
                Text("Home Screen")
            }
            .navigationTitle("Home")
            .navigationDestination(for: String.self) { destination in
                Text("Viewing: \(destination)")
                    .navigationTitle(destination)
            }
        }
        .onOpenURL { url in
            handleDeepLink(url: url)
        }
    }
    
    func handleDeepLink(url: URL) {
        // Example: myapp://profile/123
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: true),
              let host = components.host else {
            return
        }
        
        // Navigate based on URL
        switch host {
        case "profile":
            path.append("Profile")
        case "settings":
            path.append("Settings")
        default:
            break
        }
    }
}
```

## Modal Presentation

Present views modally:

### Sheet

```swift
struct SheetExample: View {
    @State private var showingSheet = false
    
    var body: some View {
        NavigationStack {
            Button("Show Sheet") {
                showingSheet = true
            }
            .sheet(isPresented: $showingSheet) {
                SheetContentView()
            }
        }
    }
}

struct SheetContentView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationStack {
            VStack {
                Text("Sheet Content")
                
                Button("Dismiss") {
                    dismiss()
                }
            }
            .navigationTitle("Sheet")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}
```

### Full Screen Cover

```swift
struct FullScreenCoverExample: View {
    @State private var showingCover = false
    
    var body: some View {
        Button("Show Full Screen") {
            showingCover = true
        }
        .fullScreenCover(isPresented: $showingCover) {
            FullScreenContentView()
        }
    }
}

struct FullScreenContentView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ZStack {
            Color.blue.ignoresSafeArea()
            
            VStack {
                Text("Full Screen Cover")
                    .font(.largeTitle)
                    .foregroundColor(.white)
                
                Button("Close") {
                    dismiss()
                }
                .buttonStyle(.borderedProminent)
                .tint(.white)
            }
        }
    }
}
```

## Practical Example - E-Commerce App Navigation

```swift
// Product model
struct Product: Identifiable, Hashable {
    let id: Int
    let name: String
    let price: Double
    let category: String
}

// Navigation coordinator
class NavigationCoordinator: ObservableObject {
    @Published var path = NavigationPath()
    
    func navigateToProduct(_ product: Product) {
        path.append(product)
    }
    
    func navigateToCategory(_ category: String) {
        path.append(category)
    }
    
    func popToRoot() {
        path.removeLast(path.count)
    }
}

// Main app view
struct ShoppingApp: View {
    @StateObject private var coordinator = NavigationCoordinator()
    
    var body: some View {
        NavigationStack(path: $coordinator.path) {
            HomeView()
                .navigationDestination(for: Product.self) { product in
                    ProductDetailView(product: product)
                }
                .navigationDestination(for: String.self) { category in
                    CategoryView(category: category)
                }
        }
        .environmentObject(coordinator)
    }
}

// Home view
struct HomeView: View {
    @EnvironmentObject var coordinator: NavigationCoordinator
    
    let categories = ["Electronics", "Clothing", "Books"]
    let featuredProducts = [
        Product(id: 1, name: "iPhone 15", price: 999, category: "Electronics"),
        Product(id: 2, name: "MacBook Pro", price: 1999, category: "Electronics")
    ]
    
    var body: some View {
        List {
            Section("Categories") {
                ForEach(categories, id: \.self) { category in
                    Button(category) {
                        coordinator.navigateToCategory(category)
                    }
                }
            }
            
            Section("Featured Products") {
                ForEach(featuredProducts) { product in
                    Button {
                        coordinator.navigateToProduct(product)
                    } label: {
                        HStack {
                            VStack(alignment: .leading) {
                                Text(product.name)
                                    .font(.headline)
                                Text("$\(product.price, specifier: "%.2f")")
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            Spacer()
                            Image(systemName: "chevron.right")
                                .foregroundColor(.gray)
                        }
                    }
                }
            }
        }
        .navigationTitle("Shop")
    }
}

// Category view
struct CategoryView: View {
    let category: String
    @EnvironmentObject var coordinator: NavigationCoordinator
    
    var products: [Product] {
        // Mock products for category
        (1...10).map { i in
            Product(id: i * 100, name: "\(category) Item \(i)", price: Double(i * 50), category: category)
        }
    }
    
    var body: some View {
        List(products) { product in
            Button {
                coordinator.navigateToProduct(product)
            } label: {
                VStack(alignment: .leading) {
                    Text(product.name)
                    Text("$\(product.price, specifier: "%.2f")")
                        .foregroundColor(.gray)
                }
            }
        }
        .navigationTitle(category)
    }
}

// Product detail view
struct ProductDetailView: View {
    let product: Product
    @EnvironmentObject var coordinator: NavigationCoordinator
    
    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                Image(systemName: "photo")
                    .font(.system(size: 200))
                    .foregroundColor(.gray)
                
                VStack(alignment: .leading, spacing: 10) {
                    Text(product.name)
                        .font(.title)
                        .fontWeight(.bold)
                    
                    Text("$\(product.price, specifier: "%.2f")")
                        .font(.title2)
                        .foregroundColor(.green)
                    
                    Text("Category: \(product.category)")
                        .foregroundColor(.gray)
                    
                    Text("Product description goes here...")
                        .padding(.top)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding()
                
                Button("Add to Cart") {
                    print("Added \(product.name) to cart")
                }
                .buttonStyle(.borderedProminent)
                
                Button("Back to Home") {
                    coordinator.popToRoot()
                }
                .buttonStyle(.bordered)
            }
        }
        .navigationTitle(product.name)
    }
}
```

## Best Practices

### 1. Use NavigationStack (iOS 16+)

```swift
// ✅ Good - Modern approach
NavigationStack {
    // content
}

// ❌ Avoid - Deprecated
NavigationView {
    // content
}
```

### 2. Centralize Navigation Logic

Use a coordinator or view model:

```swift
// ✅ Good
class AppCoordinator: ObservableObject {
    @Published var path = NavigationPath()
    
    func navigateToDetails() {
        path.append("details")
    }
}

// ❌ Avoid - Navigation logic scattered
Button("Go") {
    path.append("somewhere")
}
```

### 3. Type-Safe Navigation

```swift
// ✅ Good - Type-safe with enums
enum Destination {
    case profile, settings, about
}

// ❌ Avoid - String-based
path.append("profile")  // Typo-prone
```

### 4. Handle Deep Links Properly

```swift
// ✅ Good - Centralized deep link handling
.onOpenURL { url in
    coordinator.handleDeepLink(url)
}
```

## Common Patterns

### Back to Root

```swift
Button("Go Home") {
    path.removeLast(path.count)
}
```

### Replace Current Screen

```swift
// Remove current and push new
path.removeLast()
path.append(newDestination)
```

### Check if at Root

```swift
if path.isEmpty {
    // At root
}
```

## Summary

- ✅ **NavigationStack** - Modern container for navigation (iOS 16+)
- ✅ **NavigationLink** - Declarative navigation between screens
- ✅ **NavigationPath** - Type-safe programmatic navigation
- ✅ **Toolbar** - Customize navigation bar with buttons and items
- ✅ **TabView** - Tab-based navigation patterns
- ✅ **Deep Linking** - Handle URLs with onOpenURL
- ✅ **Modal Presentation** - Sheets and full screen covers
- ✅ **Coordinator Pattern** - Centralize navigation logic

**Master navigation to create intuitive, professional iOS apps!** 🚀

---

*Next: Learn SwiftUI Animations to bring your navigation to life with smooth transitions.*
