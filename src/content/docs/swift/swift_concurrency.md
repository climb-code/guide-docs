---
title: "Swift Concurrency - Managing Concurrent Code"
description: "Master Swift concurrency including GCD, DispatchQueues, async/await, Tasks, and Actors for writing efficient concurrent code"
---

Welcome to Swift Concurrency! Concurrency allows your app to perform multiple tasks simultaneously, making it more responsive and efficient. Swift provides powerful tools for managing concurrent code, from Grand Central Dispatch to modern async/await. In this guide, we'll explore how to write safe, efficient concurrent code.

## What is Concurrency?

**Concurrency** is the ability to run multiple pieces of code at the same time. It's essential for:
- Keeping UI responsive during long operations
- Processing data in the background
- Making multiple network requests simultaneously
- Performing intensive calculations without blocking

**Key Concepts:**
- ✅ **Threads** - Independent execution paths
- ✅ **Queues** - Manage task execution
- ✅ **Async** - Non-blocking operations
- ✅ **Sync** - Blocking operations
- ✅ **Main Thread** - UI updates only

**Why Learn Concurrency?**
- 🎯 **Responsive Apps** - UI never freezes
- 🎯 **Better Performance** - Utilize multiple CPU cores
- 🎯 **Improved UX** - Smooth user experience
- 🎯 **Efficient Processing** - Parallel data processing

## Grand Central Dispatch (GCD)

GCD is Apple's low-level API for managing concurrent operations using dispatch queues.

### Main Queue

The main queue runs on the main thread - use it for UI updates:

```swift
import Foundation

// ✅ Update UI on main queue
DispatchQueue.main.async {
    print("This runs on the main thread")
    // Update UI here
}

// Example: Updating after background work
func loadData() {
    // Background work
    DispatchQueue.global().async {
        let data = performExpensiveOperation()
        
        // Switch to main queue for UI update
        DispatchQueue.main.async {
            updateUI(with: data)
        }
    }
}

func performExpensiveOperation() -> String {
    Thread.sleep(forTimeInterval: 2)
    return "Data loaded"
}

func updateUI(with data: String) {
    print("UI updated with: \(data)")
}

loadData()
```

### Global Queues

Global queues are concurrent queues with different quality of service (QoS) levels:

```swift
// Different QoS levels (highest to lowest priority)

// User Interactive - UI updates, animations
DispatchQueue.global(qos: .userInteractive).async {
    print("High priority - user is waiting")
}

// User Initiated - user requested, needs quick response
DispatchQueue.global(qos: .userInitiated).async {
    print("High priority - user initiated")
}

// Default - default priority
DispatchQueue.global(qos: .default).async {
    print("Normal priority")
}

// Utility - long-running tasks, progress indicators
DispatchQueue.global(qos: .utility).async {
    print("Low priority - utility task")
}

// Background - user not aware, cleanup, syncing
DispatchQueue.global(qos: .background).async {
    print("Lowest priority - background task")
}
```

### Custom Queues

Create your own serial or concurrent queues:

```swift
// Serial queue - executes one task at a time
let serialQueue = DispatchQueue(label: "com.app.serialQueue")

serialQueue.async {
    print("Task 1 started")
    Thread.sleep(forTimeInterval: 1)
    print("Task 1 finished")
}

serialQueue.async {
    print("Task 2 started")  // Waits for Task 1
    Thread.sleep(forTimeInterval: 1)
    print("Task 2 finished")
}

// Concurrent queue - executes multiple tasks simultaneously
let concurrentQueue = DispatchQueue(label: "com.app.concurrentQueue", attributes: .concurrent)

concurrentQueue.async {
    print("Concurrent Task 1")
}

concurrentQueue.async {
    print("Concurrent Task 2")  // Can run at same time as Task 1
}
```

### Sync vs Async

```swift
let queue = DispatchQueue(label: "com.app.queue")

// Async - doesn't wait, returns immediately
queue.async {
    print("Async task executing")
    Thread.sleep(forTimeInterval: 1)
}
print("After async")  // Prints immediately

// Sync - waits until task completes
queue.sync {
    print("Sync task executing")
    Thread.sleep(forTimeInterval: 1)
}
print("After sync")  // Waits for task to finish
```

### DispatchGroup

Wait for multiple async tasks to complete:

```swift
let group = DispatchGroup()

// Task 1
group.enter()
DispatchQueue.global().async {
    print("Task 1 started")
    Thread.sleep(forTimeInterval: 2)
    print("Task 1 completed")
    group.leave()
}

// Task 2
group.enter()
DispatchQueue.global().async {
    print("Task 2 started")
    Thread.sleep(forTimeInterval: 1)
    print("Task 2 completed")
    group.leave()
}

// Wait for all tasks
group.notify(queue: .main) {
    print("All tasks completed!")
}
```

## Modern Swift Concurrency (async/await)

Swift 5.5+ introduced modern concurrency with async/await, making asynchronous code cleaner and safer.

### Async Functions

```swift
// Define async function
func fetchUserData(id: String) async -> String {
    // Simulate network delay
    try? await Task.sleep(nanoseconds: 1_000_000_000)  // 1 second
    return "User data for \(id)"
}

func fetchUserProfile(id: String) async -> String {
    try? await Task.sleep(nanoseconds: 500_000_000)  // 0.5 seconds
    return "Profile for \(id)"
}

// Call async function
Task {
    let data = await fetchUserData(id: "123")
    print(data)
    
    let profile = await fetchUserProfile(id: "123")
    print(profile)
}
```

### Sequential vs Concurrent Execution

```swift
// Sequential - one after another
func loadDataSequentially() async {
    print("Sequential start")
    let start = Date()
    
    let user = await fetchUserData(id: "1")
    let profile = await fetchUserProfile(id: "1")
    
    let duration = Date().timeIntervalSince(start)
    print("Sequential took: \(duration) seconds")
    // ~1.5 seconds total
}

// Concurrent - at the same time
func loadDataConcurrently() async {
    print("Concurrent start")
    let start = Date()
    
    async let user = fetchUserData(id: "1")
    async let profile = fetchUserProfile(id: "1")
    
    let (userData, profileData) = await (user, profile)
    
    let duration = Date().timeIntervalSince(start)
    print("Concurrent took: \(duration) seconds")
    // ~1 second total (runs in parallel)
}

Task {
    await loadDataSequentially()
    await loadDataConcurrently()
}
```

### Task Groups

Execute multiple concurrent tasks:

```swift
func fetchMultipleUsers(ids: [String]) async -> [String] {
    await withTaskGroup(of: String.self) { group in
        var results: [String] = []
        
        for id in ids {
            group.addTask {
                await fetchUserData(id: id)
            }
        }
        
        for await result in group {
            results.append(result)
        }
        
        return results
    }
}

Task {
    let users = await fetchMultipleUsers(ids: ["1", "2", "3"])
    print("Fetched \(users.count) users")
}
```

### Throwing Async Functions

```swift
enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingError
}

func fetchData(from url: String) async throws -> String {
    guard !url.isEmpty else {
        throw NetworkError.invalidURL
    }
    
    try await Task.sleep(nanoseconds: 1_000_000_000)
    
    // Simulate potential error
    if url.contains("error") {
        throw NetworkError.noData
    }
    
    return "Data from \(url)"
}

Task {
    do {
        let data = try await fetchData(from: "https://api.example.com")
        print("Success: \(data)")
    } catch NetworkError.invalidURL {
        print("Invalid URL")
    } catch NetworkError.noData {
        print("No data received")
    } catch {
        print("Unknown error: \(error)")
    }
}
```

## Actors

Actors protect their state from data races by ensuring only one task can access mutable state at a time.

### Basic Actor

```swift
actor BankAccount {
    private var balance: Double = 0
    
    func deposit(_ amount: Double) {
        balance += amount
        print("Deposited \(amount), balance: \(balance)")
    }
    
    func withdraw(_ amount: Double) -> Bool {
        guard amount <= balance else {
            print("Insufficient funds")
            return false
        }
        balance -= amount
        print("Withdrew \(amount), balance: \(balance)")
        return true
    }
    
    func getBalance() -> Double {
        return balance
    }
}

Task {
    let account = BankAccount()
    
    // All actor methods are async
    await account.deposit(100)
    await account.deposit(50)
    
    let success = await account.withdraw(75)
    print("Withdrawal success: \(success)")
    
    let balance = await account.getBalance()
    print("Final balance: \(balance)")
}
```

### MainActor

`@MainActor` ensures code runs on the main thread:

```swift
@MainActor
class ViewController {
    var label: String = "Loading..."
    
    func updateLabel(_ text: String) {
        label = text  // Guaranteed to run on main thread
        print("Label updated to: \(label)")
    }
}

Task {
    let vc = await ViewController()
    await vc.updateLabel("Ready")
}

// Mark individual methods/properties
class DataManager {
    @MainActor
    var statusText: String = ""
    
    @MainActor
    func updateStatus(_ text: String) {
        statusText = text
    }
}
```

## Practical Examples

### Example 1: Image Downloader

```swift
actor ImageCache {
    private var cache: [String: Data] = [:]
    
    func image(for url: String) -> Data? {
        return cache[url]
    }
    
    func store(image: Data, for url: String) {
        cache[url] = image
    }
}

class ImageDownloader {
    private let cache = ImageCache()
    
    func downloadImage(from url: String) async throws -> Data {
        // Check cache first
        if let cached = await cache.image(for: url) {
            print("✅ Cache hit for \(url)")
            return cached
        }
        
        print("⬇️ Downloading \(url)")
        try await Task.sleep(nanoseconds: 1_000_000_000)
        
        let data = Data()  // Simulated image data
        await cache.store(image: data, for: url)
        
        return data
    }
}

Task {
    let downloader = ImageDownloader()
    
    do {
        let image1 = try await downloader.downloadImage(from: "image1.jpg")
        let image2 = try await downloader.downloadImage(from: "image2.jpg")
        let image1Cached = try await downloader.downloadImage(from: "image1.jpg")
        
        print("Downloaded successfully")
    } catch {
        print("Download failed: \(error)")
    }
}
```

### Example 2: Parallel Data Processing

```swift
func processItems(_ items: [Int]) async -> [Int] {
    await withTaskGroup(of: Int.self) { group in
        for item in items {
            group.addTask {
                // Simulate heavy processing
                try? await Task.sleep(nanoseconds: 100_000_000)
                return item * 2
            }
        }
        
        var results: [Int] = []
        for await result in group {
            results.append(result)
        }
        return results
    }
}

Task {
    let items = [1, 2, 3, 4, 5]
    let processed = await processItems(items)
    print("Processed: \(processed)")
}
```

### Example 3: Network Request Manager

```swift
actor NetworkManager {
    private var activeTasks: [String: Task<Data, Error>] = [:]
    
    func fetchData(from url: String) async throws -> Data {
        // Prevent duplicate requests
        if let existingTask = activeTasks[url] {
            return try await existingTask.value
        }
        
        let task = Task<Data, Error> {
            try await performRequest(url: url)
        }
        
        activeTasks[url] = task
        
        defer {
            activeTasks[url] = nil
        }
        
        return try await task.value
    }
    
    private func performRequest(url: String) async throws -> Data {
        print("Making request to: \(url)")
        try await Task.sleep(nanoseconds: 1_000_000_000)
        return Data()  // Simulated response
    }
}

Task {
    let manager = NetworkManager()
    
    async let request1 = try manager.fetchData(from: "api/users")
    async let request2 = try manager.fetchData(from: "api/posts")
    async let request3 = try manager.fetchData(from: "api/users")  // Reuses request1
    
    do {
        let (users, posts, _) = try await (request1, request2, request3)
        print("All requests completed")
    } catch {
        print("Error: \(error)")
    }
}
```

### Example 4: Progress Tracking

```swift
actor ProgressTracker {
    private var completed = 0
    private var total: Int
    
    init(total: Int) {
        self.total = total
    }
    
    func increment() {
        completed += 1
        let percentage = Double(completed) / Double(total) * 100
        print("Progress: \(completed)/\(total) (\(Int(percentage))%)")
    }
    
    func isComplete() -> Bool {
        return completed >= total
    }
}

func processFilesWithProgress(files: [String]) async {
    let tracker = ProgressTracker(total: files.count)
    
    await withTaskGroup(of: Void.self) { group in
        for file in files {
            group.addTask {
                // Process file
                try? await Task.sleep(nanoseconds: 500_000_000)
                print("Processed: \(file)")
                await tracker.increment()
            }
        }
    }
    
    print("✅ All files processed")
}

Task {
    await processFilesWithProgress(files: ["file1.txt", "file2.txt", "file3.txt"])
}
```

### Example 5: Debounced Search

```swift
actor SearchDebouncer {
    private var searchTask: Task<Void, Never>?
    
    func search(query: String, delay: UInt64 = 500_000_000) async {
        // Cancel previous search
        searchTask?.cancel()
        
        searchTask = Task {
            try? await Task.sleep(nanoseconds: delay)
            
            guard !Task.isCancelled else {
                print("Search cancelled")
                return
            }
            
            await performSearch(query: query)
        }
        
        await searchTask?.value
    }
    
    private func performSearch(query: String) async {
        print("🔍 Searching for: \(query)")
        try? await Task.sleep(nanoseconds: 1_000_000_000)
        print("✅ Results for: \(query)")
    }
}

Task {
    let debouncer = SearchDebouncer()
    
    await debouncer.search(query: "Sw")
    await debouncer.search(query: "Swi")
    await debouncer.search(query: "Swif")
    await debouncer.search(query: "Swift")
    // Only "Swift" will be searched (others cancelled)
}
```

## Best Practices

### 1. Use MainActor for UI Updates

```swift
// ✅ Good
@MainActor
func updateUI() {
    // UI updates here
}

// ❌ Bad - might not be on main thread
func updateUI() {
    // UI updates - unsafe!
}
```

### 2. Prefer async/await over Callbacks

```swift
// ✅ Good - clean and readable
func fetchData() async throws -> Data {
    let data = try await performRequest()
    return data
}

// ❌ Avoid - callback hell
func fetchData(completion: @escaping (Result<Data, Error>) -> Void) {
    performRequest { result in
        completion(result)
    }
}
```

### 3. Use Actors for Shared Mutable State

```swift
// ✅ Good - thread-safe
actor Counter {
    private var count = 0
    func increment() { count += 1 }
}

// ❌ Bad - race conditions
class Counter {
    var count = 0
    func increment() { count += 1 }
}
```

### 4. Cancel Tasks When Needed

```swift
let task = Task {
    for i in 1...10 {
        try? await Task.sleep(nanoseconds: 1_000_000_000)
        guard !Task.isCancelled else {
            print("Task cancelled")
            return
        }
        print("Step \(i)")
    }
}

// Cancel if needed
task.cancel()
```

## Summary

Concurrency makes apps responsive and efficient:

**GCD Basics** 🔄
- Main queue for UI
- Global queues for background work
- Custom serial/concurrent queues
- DispatchGroups for coordination

**async/await** ⚡
- Clean, readable async code
- Sequential and concurrent execution
- Task groups for parallel work
- Error handling with throws

**Actors** 🛡️
- Thread-safe shared state
- Automatic synchronization
- MainActor for UI code
- Prevents data races

**Best Practices** ⭐
- UI on main thread always
- Use async/await over callbacks
- Actors for mutable state
- Cancel tasks when done

## Practice Exercises

1. Build an image downloader with caching
2. Create a parallel file processor
3. Implement a debounced search
4. Build a progress tracker for multiple tasks
5. Create a thread-safe counter with actor
6. Implement a network request manager

---

**Master concurrency to build fast, responsive apps!** 🚀

*Remember: Keep UI on the main thread, everything else can be async!*
