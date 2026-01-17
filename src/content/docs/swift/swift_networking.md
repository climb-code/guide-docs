---
title: "Networking in Swift"
description: "Master networking in Swift using URLSession to make API requests, handle responses, and manage errors"
---

Networking is essential for modern iOS applications. Whether you're fetching data from a REST API, uploading images, or downloading files, Swift's `URLSession` provides a powerful and flexible way to handle network operations. In this guide, you'll learn how to make network requests, handle responses, and work with real-world APIs.

## What is URLSession?

`URLSession` is Apple's API for making network requests. It handles:
- **HTTP/HTTPS requests** - GET, POST, PUT, DELETE, etc.
- **Data transfer** - Download and upload tasks
- **Background transfers** - Continue downloads even when app is in background
- **Authentication** - Handle credentials and certificates
- **Caching** - Automatic response caching

## Making Your First Network Request

### Simple GET Request

Let's start with a basic GET request to fetch data:

```swift
import Foundation

// URL to fetch data from
let url = URL(string: "https://jsonplaceholder.typicode.com/users/1")!

// Create a data task
let task = URLSession.shared.dataTask(with: url) { data, response, error in
    // Check for errors
    if let error = error {
        print("Error: \(error.localizedDescription)")
        return
    }
    
    // Check if we got data
    guard let data = data else {
        print("No data received")
        return
    }
    
    // Print the raw JSON response
    if let jsonString = String(data: data, encoding: .utf8) {
        print("Response: \(jsonString)")
    }
}

// Start the task
task.resume()
```

**Important:** Always call `.resume()` to start the task. Network requests don't execute automatically!

## Decoding JSON Responses

Combine URLSession with Codable to parse API responses:

```swift
import Foundation

// Define the model matching the API response
struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let username: String
}

func fetchUser(userId: Int) {
    let url = URL(string: "https://jsonplaceholder.typicode.com/users/\(userId)")!
    
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        // Handle error
        if let error = error {
            print("Network error: \(error.localizedDescription)")
            return
        }
        
        // Check for valid data
        guard let data = data else {
            print("No data received")
            return
        }
        
        // Decode JSON to User object
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            print("User: \(user.name)")
            print("Email: \(user.email)")
        } catch {
            print("Decoding error: \(error)")
        }
    }
    
    task.resume()
}

// Call the function
fetchUser(userId: 1)
```

## Handling Arrays of Data

Fetching a list of objects from an API:

```swift
struct Post: Codable {
    let id: Int
    let userId: Int
    let title: String
    let body: String
}

func fetchPosts() {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
    
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        guard let data = data, error == nil else {
            print("Error: \(error?.localizedDescription ?? "Unknown error")")
            return
        }
        
        do {
            let posts = try JSONDecoder().decode([Post].self, from: data)
            print("Fetched \(posts.count) posts")
            
            // Print first 3 posts
            for post in posts.prefix(3) {
                print("\nTitle: \(post.title)")
                print("Body: \(post.body)")
            }
        } catch {
            print("Decoding error: \(error)")
        }
    }
    
    task.resume()
}

fetchPosts()
```

## Making POST Requests

Send data to a server using POST:

```swift
struct CreatePostRequest: Codable {
    let title: String
    let body: String
    let userId: Int
}

struct CreatePostResponse: Codable {
    let id: Int
    let title: String
    let body: String
    let userId: Int
}

func createPost() {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts")!
    
    // Create the request body
    let newPost = CreatePostRequest(
        title: "My First Post",
        body: "This is the content of my post",
        userId: 1
    )
    
    // Encode to JSON
    guard let jsonData = try? JSONEncoder().encode(newPost) else {
        print("Failed to encode post")
        return
    }
    
    // Create the request
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = jsonData
    
    // Make the request
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        guard let data = data, error == nil else {
            print("Error: \(error?.localizedDescription ?? "Unknown error")")
            return
        }
        
        do {
            let createdPost = try JSONDecoder().decode(CreatePostResponse.self, from: data)
            print("Created post with ID: \(createdPost.id)")
            print("Title: \(createdPost.title)")
        } catch {
            print("Decoding error: \(error)")
        }
    }
    
    task.resume()
}

createPost()
```

## PUT and DELETE Requests

### PUT Request (Update)

```swift
func updatePost(postId: Int) {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts/\(postId)")!
    
    let updatedPost = CreatePostRequest(
        title: "Updated Title",
        body: "Updated content",
        userId: 1
    )
    
    guard let jsonData = try? JSONEncoder().encode(updatedPost) else { return }
    
    var request = URLRequest(url: url)
    request.httpMethod = "PUT"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = jsonData
    
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        guard let data = data, error == nil else {
            print("Error: \(error?.localizedDescription ?? "Unknown error")")
            return
        }
        
        do {
            let updatedPost = try JSONDecoder().decode(CreatePostResponse.self, from: data)
            print("Updated post: \(updatedPost.title)")
        } catch {
            print("Error: \(error)")
        }
    }
    
    task.resume()
}

updatePost(postId: 1)
```

### DELETE Request

```swift
func deletePost(postId: Int) {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts/\(postId)")!
    
    var request = URLRequest(url: url)
    request.httpMethod = "DELETE"
    
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        if let error = error {
            print("Error: \(error.localizedDescription)")
            return
        }
        
        if let httpResponse = response as? HTTPURLResponse {
            if httpResponse.statusCode == 200 {
                print("Post deleted successfully")
            } else {
                print("Delete failed with status: \(httpResponse.statusCode)")
            }
        }
    }
    
    task.resume()
}

deletePost(postId: 1)
```

## Checking HTTP Status Codes

Always verify the HTTP status code:

```swift
func fetchWithStatusCheck() {
    let url = URL(string: "https://jsonplaceholder.typicode.com/users/1")!
    
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        // Check for network errors
        if let error = error {
            print("Network error: \(error.localizedDescription)")
            return
        }
        
        // Check HTTP response status
        guard let httpResponse = response as? HTTPURLResponse else {
            print("Invalid response")
            return
        }
        
        print("Status code: \(httpResponse.statusCode)")
        
        switch httpResponse.statusCode {
        case 200...299:
            print("✅ Success")
            if let data = data {
                // Process data
                print("Received \(data.count) bytes")
            }
        case 400...499:
            print("❌ Client error")
        case 500...599:
            print("❌ Server error")
        default:
            print("⚠️ Unexpected status code")
        }
    }
    
    task.resume()
}

fetchWithStatusCheck()
```

## Handling Headers

### Reading Response Headers

```swift
func fetchWithHeaders() {
    let url = URL(string: "https://jsonplaceholder.typicode.com/posts/1")!
    
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        guard let httpResponse = response as? HTTPURLResponse else { return }
        
        // Access all headers
        print("All headers: \(httpResponse.allHeaderFields)")
        
        // Access specific headers
        if let contentType = httpResponse.value(forHTTPHeaderField: "Content-Type") {
            print("Content-Type: \(contentType)")
        }
        
        if let contentLength = httpResponse.value(forHTTPHeaderField: "Content-Length") {
            print("Content-Length: \(contentLength)")
        }
    }
    
    task.resume()
}
```

### Sending Custom Headers

```swift
func fetchWithCustomHeaders() {
    let url = URL(string: "https://api.example.com/data")!
    
    var request = URLRequest(url: url)
    request.setValue("Bearer your-token-here", forHTTPHeaderField: "Authorization")
    request.setValue("application/json", forHTTPHeaderField: "Accept")
    request.setValue("iOS/1.0", forHTTPHeaderField: "User-Agent")
    
    let task = URLSession.shared.dataTask(with: request) { data, response, error in
        // Handle response
    }
    
    task.resume()
}
```

## Error Handling Patterns

### Comprehensive Error Handling

```swift
enum NetworkError: Error {
    case invalidURL
    case noData
    case decodingError
    case serverError(statusCode: Int)
    case networkError(Error)
}

func fetchUser(userId: Int, completion: @escaping (Result<User, NetworkError>) -> Void) {
    guard let url = URL(string: "https://jsonplaceholder.typicode.com/users/\(userId)") else {
        completion(.failure(.invalidURL))
        return
    }
    
    let task = URLSession.shared.dataTask(with: url) { data, response, error in
        // Check for network errors
        if let error = error {
            completion(.failure(.networkError(error)))
            return
        }
        
        // Check HTTP status
        if let httpResponse = response as? HTTPURLResponse {
            guard (200...299).contains(httpResponse.statusCode) else {
                completion(.failure(.serverError(statusCode: httpResponse.statusCode)))
                return
            }
        }
        
        // Check for data
        guard let data = data else {
            completion(.failure(.noData))
            return
        }
        
        // Decode data
        do {
            let user = try JSONDecoder().decode(User.self, from: data)
            completion(.success(user))
        } catch {
            completion(.failure(.decodingError))
        }
    }
    
    task.resume()
}

// Usage
fetchUser(userId: 1) { result in
    switch result {
    case .success(let user):
        print("✅ User: \(user.name)")
    case .failure(let error):
        switch error {
        case .invalidURL:
            print("❌ Invalid URL")
        case .noData:
            print("❌ No data received")
        case .decodingError:
            print("❌ Failed to decode response")
        case .serverError(let code):
            print("❌ Server error: \(code)")
        case .networkError(let err):
            print("❌ Network error: \(err.localizedDescription)")
        }
    }
}
```

## Using Async/Await (Modern Approach)

Swift's modern async/await syntax makes networking cleaner:

```swift
struct User: Codable {
    let id: Int
    let name: String
    let email: String
}

enum NetworkError: Error {
    case invalidURL
    case invalidResponse
    case decodingError
}

func fetchUser(userId: Int) async throws -> User {
    guard let url = URL(string: "https://jsonplaceholder.typicode.com/users/\(userId)") else {
        throw NetworkError.invalidURL
    }
    
    // Async network request
    let (data, response) = try await URLSession.shared.data(from: url)
    
    // Check response
    guard let httpResponse = response as? HTTPURLResponse,
          (200...299).contains(httpResponse.statusCode) else {
        throw NetworkError.invalidResponse
    }
    
    // Decode
    do {
        let user = try JSONDecoder().decode(User.self, from: data)
        return user
    } catch {
        throw NetworkError.decodingError
    }
}

// Usage with async/await
Task {
    do {
        let user = try await fetchUser(userId: 1)
        print("User: \(user.name)")
        print("Email: \(user.email)")
    } catch {
        print("Error: \(error)")
    }
}
```

## Creating a Reusable Network Service

Build a clean network layer for your app:

```swift
class NetworkService {
    static let shared = NetworkService()
    private init() {}
    
    private let baseURL = "https://jsonplaceholder.typicode.com"
    
    func fetch<T: Codable>(endpoint: String) async throws -> T {
        guard let url = URL(string: baseURL + endpoint) else {
            throw NetworkError.invalidURL
        }
        
        let (data, response) = try await URLSession.shared.data(from: url)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        do {
            let decoder = JSONDecoder()
            decoder.keyDecodingStrategy = .convertFromSnakeCase
            return try decoder.decode(T.self, from: data)
        } catch {
            throw NetworkError.decodingError
        }
    }
    
    func post<T: Codable, R: Codable>(endpoint: String, body: T) async throws -> R {
        guard let url = URL(string: baseURL + endpoint) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONEncoder().encode(body)
        
        let (data, response) = try await URLSession.shared.data(for: request)
        
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.invalidResponse
        }
        
        return try JSONDecoder().decode(R.self, from: data)
    }
}

// Usage
Task {
    do {
        // GET request
        let user: User = try await NetworkService.shared.fetch(endpoint: "/users/1")
        print("User: \(user.name)")
        
        // POST request
        let newPost = CreatePostRequest(title: "Test", body: "Content", userId: 1)
        let created: CreatePostResponse = try await NetworkService.shared.post(
            endpoint: "/posts",
            body: newPost
        )
        print("Created post ID: \(created.id)")
    } catch {
        print("Error: \(error)")
    }
}
```

## Handling Query Parameters

Build URLs with query parameters:

```swift
func fetchPostsByUser(userId: Int) async throws -> [Post] {
    var components = URLComponents(string: "https://jsonplaceholder.typicode.com/posts")!
    components.queryItems = [
        URLQueryItem(name: "userId", value: "\(userId)")
    ]
    
    guard let url = components.url else {
        throw NetworkError.invalidURL
    }
    
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([Post].self, from: data)
}

// Usage
Task {
    do {
        let posts = try await fetchPostsByUser(userId: 1)
        print("Found \(posts.count) posts for user 1")
    } catch {
        print("Error: \(error)")
    }
}
```

## Downloading Images

Fetch and display images from URLs:

```swift
import UIKit

func downloadImage(from urlString: String) async throws -> UIImage {
    guard let url = URL(string: urlString) else {
        throw NetworkError.invalidURL
    }
    
    let (data, response) = try await URLSession.shared.data(from: url)
    
    guard let httpResponse = response as? HTTPURLResponse,
          (200...299).contains(httpResponse.statusCode) else {
        throw NetworkError.invalidResponse
    }
    
    guard let image = UIImage(data: data) else {
        throw NetworkError.decodingError
    }
    
    return image
}

// Usage in a view controller
Task {
    do {
        let image = try await downloadImage(from: "https://example.com/image.jpg")
        // Update UI on main thread
        await MainActor.run {
            imageView.image = image
        }
    } catch {
        print("Failed to download image: \(error)")
    }
}
```

## Upload Files

Upload files to a server:

```swift
func uploadImage(_ image: UIImage) async throws {
    guard let url = URL(string: "https://api.example.com/upload") else {
        throw NetworkError.invalidURL
    }
    
    // Convert image to data
    guard let imageData = image.jpegData(compressionQuality: 0.8) else {
        throw NetworkError.decodingError
    }
    
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("image/jpeg", forHTTPHeaderField: "Content-Type")
    request.httpBody = imageData
    
    let (_, response) = try await URLSession.shared.data(for: request)
    
    guard let httpResponse = response as? HTTPURLResponse,
          (200...299).contains(httpResponse.statusCode) else {
        throw NetworkError.invalidResponse
    }
    
    print("Image uploaded successfully")
}
```

## Handling Timeouts

Set custom timeout intervals:

```swift
func fetchWithTimeout() async throws -> User {
    let url = URL(string: "https://jsonplaceholder.typicode.com/users/1")!
    
    var request = URLRequest(url: url)
    request.timeoutInterval = 10  // 10 seconds timeout
    
    let (data, _) = try await URLSession.shared.data(for: request)
    return try JSONDecoder().decode(User.self, from: data)
}
```

## Caching Strategies

Control how responses are cached:

```swift
func fetchWithCaching() async throws -> User {
    let url = URL(string: "https://jsonplaceholder.typicode.com/users/1")!
    
    var request = URLRequest(url: url)
    
    // Cache policy options:
    // .useProtocolCachePolicy - Default behavior
    // .reloadIgnoringLocalCacheData - Always fetch fresh
    // .returnCacheDataElseLoad - Use cache if available
    // .returnCacheDataDontLoad - Only use cache, don't network
    request.cachePolicy = .returnCacheDataElseLoad
    
    let (data, _) = try await URLSession.shared.data(for: request)
    return try JSONDecoder().decode(User.self, from: data)
}
```

## Real-World Example: Complete API Client

Here's a production-ready API client:

```swift
import Foundation

// Models
struct User: Codable {
    let id: Int
    let name: String
    let email: String
    let username: String
}

struct Post: Codable {
    let id: Int
    let userId: Int
    let title: String
    let body: String
}

// Network Error
enum NetworkError: Error, LocalizedError {
    case invalidURL
    case invalidResponse
    case unauthorized
    case serverError(statusCode: Int)
    case decodingError(Error)
    case networkError(Error)
    
    var errorDescription: String? {
        switch self {
        case .invalidURL:
            return "Invalid URL"
        case .invalidResponse:
            return "Invalid server response"
        case .unauthorized:
            return "Unauthorized - Please log in"
        case .serverError(let code):
            return "Server error with status code: \(code)"
        case .decodingError(let error):
            return "Failed to decode: \(error.localizedDescription)"
        case .networkError(let error):
            return "Network error: \(error.localizedDescription)"
        }
    }
}

// API Client
class APIClient {
    static let shared = APIClient()
    private init() {}
    
    private let baseURL = "https://jsonplaceholder.typicode.com"
    private let decoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.keyDecodingStrategy = .convertFromSnakeCase
        return decoder
    }()
    
    // MARK: - Generic Request Method
    private func request<T: Codable>(
        endpoint: String,
        method: String = "GET",
        body: Data? = nil,
        headers: [String: String]? = nil
    ) async throws -> T {
        guard let url = URL(string: baseURL + endpoint) else {
            throw NetworkError.invalidURL
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.httpBody = body
        request.timeoutInterval = 30
        
        // Add headers
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        headers?.forEach { request.setValue($0.value, forHTTPHeaderField: $0.key) }
        
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            
            guard let httpResponse = response as? HTTPURLResponse else {
                throw NetworkError.invalidResponse
            }
            
            switch httpResponse.statusCode {
            case 200...299:
                do {
                    return try decoder.decode(T.self, from: data)
                } catch {
                    throw NetworkError.decodingError(error)
                }
            case 401:
                throw NetworkError.unauthorized
            default:
                throw NetworkError.serverError(statusCode: httpResponse.statusCode)
            }
        } catch let error as NetworkError {
            throw error
        } catch {
            throw NetworkError.networkError(error)
        }
    }
    
    // MARK: - API Methods
    func fetchUsers() async throws -> [User] {
        try await request(endpoint: "/users")
    }
    
    func fetchUser(id: Int) async throws -> User {
        try await request(endpoint: "/users/\(id)")
    }
    
    func fetchPosts(userId: Int? = nil) async throws -> [Post] {
        var endpoint = "/posts"
        if let userId = userId {
            endpoint += "?userId=\(userId)"
        }
        return try await request(endpoint: endpoint)
    }
    
    func createPost(title: String, body: String, userId: Int) async throws -> Post {
        let postData = CreatePostRequest(title: title, body: body, userId: userId)
        let jsonData = try JSONEncoder().encode(postData)
        
        return try await request(
            endpoint: "/posts",
            method: "POST",
            body: jsonData
        )
    }
}

// Usage Example
class ViewModel {
    func loadData() {
        Task {
            do {
                // Fetch all users
                let users = try await APIClient.shared.fetchUsers()
                print("✅ Loaded \(users.count) users")
                
                // Fetch specific user
                let user = try await APIClient.shared.fetchUser(id: 1)
                print("✅ User: \(user.name)")
                
                // Fetch posts for user
                let posts = try await APIClient.shared.fetchPosts(userId: 1)
                print("✅ User has \(posts.count) posts")
                
                // Create new post
                let newPost = try await APIClient.shared.createPost(
                    title: "New Post",
                    body: "This is my post",
                    userId: 1
                )
                print("✅ Created post with ID: \(newPost.id)")
                
            } catch let error as NetworkError {
                print("❌ Error: \(error.errorDescription ?? "Unknown")")
            } catch {
                print("❌ Unexpected error: \(error)")
            }
        }
    }
}
```

## Best Practices

### 1. Always Use HTTPS
```swift
// ✅ Secure
let url = URL(string: "https://api.example.com/data")

// ❌ Insecure (requires special configuration)
let url = URL(string: "http://api.example.com/data")
```

### 2. Handle Errors Gracefully
```swift
// ✅ Good - Comprehensive error handling
do {
    let user = try await fetchUser(id: 1)
} catch NetworkError.unauthorized {
    // Show login screen
} catch NetworkError.serverError(let code) {
    // Show error message
} catch {
    // Generic error
}
```

### 3. Use Async/Await Over Completion Handlers
```swift
// ✅ Preferred - Modern and clean
func fetchUser() async throws -> User {
    // Implementation
}

// ❌ Avoid - Legacy pattern
func fetchUser(completion: @escaping (Result<User, Error>) -> Void) {
    // Implementation
}
```

### 4. Update UI on Main Thread
```swift
Task {
    let user = try await fetchUser(id: 1)
    
    // ✅ Update UI on main thread
    await MainActor.run {
        nameLabel.text = user.name
    }
}
```

### 5. Create Reusable Network Layer
```swift
// ✅ Good - Centralized networking
class APIClient {
    static let shared = APIClient()
    // Reusable methods
}

// ❌ Avoid - Scattered network calls
// Making URLSession calls directly in view controllers
```

## Summary

Networking in Swift is powerful and straightforward with URLSession:

✅ **URLSession** - Apple's modern networking API  
✅ **Async/Await** - Clean, readable asynchronous code  
✅ **Codable Integration** - Seamless JSON parsing  
✅ **Error Handling** - Comprehensive error management  
✅ **Type Safety** - Catch errors at compile time  

**Key Takeaways:**
- Use `URLSession` for all network requests
- Prefer async/await over completion handlers
- Always handle errors comprehensively
- Check HTTP status codes
- Build a reusable network layer
- Update UI on the main thread
- Use HTTPS for security

---

**Next Steps:** Now that you've mastered networking, you're ready to learn about **SwiftUI** and **UIKit** to build beautiful user interfaces that display your data! 🚀
