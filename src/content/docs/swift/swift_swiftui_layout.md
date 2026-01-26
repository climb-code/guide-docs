---
title: "SwiftUI Layout"
description: "Master layout in SwiftUI using stacks, spacers, frames, alignment, and padding"
---

Layout is fundamental to building beautiful SwiftUI interfaces. SwiftUI provides powerful and intuitive layout tools that make it easy to create responsive, adaptive designs. In this guide, you'll learn how to arrange views using stacks, control spacing and alignment, and create flexible layouts.

## Layout Containers

### VStack - Vertical Stack

Arranges views vertically from top to bottom:

```swift
import SwiftUI

struct VStackExample: View {
    var body: some View {
        VStack {
            Text("First")
            Text("Second")
            Text("Third")
        }
    }
}
```

**With Spacing:**
```swift
VStack(spacing: 20) {
    Text("First")
    Text("Second")
    Text("Third")
}
```

**With Alignment:**
```swift
VStack(alignment: .leading, spacing: 10) {
    Text("Left aligned")
    Text("Also left")
    Text("All left!")
}

VStack(alignment: .trailing, spacing: 10) {
    Text("Right aligned")
    Text("Also right")
    Text("All right!")
}
```

### HStack - Horizontal Stack

Arranges views horizontally from left to right:

```swift
HStack {
    Text("Left")
    Text("Center")
    Text("Right")
}
```

**With Spacing and Alignment:**
```swift
HStack(alignment: .top, spacing: 15) {
    Image(systemName: "star.fill")
    Text("Rating")
    Text("5.0")
}

// Vertical alignment options: .top, .center, .bottom, .firstTextBaseline, .lastTextBaseline
```

### ZStack - Depth Stack

Layers views on top of each other (z-axis):

```swift
ZStack {
    Color.blue
    Text("Overlay Text")
        .foregroundColor(.white)
        .font(.largeTitle)
}
```

**With Alignment:**
```swift
ZStack(alignment: .topLeading) {
    Rectangle()
        .fill(Color.gray.opacity(0.3))
        .frame(width: 200, height: 200)
    
    Text("Top Left")
        .padding()
}

ZStack(alignment: .bottomTrailing) {
    Rectangle()
        .fill(Color.blue.opacity(0.3))
        .frame(width: 200, height: 200)
    
    Text("Bottom Right")
        .padding()
}
```

## Spacer

`Spacer` pushes views apart by taking up all available space:

```swift
// Push to edges
HStack {
    Text("Left")
    Spacer()
    Text("Right")
}

VStack {
    Text("Top")
    Spacer()
    Text("Bottom")
}
```

**Fixed Size Spacer:**
```swift
VStack(spacing: 0) {
    Text("First")
    Spacer()
        .frame(height: 50)  // Fixed 50pt space
    Text("Second")
}
```

**Multiple Spacers:**
```swift
HStack {
    Text("Left")
    Spacer()
    Text("Center")
    Spacer()
    Text("Right")
}
```

## Divider

Creates a visual separator between views:

```swift
VStack {
    Text("Section 1")
    Divider()
    Text("Section 2")
    Divider()
    Text("Section 3")
}

HStack {
    Text("Left")
    Divider()
    Text("Right")
}
```

## Alignment

### Horizontal Alignment
```swift
// In VStack
VStack(alignment: .leading) {
    Text("Left")
    Text("Also Left")
}

VStack(alignment: .center) {  // Default
    Text("Center")
    Text("Also Center")
}

VStack(alignment: .trailing) {
    Text("Right")
    Text("Also Right")
}
```

### Vertical Alignment
```swift
// In HStack
HStack(alignment: .top) {
    Text("Top")
    Text("Also Top")
}

HStack(alignment: .center) {  // Default
    Text("Center")
    Text("Also Center")
}

HStack(alignment: .bottom) {
    Text("Bottom")
    Text("Also Bottom")
}
```

### Text Baseline Alignment
```swift
HStack(alignment: .firstTextBaseline) {
    Text("Large")
        .font(.largeTitle)
    Text("Small")
        .font(.caption)
}

HStack(alignment: .lastTextBaseline) {
    Text("Multi\nLine\nText")
    Text("Single")
}
```

## Padding

Add space around views:

```swift
// All sides
Text("Padded")
    .padding()  // Default 16pt

// Specific amount
Text("Custom Padding")
    .padding(30)

// Specific edges
Text("Top Padding")
    .padding(.top, 20)

Text("Horizontal Padding")
    .padding(.horizontal, 40)

Text("Custom edges")
    .padding([.leading, .bottom], 15)
```

**Edge Insets:**
```swift
Text("Custom EdgeInsets")
    .padding(EdgeInsets(top: 10, leading: 20, bottom: 10, trailing: 20))
```

## Frames

Control view size:

```swift
// Fixed size
Text("Fixed")
    .frame(width: 200, height: 100)

// Minimum size
Text("Min Size")
    .frame(minWidth: 100, minHeight: 50)

// Maximum size
Text("Max Size")
    .frame(maxWidth: 300, maxHeight: 200)

// Ideal size
Text("Ideal")
    .frame(idealWidth: 200, idealHeight: 100)
```

**Infinite Frames:**
```swift
// Full width
Text("Full Width")
    .frame(maxWidth: .infinity)
    .background(Color.blue)

// Full height
Text("Full Height")
    .frame(maxHeight: .infinity)
    .background(Color.green)

// Full screen
Text("Full Screen")
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Color.red)
```

**Frame Alignment:**
```swift
Text("Top Leading")
    .frame(width: 200, height: 200, alignment: .topLeading)
    .background(Color.gray.opacity(0.3))

Text("Center")
    .frame(width: 200, height: 200, alignment: .center)
    .background(Color.blue.opacity(0.3))

Text("Bottom Trailing")
    .frame(width: 200, height: 200, alignment: .bottomTrailing)
    .background(Color.green.opacity(0.3))
```

## Offset

Move views from their natural position:

```swift
Text("Offset")
    .offset(x: 50, y: 50)  // Move 50pt right and down

Text("Offset Left")
    .offset(x: -30, y: 0)  // Move 30pt left

Text("Offset Up")
    .offset(x: 0, y: -20)  // Move 20pt up
```

## Position

Set absolute position:

```swift
ZStack {
    Color.gray.opacity(0.2)
        .frame(width: 300, height: 300)
    
    Text("Positioned")
        .position(x: 50, y: 50)  // Absolute position from top-left
}
```

## Overlay and Background

### Overlay
Place view on top:

```swift
Rectangle()
    .fill(Color.blue)
    .frame(width: 200, height: 200)
    .overlay(
        Text("Overlay")
            .foregroundColor(.white)
    )

// With alignment
Circle()
    .fill(Color.green)
    .frame(width: 100, height: 100)
    .overlay(
        Image(systemName: "checkmark")
            .foregroundColor(.white),
        alignment: .topTrailing
    )
```

### Background
Place view behind:

```swift
Text("With Background")
    .padding()
    .background(Color.blue)

Text("Rounded Background")
    .padding()
    .background(
        RoundedRectangle(cornerRadius: 10)
            .fill(Color.purple)
    )
```

## GeometryReader

Read parent size and position:

```swift
GeometryReader { geometry in
    VStack {
        Text("Width: \(geometry.size.width)")
        Text("Height: \(geometry.size.height)")
    }
}

// Responsive layout
GeometryReader { geometry in
    HStack(spacing: 0) {
        Rectangle()
            .fill(Color.blue)
            .frame(width: geometry.size.width * 0.3)
        
        Rectangle()
            .fill(Color.green)
            .frame(width: geometry.size.width * 0.7)
    }
}
.frame(height: 100)
```

**Center Content:**
```swift
GeometryReader { geometry in
    Text("Centered")
        .position(
            x: geometry.size.width / 2,
            y: geometry.size.height / 2
        )
}
```

## LazyVStack and LazyHStack

Lazy loading for better performance:

```swift
// Regular VStack loads all views immediately
ScrollView {
    VStack {
        ForEach(0..<1000) { i in
            Text("Row \(i)")
        }
    }
}

// LazyVStack loads views on demand
ScrollView {
    LazyVStack {
        ForEach(0..<1000) { i in
            Text("Row \(i)")
                .onAppear {
                    print("Row \(i) appeared")
                }
        }
    }
}
```

**LazyHStack:**
```swift
ScrollView(.horizontal) {
    LazyHStack(spacing: 10) {
        ForEach(0..<100) { i in
            RoundedRectangle(cornerRadius: 10)
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .overlay(Text("\(i)"))
        }
    }
}
```

## Practical Layout Examples

### Card Layout
```swift
VStack(alignment: .leading, spacing: 8) {
    Image(systemName: "photo")
        .resizable()
        .aspectRatio(contentMode: .fill)
        .frame(height: 200)
        .clipped()
    
    VStack(alignment: .leading, spacing: 4) {
        Text("Card Title")
            .font(.headline)
        
        Text("Card description goes here with some details.")
            .font(.subheadline)
            .foregroundColor(.gray)
    }
    .padding(.horizontal)
    
    HStack {
        Button("Action 1") { }
        Spacer()
        Button("Action 2") { }
    }
    .padding()
}
.background(Color.white)
.cornerRadius(12)
.shadow(radius: 5)
.padding()
```

### Profile Header
```swift
HStack(spacing: 15) {
    Image(systemName: "person.circle.fill")
        .resizable()
        .frame(width: 60, height: 60)
        .foregroundColor(.blue)
    
    VStack(alignment: .leading, spacing: 4) {
        Text("John Doe")
            .font(.headline)
        
        Text("john@example.com")
            .font(.subheadline)
            .foregroundColor(.gray)
        
        HStack(spacing: 4) {
            Image(systemName: "star.fill")
                .foregroundColor(.yellow)
            Text("4.8")
                .font(.caption)
        }
    }
    
    Spacer()
    
    Button(action: {}) {
        Image(systemName: "ellipsis")
    }
}
.padding()
.background(Color.gray.opacity(0.1))
.cornerRadius(10)
```

### Grid-like Layout
```swift
VStack(spacing: 10) {
    HStack(spacing: 10) {
        Rectangle().fill(Color.red).frame(height: 100)
        Rectangle().fill(Color.blue).frame(height: 100)
    }
    
    HStack(spacing: 10) {
        Rectangle().fill(Color.green).frame(height: 100)
        Rectangle().fill(Color.orange).frame(height: 100)
    }
    
    HStack(spacing: 10) {
        Rectangle().fill(Color.purple).frame(height: 100)
        Rectangle().fill(Color.pink).frame(height: 100)
    }
}
.padding()
```

### Split View
```swift
GeometryReader { geometry in
    HStack(spacing: 0) {
        // Sidebar
        VStack {
            Text("Sidebar")
                .font(.headline)
            Spacer()
        }
        .frame(width: geometry.size.width * 0.3)
        .background(Color.blue.opacity(0.2))
        
        // Main content
        VStack {
            Text("Main Content")
                .font(.headline)
            Spacer()
        }
        .frame(width: geometry.size.width * 0.7)
        .background(Color.gray.opacity(0.1))
    }
}
```

### Bottom Sheet Layout
```swift
VStack {
    Spacer()
    
    VStack(spacing: 0) {
        // Handle
        RoundedRectangle(cornerRadius: 3)
            .fill(Color.gray.opacity(0.5))
            .frame(width: 40, height: 5)
            .padding(.top, 10)
        
        // Content
        VStack(alignment: .leading, spacing: 15) {
            Text("Bottom Sheet")
                .font(.title2)
                .bold()
            
            Text("This is a bottom sheet with content")
                .foregroundColor(.gray)
            
            Button("Action Button") { }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(10)
        }
        .padding()
    }
    .frame(maxWidth: .infinity)
    .background(Color.white)
    .cornerRadius(20, corners: [.topLeft, .topRight])
    .shadow(radius: 20)
}
.edgesIgnoringSafeArea(.bottom)
```

## Best Practices

### 1. Use Appropriate Stack Types
```swift
// ✅ Good - Correct stack for the layout
VStack {  // Vertical content
    Text("Title")
    Text("Subtitle")
}

// ❌ Avoid - Wrong stack type
HStack {  // Horizontal stack for vertical content
    VStack {
        Text("Title")
    }
    VStack {
        Text("Subtitle")
    }
}
```

### 2. Combine Stacks for Complex Layouts
```swift
// ✅ Good - Nested stacks
VStack {
    HStack {
        Text("Left")
        Spacer()
        Text("Right")
    }
    
    Text("Below both")
}
```

### 3. Use Spacer Wisely
```swift
// ✅ Good - Natural spacing
HStack {
    Text("Left")
    Spacer()
    Text("Right")
}

// ❌ Avoid - Unnecessary complexity
HStack {
    Text("Left")
        .frame(maxWidth: .infinity, alignment: .leading)
    Text("Right")
        .frame(maxWidth: .infinity, alignment: .trailing)
}
```

### 4. Use LazyStacks for Long Lists
```swift
// ✅ Good - Lazy loading
ScrollView {
    LazyVStack {
        ForEach(0..<1000) { i in
            Text("Row \(i)")
        }
    }
}

// ❌ Avoid - Loads everything at once
ScrollView {
    VStack {
        ForEach(0..<1000) { i in
            Text("Row \(i)")
        }
    }
}
```

### 5. Prefer Padding Over Frames
```swift
// ✅ Good - Flexible with padding
Text("Hello")
    .padding()

// ❌ Avoid - Rigid with fixed frame
Text("Hello")
    .frame(width: 100, height: 50)
```

## Common Layout Patterns

### Centered Content
```swift
VStack {
    Spacer()
    Text("Centered")
    Spacer()
}
.frame(maxWidth: .infinity)
```

### Full Width Button
```swift
Button("Full Width") { }
    .frame(maxWidth: .infinity)
    .padding()
    .background(Color.blue)
    .foregroundColor(.white)
    .cornerRadius(10)
    .padding(.horizontal)
```

### Equal Width Columns
```swift
HStack(spacing: 10) {
    Text("Column 1")
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.blue)
    
    Text("Column 2")
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.green)
}
.padding()
```

## Summary

SwiftUI layout is powerful and flexible:

✅ **VStack** - Arrange views vertically  
✅ **HStack** - Arrange views horizontally  
✅ **ZStack** - Layer views on top of each other  
✅ **Spacer** - Push views apart  
✅ **Padding** - Add space around views  
✅ **Frame** - Control view size  
✅ **GeometryReader** - Responsive layouts  
✅ **LazyStacks** - Performance optimization  

**Key Takeaways:**
- Choose the right stack for your layout direction
- Use Spacer to create flexible spacing
- Combine stacks for complex layouts
- Use frames for fixed sizes, padding for flexible spacing
- Use LazyStacks for long lists
- GeometryReader for responsive designs

---

**Next Steps:** Learn about **SwiftUI Modifiers** to style and customize your layouts! 🚀
