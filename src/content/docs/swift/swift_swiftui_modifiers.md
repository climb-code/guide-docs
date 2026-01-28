---
title: "SwiftUI Modifiers"
description: "Master SwiftUI view modifiers to style and customize your user interface"
---

Modifiers are the heart of SwiftUI styling. They transform views by changing their appearance, behavior, and layout. In this guide, you'll learn how to use built-in modifiers, create custom modifiers, and understand modifier order.

## What are Modifiers?

Modifiers are methods that return a new view with modifications applied:

```swift
Text("Hello")
    .font(.title)           // Returns a new Text view with title font
    .foregroundColor(.blue) // Returns another new view with blue color
    .padding()              // Returns another view with padding
```

Each modifier creates a **new view** - it doesn't mutate the original!

## Text Modifiers

### Font
```swift
Text("Custom Font")
    .font(.largeTitle)  // Predefined sizes
    
Text("Custom Size")
    .font(.system(size: 24))

Text("Custom Font Family")
    .font(.custom("Arial", size: 20))

Text("Bold")
    .font(.title)
    .fontWeight(.bold)

Text("Italic")
    .italic()

Text("Bold Italic")
    .font(.title)
    .bold()
    .italic()
```

### Text Color
```swift
Text("Blue Text")
    .foregroundColor(.blue)

Text("Custom Color")
    .foregroundColor(Color(red: 0.2, green: 0.5, blue: 0.8))

Text("Gradient Text")
    .foregroundStyle(
        LinearGradient(
            colors: [.blue, .purple],
            startPoint: .leading,
            endPoint: .trailing
        )
    )
```

### Text Alignment
```swift
Text("Multi-line text that needs to be aligned properly")
    .multilineTextAlignment(.center)
    .frame(width: 200)

Text("Leading aligned")
    .multilineTextAlignment(.leading)

Text("Trailing aligned")
    .multilineTextAlignment(.trailing)
```

### Line Limit and Spacing
```swift
Text("This is a very long text that will be truncated")
    .lineLimit(1)

Text("Limited to 3 lines at most")
    .lineLimit(3)

Text("Line spacing adjusted")
    .lineSpacing(10)
```

## Background and Foreground

### Background Color
```swift
Text("Background")
    .padding()
    .background(Color.blue)

// Gradient background
Text("Gradient")
    .padding()
    .background(
        LinearGradient(
            colors: [.blue, .purple],
            startPoint: .top,
            endPoint: .bottom
        )
    )
```

### Background Shape
```swift
Text("Rounded Background")
    .padding()
    .background(
        RoundedRectangle(cornerRadius: 10)
            .fill(Color.blue)
    )

Text("Circle Background")
    .padding()
    .background(
        Circle()
            .fill(Color.green)
    )
```

## Border and Stroke

```swift
Text("Border")
    .padding()
    .border(Color.blue, width: 2)

Text("Rounded Border")
    .padding()
    .overlay(
        RoundedRectangle(cornerRadius: 10)
            .stroke(Color.blue, lineWidth: 2)
    )

Rectangle()
    .stroke(Color.blue, lineWidth: 5)
    .frame(width: 100, height: 100)
```

## Corner Radius

```swift
Text("Rounded Corners")
    .padding()
    .background(Color.blue)
    .cornerRadius(10)

Text("More Rounded")
    .padding()
    .background(Color.green)
    .cornerRadius(20)

// Specific corners
Text("Custom Corners")
    .padding()
    .background(Color.purple)
    .clipShape(
        .rect(
            topLeadingRadius: 20,
            bottomLeadingRadius: 0,
            bottomTrailingRadius: 20,
            topTrailingRadius: 0
        )
    )
```

## Shadow

```swift
Text("Shadow")
    .font(.largeTitle)
    .shadow(radius: 5)

Text("Custom Shadow")
    .font(.largeTitle)
    .shadow(color: .blue, radius: 10, x: 5, y: 5)

Rectangle()
    .fill(Color.white)
    .frame(width: 200, height: 100)
    .shadow(color: .black.opacity(0.2), radius: 10, x: 0, y: 5)
```

## Opacity

```swift
Text("Full Opacity")
    .opacity(1.0)  // Fully visible

Text("Half Opacity")
    .opacity(0.5)  // 50% transparent

Text("Almost Invisible")
    .opacity(0.1)  // 10% visible
```

## Clip Shape

```swift
Image(systemName: "photo")
    .resizable()
    .frame(width: 100, height: 100)
    .clipShape(Circle())

Image(systemName: "photo")
    .resizable()
    .frame(width: 100, height: 100)
    .clipShape(RoundedRectangle(cornerRadius: 20))

Text("Capsule Shape")
    .padding()
    .background(Color.blue)
    .clipShape(Capsule())
```

## Rotation and Scale

### Rotation
```swift
Text("Rotated")
    .rotationEffect(.degrees(45))

Image(systemName: "arrow.right")
    .rotationEffect(.degrees(90))

Text("3D Rotation")
    .rotation3DEffect(
        .degrees(45),
        axis: (x: 1, y: 0, z: 0)
    )
```

### Scale
```swift
Text("Scaled Up")
    .scaleEffect(1.5)

Text("Scaled Down")
    .scaleEffect(0.5)

Text("Non-uniform Scale")
    .scaleEffect(x: 2, y: 0.5)
```

## Blur and Brightness

```swift
Text("Blurred")
    .blur(radius: 2)

Image(systemName: "photo")
    .blur(radius: 5)

Text("Brighter")
    .brightness(0.5)  // Values: -1 to 1

Text("Darker")
    .brightness(-0.3)
```

## Saturation and Contrast

```swift
Image(systemName: "photo.fill")
    .foregroundColor(.blue)
    .saturation(2.0)  // More saturated

Image(systemName: "photo.fill")
    .foregroundColor(.blue)
    .saturation(0.0)  // Grayscale

Text("High Contrast")
    .contrast(2.0)
```

## Conditional Modifiers

Apply modifiers conditionally:

```swift
struct ConditionalExample: View {
    @State private var isHighlighted = false
    
    var body: some View {
        Text("Conditional Styling")
            .padding()
            .background(isHighlighted ? Color.yellow : Color.clear)
            .foregroundColor(isHighlighted ? .black : .primary)
            .onTapGesture {
                isHighlighted.toggle()
            }
    }
}
```

**Using If-Else:**
```swift
struct ConditionalModifier: View {
    let isSpecial: Bool
    
    var body: some View {
        Text("Hello")
            .font(isSpecial ? .largeTitle : .body)
            .if(isSpecial) { view in
                view.foregroundColor(.red)
            }
    }
}

// Helper extension
extension View {
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
}
```

## Modifier Order Matters

Order affects the final result:

```swift
// Padding THEN background
Text("Order 1")
    .padding()
    .background(Color.blue)
// Blue background behind the padded text

// Background THEN padding
Text("Order 2")
    .background(Color.blue)
    .padding()
// Blue background only behind text, padding outside
```

**Visual Example:**
```swift
VStack(spacing: 20) {
    Text("Padding → Border")
        .padding(20)
        .border(Color.blue, width: 2)
    // Border around the padding
    
    Text("Border → Padding")
        .border(Color.blue, width: 2)
        .padding(20)
    // Padding outside the border
}
```

## Custom Modifiers

Create reusable custom modifiers:

```swift
// Define a custom modifier
struct PrimaryButtonStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.headline)
            .foregroundColor(.white)
            .padding()
            .frame(maxWidth: .infinity)
            .background(Color.blue)
            .cornerRadius(10)
    }
}

// Extension for easy use
extension View {
    func primaryButtonStyle() -> some View {
        modifier(PrimaryButtonStyle())
    }
}

// Usage
Button("Click Me") { }
    .primaryButtonStyle()
```

**Parameterized Custom Modifier:**
```swift
struct CardStyle: ViewModifier {
    let backgroundColor: Color
    let cornerRadius: CGFloat
    
    func body(content: Content) -> some View {
        content
            .padding()
            .background(backgroundColor)
            .cornerRadius(cornerRadius)
            .shadow(radius: 5)
    }
}

extension View {
    func cardStyle(backgroundColor: Color = .white, cornerRadius: CGFloat = 10) -> some View {
        modifier(CardStyle(backgroundColor: backgroundColor, cornerRadius: cornerRadius))
    }
}

// Usage
Text("Card Content")
    .cardStyle(backgroundColor: .blue, cornerRadius: 15)
```

## Practical Custom Modifiers

### Badge Modifier
```swift
struct Badge: ViewModifier {
    let count: Int
    
    func body(content: Content) -> some View {
        content
            .overlay(
                ZStack {
                    if count > 0 {
                        Circle()
                            .fill(Color.red)
                            .frame(width: 20, height: 20)
                        
                        Text("\(count)")
                            .font(.caption2)
                            .foregroundColor(.white)
                    }
                }
                .offset(x: 10, y: -10),
                alignment: .topTrailing
            )
    }
}

extension View {
    func badge(count: Int) -> some View {
        modifier(Badge(count: count))
    }
}

// Usage
Image(systemName: "bell.fill")
    .font(.title)
    .badge(count: 5)
```

### Loading Modifier
```swift
struct LoadingModifier: ViewModifier {
    let isLoading: Bool
    
    func body(content: Content) -> some View {
        ZStack {
            content
                .opacity(isLoading ? 0.5 : 1)
                .disabled(isLoading)
            
            if isLoading {
                ProgressView()
            }
        }
    }
}

extension View {
    func loading(_ isLoading: Bool) -> some View {
        modifier(LoadingModifier(isLoading: isLoading))
    }
}

// Usage
Button("Submit") { }
    .loading(true)
```

### Shimmer Effect
```swift
struct ShimmerModifier: ViewModifier {
    @State private var phase: CGFloat = 0
    
    func body(content: Content) -> some View {
        content
            .overlay(
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [.clear, .white.opacity(0.4), .clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .rotationEffect(.degrees(30))
                    .offset(x: phase)
            )
            .clipped()
            .onAppear {
                withAnimation(.linear(duration: 1.5).repeatForever(autoreverses: false)) {
                    phase = 300
                }
            }
    }
}

extension View {
    func shimmer() -> some View {
        modifier(ShimmerModifier())
    }
}

// Usage
RoundedRectangle(cornerRadius: 10)
    .fill(Color.gray.opacity(0.3))
    .frame(width: 200, height: 100)
    .shimmer()
```

## Animation Modifiers

```swift
struct AnimationExample: View {
    @State private var isExpanded = false
    
    var body: some View {
        VStack {
            Rectangle()
                .fill(Color.blue)
                .frame(width: isExpanded ? 200 : 100, height: 100)
                .animation(.spring(), value: isExpanded)
            
            Button("Toggle") {
                isExpanded.toggle()
            }
        }
    }
}
```

## Accessibility Modifiers

```swift
Text("Important Info")
    .accessibilityLabel("Important Information")
    .accessibilityHint("Double tap to read more")
    .accessibilityAddTraits(.isButton)

Image(systemName: "star.fill")
    .accessibilityHidden(true)  // Decorative image

Button("Submit") { }
    .accessibilityIdentifier("submitButton")  // For UI testing
```

## Environment Modifiers

```swift
// Apply to all children
VStack {
    Text("First")
    Text("Second")
    Text("Third")
}
.font(.headline)          // Applied to all Text views
.foregroundColor(.blue)   // Applied to all Text views

// vs individual modifiers
VStack {
    Text("First").font(.headline)
    Text("Second").font(.headline)
    Text("Third").font(.headline)
}
```

## Common Modifier Combinations

### Card Style
```swift
VStack {
    Text("Card Title")
        .font(.headline)
    Text("Card content goes here")
        .font(.subheadline)
}
.padding()
.frame(maxWidth: .infinity)
.background(Color.white)
.cornerRadius(12)
.shadow(color: .black.opacity(0.1), radius: 5, y: 2)
```

### Button Style
```swift
Button("Primary Button") { }
    .font(.headline)
    .foregroundColor(.white)
    .padding()
    .frame(maxWidth: .infinity)
    .background(Color.blue)
    .cornerRadius(10)
    .shadow(radius: 3)
```

### Input Field Style
```swift
TextField("Enter text", text: $text)
    .padding()
    .background(Color.gray.opacity(0.1))
    .cornerRadius(8)
    .overlay(
        RoundedRectangle(cornerRadius: 8)
            .stroke(Color.blue, lineWidth: 1)
    )
```

## Best Practices

### 1. Order Matters
```swift
// ✅ Good - Logical order
Text("Hello")
    .padding()        // Space first
    .background(.blue) // Then background
    .cornerRadius(10)  // Then shape

// ❌ Confusing - Illogical order
Text("Hello")
    .cornerRadius(10)  // Shape before background?
    .background(.blue)
    .padding()
```

### 2. Use Custom Modifiers for Reusability
```swift
// ✅ Good - Reusable
extension View {
    func cardStyle() -> some View {
        self.padding()
            .background(Color.white)
            .cornerRadius(12)
            .shadow(radius: 5)
    }
}

// ❌ Avoid - Repetition
// Applying same modifiers everywhere manually
```

### 3. Group Related Modifiers
```swift
// ✅ Good - Grouped by purpose
Text("Hello")
    // Size & layout
    .padding()
    .frame(width: 200)
    
    // Appearance  
    .foregroundColor(.white)
    .background(Color.blue)
    .cornerRadius(10)
    
    // Effects
    .shadow(radius: 5)
```

### 4. Use ViewBuilder for Conditional Modifiers
```swift
// ✅ Good - Clean conditional
@ViewBuilder
func styledText(_ text: String, isHighlighted: Bool) -> some View {
    if isHighlighted {
        Text(text).foregroundColor(.red).bold()
    } else {
        Text(text).foregroundColor(.primary)
    }
}
```

## Summary

SwiftUI modifiers are powerful tools for styling views:

✅ **Chainable** - Apply multiple modifiers in sequence  
✅ **Order Matters** - Modifier sequence affects final result  
✅ **Reusable** - Create custom modifiers for consistency  
✅ **Type-Safe** - Compile-time checking prevents errors  
✅ **Declarative** - Clear, readable styling code  

**Key Takeaways:**
- Modifiers create new views, they don't mutate
- Order of modifiers matters significantly
- Create custom modifiers for reusability
- Use environment modifiers for efficiency
- Combine modifiers for complex effects
- Keep modifier chains readable

---

**Next Steps:** Learn about **SwiftUI Forms & Input** to create interactive user interfaces! 🚀
