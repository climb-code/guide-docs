---
title: "SwiftUI Lists & Grids - Display Collections Efficiently"
description: "Master SwiftUI lists, grids, scroll views, lazy stacks, search, swipe actions, and performance optimization for large datasets"
---

Lists and grids are essential for displaying collections of data efficiently. SwiftUI provides powerful, flexible components that handle scrolling, reordering, and lazy loading automatically.

## Lists in SwiftUI

The `List` view is perfect for displaying scrollable, vertical collections of data.

### Basic List

```swift
struct SimpleList: View {
    let items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]
    
    var body: some View {
        List(items, id: \.self) { item in
            Text(item)
        }
    }
}
```

### List with Custom Rows

```swift
struct Task: Identifiable {
    let id = UUID()
    let title: String
    let isCompleted: Bool
}

struct TaskListView: View {
    let tasks = [
        Task(title: "Learn SwiftUI", isCompleted: true),
        Task(title: "Build an app", isCompleted: false),
        Task(title: "Deploy to App Store", isCompleted: false)
    ]
    
    var body: some View {
        List(tasks) { task in
            HStack {
                Image(systemName: task.isCompleted ? "checkmark.circle.fill" : "circle")
                    .foregroundColor(task.isCompleted ? .green : .gray)
                
                Text(task.title)
                    .strikethrough(task.isCompleted)
                
                Spacer()
            }
        }
    }
}
```

### List Sections

```swift
struct SectionedListView: View {
    var body: some View {
        List {
            Section("Fruits") {
                Text("Apple")
                Text("Banana")
                Text("Orange")
            }
            
            Section("Vegetables") {
                Text("Carrot")
                Text("Broccoli")
                Text("Spinach")
            }
            
            Section {
                Text("Chicken")
                Text("Beef")
                Text("Fish")
            } header: {
                Text("Proteins")
            } footer: {
                Text("High protein foods")
            }
        }
    }
}
```

### List Styles

```swift
struct ListStylesExample: View {
    var body: some View {
        NavigationStack {
            List {
                Text("Item 1")
                Text("Item 2")
                Text("Item 3")
            }
            .listStyle(.insetGrouped)  // .plain, .grouped, .inset, .sidebar
            .navigationTitle("List Styles")
        }
    }
}
```

## Interactive Lists

### Swipe Actions

```swift
struct SwipeActionsExample: View {
    @State private var items = ["Email 1", "Email 2", "Email 3", "Email 4"]
    
    var body: some View {
        List {
            ForEach(items, id: \.self) { item in
                Text(item)
                    .swipeActions(edge: .trailing) {
                        Button(role: .destructive) {
                            if let index = items.firstIndex(of: item) {
                                items.remove(at: index)
                            }
                        } label: {
                            Label("Delete", systemImage: "trash")
                        }
                        
                        Button {
                            print("Archive \(item)")
                        } label: {
                            Label("Archive", systemImage: "archivebox")
                        }
                        .tint(.blue)
                    }
                    .swipeActions(edge: .leading) {
                        Button {
                            print("Mark as read")
                        } label: {
                            Label("Read", systemImage: "envelope.open")
                        }
                        .tint(.green)
                    }
            }
        }
    }
}
```

### Delete and Move

```swift
struct EditableListView: View {
    @State private var tasks = ["Task 1", "Task 2", "Task 3", "Task 4"]
    
    var body: some View {
        NavigationStack {
            List {
                ForEach(tasks, id: \.self) { task in
                    Text(task)
                }
                .onDelete(perform: deleteTask)
                .onMove(perform: moveTask)
            }
            .navigationTitle("Tasks")
            .toolbar {
                EditButton()
            }
        }
    }
    
    func deleteTask(at offsets: IndexSet) {
        tasks.remove(atOffsets: offsets)
    }
    
    func moveTask(from source: IndexSet, to destination: Int) {
        tasks.move(fromOffsets: source, toOffset: destination)
    }
}
```

### Pull to Refresh

```swift
struct RefreshableListView: View {
    @State private var items = ["Item 1", "Item 2", "Item 3"]
    
    var body: some View {
        List(items, id: \.self) { item in
            Text(item)
        }
        .refreshable {
            await loadData()
        }
    }
    
    func loadData() async {
        // Simulate network call
        try? await Task.sleep(nanoseconds: 2_000_000_000)
        items.append("Item \(items.count + 1)")
    }
}
```

## Search in Lists

Add search functionality:

```swift
struct SearchableListView: View {
    @State private var searchText = ""
    
    let allFruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry",
                     "Fig", "Grape", "Honeydew", "Indian Fig", "Jackfruit"]
    
    var filteredFruits: [String] {
        if searchText.isEmpty {
            return allFruits
        } else {
            return allFruits.filter { $0.localizedCaseInsensitiveContains(searchText) }
        }
    }
    
    var body: some View {
        NavigationStack {
            List(filteredFruits, id: \.self) { fruit in
                Text(fruit)
            }
            .searchable(text: $searchText, prompt: "Search fruits")
            .navigationTitle("Fruits")
        }
    }
}
```

## Lazy Stacks

For custom scrolling without List styling:

### LazyVStack

```swift
struct LazyVStackExample: View {
    var body: some View {
        ScrollView {
            LazyVStack(spacing: 20) {
                ForEach(1...100, id: \.self) { number in
                    CardView(number: number)
                }
            }
            .padding()
        }
    }
}

struct CardView: View {
    let number: Int
    
    var body: some View {
        RoundedRectangle(cornerRadius: 15)
            .fill(Color.blue.opacity(0.3))
            .frame(height: 100)
            .overlay(
                Text("Card \(number)")
                    .font(.title)
            )
    }
}
```

### LazyHStack

Horizontal lazy loading:

```swift
struct LazyHStackExample: View {
    var body: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            LazyHStack(spacing: 15) {
                ForEach(1...20, id: \.self) { number in
                    RoundedRectangle(cornerRadius: 15)
                        .fill(Color.purple.opacity(0.3))
                        .frame(width: 150, height: 200)
                        .overlay(Text("Item \(number)"))
                }
            }
            .padding()
        }
    }
}
```

## Grids

Display items in a grid layout:

### LazyVGrid - Vertical Grid

```swift
struct PhotoGridView: View {
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible())
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 15) {
                ForEach(1...50, id: \.self) { number in
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.blue.opacity(0.3))
                        .frame(height: 100)
                        .overlay(
                            Image(systemName: "photo")
                                .font(.largeTitle)
                        )
                }
            }
            .padding()
        }
    }
}
```

### Adaptive Grid

Automatically adjusts columns based on available space:

```swift
struct AdaptiveGridView: View {
    let adaptiveColumns = [
        GridItem(.adaptive(minimum: 100))
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: adaptiveColumns, spacing: 15) {
                ForEach(1...30, id: \.self) { number in
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.green.opacity(0.3))
                        .frame(height: 100)
                        .overlay(Text("\(number)"))
                }
            }
            .padding()
        }
    }
}
```

### Fixed and Flexible Columns

Mix different column types:

```swift
struct MixedGridView: View {
    let columns = [
        GridItem(.fixed(100)),      // Fixed width
        GridItem(.flexible()),       // Takes remaining space
        GridItem(.flexible())        // Shares remaining space
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 15) {
                ForEach(1...20, id: \.self) { number in
                    Color.random
                        .frame(height: 80)
                        .cornerRadius(10)
                        .overlay(Text("\(number)"))
                }
            }
            .padding()
        }
    }
}

extension Color {
    static var random: Color {
        Color(
            red: .random(in: 0...1),
            green: .random(in: 0...1),
            blue: .random(in: 0...1)
        )
    }
}
```

### LazyHGrid - Horizontal Grid

```swift
struct HorizontalGridView: View {
    let rows = [
        GridItem(.fixed(100)),
        GridItem(.fixed(100)),
        GridItem(.fixed(100))
    ]
    
    var body: some View {
        ScrollView(.horizontal) {
            LazyHGrid(rows: rows, spacing: 15) {
                ForEach(1...30, id: \.self) { number in
                    RoundedRectangle(cornerRadius: 10)
                        .fill(Color.orange.opacity(0.3))
                        .frame(width: 100)
                        .overlay(Text("\(number)"))
                }
            }
            .padding()
        }
    }
}
```

## Complex Grid Layouts

### Pinterest-Style Grid

```swift
struct PinterestGridView: View {
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 15) {
                ForEach(1...20, id: \.self) { number in
                    ImageCard(number: number)
                }
            }
            .padding()
        }
    }
}

struct ImageCard: View {
    let number: Int
    
    var randomHeight: CGFloat {
        CGFloat.random(in: 150...300)
    }
    
    var body: some View {
        VStack(alignment: .leading) {
            RoundedRectangle(cornerRadius: 15)
                .fill(Color.blue.opacity(0.3))
                .frame(height: randomHeight)
                .overlay(
                    Image(systemName: "photo")
                        .font(.largeTitle)
                )
            
            Text("Photo \(number)")
                .font(.caption)
                .foregroundColor(.gray)
        }
    }
}
```

## Practical Example - Photo Gallery App

```swift
struct Photo: Identifiable {
    let id = UUID()
    let title: String
    let category: String
}

struct PhotoGalleryApp: View {
    @State private var searchText = ""
    @State private var selectedCategory = "All"
    
    let categories = ["All", "Nature", "Architecture", "People", "Animals"]
    
    let photos = [
        Photo(title: "Sunset", category: "Nature"),
        Photo(title: "Building", category: "Architecture"),
        Photo(title: "Portrait", category: "People"),
        Photo(title: "Dog", category: "Animals"),
        Photo(title: "Mountain", category: "Nature"),
        Photo(title: "Tower", category: "Architecture"),
        // Add more photos...
    ]
    
    var filteredPhotos: [Photo] {
        photos.filter { photo in
            let matchesCategory = selectedCategory == "All" || photo.category == selectedCategory
            let matchesSearch = searchText.isEmpty || photo.title.localizedCaseInsensitiveContains(searchText)
            return matchesCategory && matchesSearch
        }
    }
    
    let columns = [
        GridItem(.adaptive(minimum: 150), spacing: 15)
    ]
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Category filter
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(categories, id: \.self) { category in
                            CategoryButton(
                                title: category,
                                isSelected: selectedCategory == category
                            ) {
                                selectedCategory = category
                            }
                        }
                    }
                    .padding()
                }
                
                // Photo grid
                ScrollView {
                    LazyVGrid(columns: columns, spacing: 15) {
                        ForEach(filteredPhotos) { photo in
                            PhotoGridItem(photo: photo)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Gallery")
            .searchable(text: $searchText, prompt: "Search photos")
        }
    }
}

struct CategoryButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(isSelected ? Color.blue : Color.gray.opacity(0.2))
                .foregroundColor(isSelected ? .white : .primary)
                .cornerRadius(20)
        }
    }
}

struct PhotoGridItem: View {
    let photo: Photo
    
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            RoundedRectangle(cornerRadius: 15)
                .fill(Color.blue.opacity(0.2))
                .aspectRatio(1, contentMode: .fit)
                .overlay(
                    Image(systemName: "photo")
                        .font(.largeTitle)
                        .foregroundColor(.gray)
                )
            
            VStack(alignment: .leading, spacing: 4) {
                Text(photo.title)
                    .font(.headline)
                Text(photo.category)
                    .font(.caption)
                    .foregroundColor(.gray)
            }
        }
    }
}
```

## Performance Optimization

### Use Lazy Loading

```swift
// ✅ Good - Lazy loading
ScrollView {
    LazyVStack {
        ForEach(1...1000, id: \.self) { number in
            HeavyView(number: number)
        }
    }
}

// ❌ Avoid - Loads all at once
ScrollView {
    VStack {
        ForEach(1...1000, id: \.self) { number in
            HeavyView(number: number)  // All 1000 created immediately!
        }
    }
}
```

### Identifiable for Performance

```swift
// ✅ Good - Identifiable
struct Item: Identifiable {
    let id = UUID()
    let name: String
}

List(items) { item in
    Text(item.name)
}

// ⚠️ Less efficient
List(items, id: \.name) { item in
    Text(item.name)
}
```

### Avoid Heavy Computations in Body

```swift
// ✅ Good - Computed once
struct OptimizedView: View {
    let data: [Item]
    
    var sortedData: [Item] {
        data.sorted { $0.name < $1.name }
    }
    
    var body: some View {
        List(sortedData) { item in
            Text(item.name)
        }
    }
}

// ❌ Avoid - Computed on every render
struct SlowView: View {
    let data: [Item]
    
    var body: some View {
        List(data.sorted { $0.name < $1.name }) { item in
            Text(item.name)
        }
    }
}
```

## Best Practices

### 1. Choose the Right Component

```swift
// List - For simple, styled lists
List(items) { item in Text(item.name) }

// LazyVStack - For custom scrolling
ScrollView {
    LazyVStack { ForEach(items) { ... } }
}

// LazyVGrid - For grid layouts
ScrollView {
    LazyVGrid(columns: columns) { ... }
}
```

### 2. Use Lazy Loading

```swift
// ✅ Always use Lazy variants for large datasets
LazyVStack { }
LazyHStack { }
LazyVGrid(columns:) { }
LazyHGrid(rows:) { }
```

### 3. Identifiable Protocol

```swift
// ✅ Good - Conforms to Identifiable
struct Item: Identifiable {
    let id = UUID()
    let name: String
}
```

### 4. Efficient Updates

```swift
// ✅ Good - SwiftUI knows what changed
@State private var items: [Item] = []

// Changes to specific items update efficiently
items[0].isCompleted = true
```

## Summary

- ✅ **List** - Styled, scrollable collections with built-in features
- ✅ **LazyVStack/HStack** - Custom scrolling with lazy loading
- ✅ **LazyVGrid/HGrid** - Efficient grid layouts
- ✅ **Swipe Actions** - Delete, archive, mark as read
- ✅ **Search** - Filter content with `.searchable()`
- ✅ **Pull to Refresh** - Update data with `.refreshable()`
- ✅ **Performance** - Use lazy loading for large datasets
- ✅ **Adaptive Grids** - Automatically adjust to available space

**Master lists and grids to display any amount of data efficiently!** 📱

---

*Next: Learn SwiftUI Data Flow for advanced state management across your app.*
