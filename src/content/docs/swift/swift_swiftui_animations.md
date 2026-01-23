---
title: "SwiftUI Animations - Bring Your UI to Life"
description: "Master SwiftUI animations including implicit animations, explicit animations, transitions, spring animations, and matched geometry effects"
---

Animations are what make your app feel alive and professional. SwiftUI makes animations incredibly easy with built-in support for smooth, performant transitions.

## What are SwiftUI Animations?

SwiftUI animations automatically interpolate between view states. When a property changes, SwiftUI can animate that change smoothly instead of jumping instantly to the new value.

### Why Animations Matter

**📱 User Experience**
- Guide user attention
- Provide feedback for actions
- Make interfaces feel responsive

**✨ Professional Polish**
- Apps feel more premium
- Smooth transitions reduce cognitive load
- Delightful micro-interactions

## Implicit Animations

The simplest way to add animations - apply `.animation()` modifier to views.

### Basic Implicit Animation

```swift
struct ImplicitAnimationExample: View {
    @State private var isExpanded = false
    
    var body: some View {
        VStack {
            RoundedRectangle(cornerRadius: isExpanded ? 50 : 10)
                .fill(isExpanded ? Color.blue : Color.red)
                .frame(width: isExpanded ? 300 : 100,
                       height: isExpanded ? 300 : 100)
                .animation(.default, value: isExpanded)
            
            Button("Toggle") {
                isExpanded.toggle()
            }
            .padding()
        }
    }
}
```

**Key Points:**
- `.animation(.default, value: isExpanded)` animates changes to `isExpanded`
- All animatable properties change smoothly
- SwiftUI handles the interpolation

### Animation Curves

Different timing curves for different effects:

```swift
struct AnimationCurvesExample: View {
    @State private var offset: CGFloat = 0
    
    var body: some View {
        VStack(spacing: 30) {
            // Linear - constant speed
            Circle()
                .fill(Color.red)
                .frame(width: 50, height: 50)
                .offset(x: offset)
                .animation(.linear(duration: 1), value: offset)
            
            // Ease In - starts slow
            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .offset(x: offset)
                .animation(.easeIn(duration: 1), value: offset)
            
            // Ease Out - ends slow
            Circle()
                .fill(Color.green)
                .frame(width: 50, height: 50)
                .offset(x: offset)
                .animation(.easeOut(duration: 1), value: offset)
            
            // Ease In Out - slow at both ends
            Circle()
                .fill(Color.orange)
                .frame(width: 50, height: 50)
                .offset(x: offset)
                .animation(.easeInOut(duration: 1), value: offset)
            
            Button("Animate") {
                offset = offset == 0 ? 150 : 0
            }
        }
    }
}
```

## Explicit Animations

More control using `withAnimation` - animates all changes within the closure.

### Basic Explicit Animation

```swift
struct ExplicitAnimationExample: View {
    @State private var rotation: Double = 0
    @State private var scale: CGFloat = 1
    
    var body: some View {
        VStack {
            Image(systemName: "star.fill")
                .font(.system(size: 100))
                .foregroundColor(.yellow)
                .rotationEffect(.degrees(rotation))
                .scaleEffect(scale)
            
            Button("Animate") {
                withAnimation(.spring(response: 0.5, dampingFraction: 0.6)) {
                    rotation += 360
                    scale = scale == 1 ? 1.5 : 1
                }
            }
        }
    }
}
```

**Advantages:**
- Animate multiple properties together
- Fine control over timing
- Cleaner for complex animations

### Different Animation Types

```swift
struct AnimationTypesExample: View {
    @State private var isAnimated = false
    
    var body: some View {
        VStack(spacing: 40) {
            // Default animation
            Button("Default") {
                withAnimation {
                    isAnimated.toggle()
                }
            }
            
            // Linear animation
            Button("Linear (2s)") {
                withAnimation(.linear(duration: 2)) {
                    isAnimated.toggle()
                }
            }
            
            // Spring animation
            Button("Spring") {
                withAnimation(.spring()) {
                    isAnimated.toggle()
                }
            }
            
            // Custom spring
            Button("Bouncy Spring") {
                withAnimation(.spring(response: 0.3, dampingFraction: 0.3)) {
                    isAnimated.toggle()
                }
            }
            
            // Animated view
            Circle()
                .fill(isAnimated ? Color.blue : Color.red)
                .frame(width: isAnimated ? 200 : 100,
                       height: isAnimated ? 200 : 100)
        }
    }
}
```

## Spring Animations

Spring animations feel natural and responsive - like a real spring!

### Spring Parameters

```swift
struct SpringAnimationExample: View {
    @State private var position: CGFloat = 0
    
    var body: some View {
        VStack(spacing: 30) {
            // Stiff spring (quick, minimal bounce)
            Circle()
                .fill(Color.red)
                .frame(width: 50, height: 50)
                .offset(x: position)
                .animation(.spring(response: 0.3, dampingFraction: 0.8), value: position)
            
            // Medium spring (balanced)
            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .offset(x: position)
                .animation(.spring(response: 0.5, dampingFraction: 0.6), value: position)
            
            // Bouncy spring (slow, lots of bounce)
            Circle()
                .fill(Color.green)
                .frame(width: 50, height: 50)
                .offset(x: position)
                .animation(.spring(response: 0.8, dampingFraction: 0.3), value: position)
            
            HStack {
                Button("Left") {
                    position = -100
                }
                
                Button("Center") {
                    position = 0
                }
                
                Button("Right") {
                    position = 100
                }
            }
        }
    }
}
```

**Spring Parameters:**
- **response** - Duration of spring animation (higher = slower)
- **dampingFraction** - How much bounce (0 = infinite bounce, 1 = no bounce)
- **blendDuration** - How animations blend together

## Transitions

Transitions define how views appear and disappear.

### Built-in Transitions

```swift
struct TransitionsExample: View {
    @State private var showView = false
    @State private var transitionType = 0
    
    var body: some View {
        VStack(spacing: 20) {
            Picker("Transition", selection: $transitionType) {
                Text("Opacity").tag(0)
                Text("Scale").tag(1)
                Text("Slide").tag(2)
                Text("Move").tag(3)
            }
            .pickerStyle(.segmented)
            
            Spacer()
            
            if showView {
                RoundedRectangle(cornerRadius: 20)
                    .fill(Color.blue)
                    .frame(width: 200, height: 200)
                    .transition(selectedTransition)
            }
            
            Spacer()
            
            Button(showView ? "Hide" : "Show") {
                withAnimation(.spring()) {
                    showView.toggle()
                }
            }
        }
        .padding()
    }
    
    var selectedTransition: AnyTransition {
        switch transitionType {
        case 0: return .opacity
        case 1: return .scale
        case 2: return .slide
        case 3: return .move(edge: .bottom)
        default: return .opacity
        }
    }
}
```

### Combined Transitions

Combine multiple transitions:

```swift
struct CombinedTransitionsExample: View {
    @State private var showCard = false
    
    var body: some View {
        VStack {
            if showCard {
                CardView()
                    .transition(.scale.combined(with: .opacity))
            }
            
            Button("Toggle Card") {
                withAnimation(.spring()) {
                    showCard.toggle()
                }
            }
        }
    }
}

struct CardView: View {
    var body: some View {
        RoundedRectangle(cornerRadius: 20)
            .fill(
                LinearGradient(
                    colors: [.blue, .purple],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .frame(width: 300, height: 200)
            .shadow(radius: 10)
    }
}
```

### Asymmetric Transitions

Different animations for insertion and removal:

```swift
struct AsymmetricTransitionExample: View {
    @State private var showNotification = false
    
    var body: some View {
        VStack {
            Spacer()
            
            if showNotification {
                NotificationView()
                    .transition(
                        .asymmetric(
                            insertion: .move(edge: .top).combined(with: .opacity),
                            removal: .move(edge: .trailing).combined(with: .opacity)
                        )
                    )
            }
            
            Spacer()
            
            Button("Show Notification") {
                withAnimation {
                    showNotification = true
                }
                
                // Auto-hide after 2 seconds
                DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                    withAnimation {
                        showNotification = false
                    }
                }
            }
        }
    }
}

struct NotificationView: View {
    var body: some View {
        HStack {
            Image(systemName: "checkmark.circle.fill")
                .foregroundColor(.green)
            Text("Success!")
                .fontWeight(.semibold)
        }
        .padding()
        .background(Color.green.opacity(0.2))
        .cornerRadius(10)
        .padding()
    }
}
```

## Matched Geometry Effect

Create smooth transitions when views move between positions.

### Basic Matched Geometry

```swift
struct MatchedGeometryExample: View {
    @State private var isExpanded = false
    @Namespace private var animation
    
    var body: some View {
        VStack {
            if !isExpanded {
                CompactView(namespace: animation)
                    .onTapGesture {
                        withAnimation(.spring()) {
                            isExpanded = true
                        }
                    }
            } else {
                ExpandedView(namespace: animation)
                    .onTapGesture {
                        withAnimation(.spring()) {
                            isExpanded = false
                        }
                    }
            }
        }
    }
}

struct CompactView: View {
    let namespace: Namespace.ID
    
    var body: some View {
        HStack {
            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .matchedGeometryEffect(id: "avatar", in: namespace)
            
            Text("John Doe")
                .matchedGeometryEffect(id: "name", in: namespace)
        }
        .padding()
        .background(Color.gray.opacity(0.2))
        .cornerRadius(10)
    }
}

struct ExpandedView: View {
    let namespace: Namespace.ID
    
    var body: some View {
        VStack(spacing: 20) {
            Circle()
                .fill(Color.blue)
                .frame(width: 150, height: 150)
                .matchedGeometryEffect(id: "avatar", in: namespace)
            
            Text("John Doe")
                .font(.title)
                .matchedGeometryEffect(id: "name", in: namespace)
            
            Text("Software Developer")
                .foregroundColor(.gray)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color.white)
        .cornerRadius(20)
        .shadow(radius: 10)
        .padding()
    }
}
```

## Animatable Modifiers

Create custom animated effects with `AnimatableModifier`.

### Custom Wave Effect

```swift
struct WaveModifier: AnimatableModifier {
    var waveHeight: Double
    
    var animatableData: Double {
        get { waveHeight }
        set { waveHeight = newValue }
    }
    
    func body(content: Content) -> some View {
        content
            .offset(y: sin(waveHeight) * 20)
    }
}

struct CustomAnimationExample: View {
    @State private var waveOffset = 0.0
    
    var body: some View {
        VStack {
            Text("Waving Text!")
                .font(.largeTitle)
                .modifier(WaveModifier(waveHeight: waveOffset))
            
            Button("Wave") {
                withAnimation(.linear(duration: 2).repeatForever(autoreverses: false)) {
                    waveOffset = .pi * 2
                }
            }
        }
    }
}
```

## Repeating Animations

Animations that loop continuously.

### Pulsing Effect

```swift
struct PulsingExample: View {
    @State private var isPulsing = false
    
    var body: some View {
        VStack {
            Circle()
                .fill(Color.red)
                .frame(width: 100, height: 100)
                .scaleEffect(isPulsing ? 1.3 : 1.0)
                .opacity(isPulsing ? 0.5 : 1.0)
                .animation(
                    .easeInOut(duration: 1)
                    .repeatForever(autoreverses: true),
                    value: isPulsing
                )
            
            Button("Start Pulsing") {
                isPulsing = true
            }
        }
        .onAppear {
            isPulsing = true
        }
    }
}
```

### Loading Spinner

```swift
struct LoadingSpinner: View {
    @State private var isRotating = false
    
    var body: some View {
        Circle()
            .trim(from: 0, to: 0.7)
            .stroke(Color.blue, lineWidth: 5)
            .frame(width: 50, height: 50)
            .rotationEffect(.degrees(isRotating ? 360 : 0))
            .animation(
                .linear(duration: 1)
                .repeatForever(autoreverses: false),
                value: isRotating
            )
            .onAppear {
                isRotating = true
            }
    }
}
```

## Practical Example - Animated Menu

```swift
struct AnimatedMenu: View {
    @State private var isMenuOpen = false
    @State private var selectedItem: String?
    
    let menuItems = ["Profile", "Settings", "Help", "Logout"]
    
    var body: some View {
        ZStack {
            // Background
            Color.black.opacity(isMenuOpen ? 0.3 : 0)
                .ignoresSafeArea()
                .onTapGesture {
                    withAnimation(.spring()) {
                        isMenuOpen = false
                    }
                }
            
            VStack {
                Spacer()
                
                // Menu items
                if isMenuOpen {
                    VStack(spacing: 15) {
                        ForEach(Array(menuItems.enumerated()), id: \.offset) { index, item in
                            MenuItemButton(title: item) {
                                selectedItem = item
                                withAnimation(.spring()) {
                                    isMenuOpen = false
                                }
                            }
                            .transition(
                                .scale.combined(with: .opacity)
                            )
                            .animation(
                                .spring(response: 0.3, dampingFraction: 0.7)
                                .delay(Double(index) * 0.05),
                                value: isMenuOpen
                            )
                        }
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(20)
                    .shadow(radius: 20)
                    .padding()
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                }
                
                // Floating action button
                Button {
                    withAnimation(.spring()) {
                        isMenuOpen.toggle()
                    }
                } label: {
                    Image(systemName: isMenuOpen ? "xmark" : "plus")
                        .font(.title2)
                        .foregroundColor(.white)
                        .frame(width: 60, height: 60)
                        .background(Color.blue)
                        .clipShape(Circle())
                        .rotationEffect(.degrees(isMenuOpen ? 45 : 0))
                        .shadow(radius: 10)
                }
                .padding()
            }
        }
    }
}

struct MenuItemButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: iconName)
                    .frame(width: 30)
                Text(title)
                    .fontWeight(.medium)
                Spacer()
            }
            .padding()
            .background(Color.gray.opacity(0.1))
            .cornerRadius(10)
        }
        .buttonStyle(.plain)
    }
    
    var iconName: String {
        switch title {
        case "Profile": return "person.fill"
        case "Settings": return "gear"
        case "Help": return "questionmark.circle"
        case "Logout": return "rectangle.portrait.and.arrow.right"
        default: return "circle"
        }
    }
}
```

## Best Practices

### 1. Use Value-Based Animations (iOS 17+)

```swift
// ✅ Good - Explicit value binding
.animation(.spring(), value: isExpanded)

// ⚠️ Be careful - Animates everything
.animation(.spring())
```

### 2. Choose Appropriate Duration

```swift
// ✅ Good - Quick micro-interactions
.animation(.spring(response: 0.3), value: state)

// ❌ Avoid - Too slow for simple changes
.animation(.linear(duration: 5), value: state)
```

### 3. Spring for Natural Feel

```swift
// ✅ Good - Feels responsive
withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
    // changes
}

// ⚠️ Linear can feel robotic
withAnimation(.linear) {
    // changes
}
```

### 4. Don't Over-Animate

```swift
// ✅ Good - Purposeful animation
Button("Save") { }
    .scaleEffect(isSaving ? 0.95 : 1.0)
    .animation(.spring(), value: isSaving)

// ❌ Avoid - Distracting
Text("Hello")
    .animation(.spring().repeatForever(), value: someValue)  // Too much!
```

### 5. Performance Considerations

```swift
// ✅ Good - Animate simple properties
.opacity(isVisible ? 1 : 0)
.scale(isPressed ? 0.95 : 1.0)

// ⚠️ Can be expensive
.blur(radius: isBlurred ? 20 : 0)  // Heavy rendering
```

## Common Animation Patterns

### Button Press Animation

```swift
struct PressableButton: View {
    @State private var isPressed = false
    
    var body: some View {
        Button("Press Me") {
            // Action
        }
        .scaleEffect(isPressed ? 0.9 : 1.0)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: isPressed)
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in isPressed = true }
                .onEnded { _ in isPressed = false }
        )
    }
}
```

### Shimmer Loading Effect

```swift
struct ShimmerView: View {
    @State private var shimmerOffset: CGFloat = -300
    
    var body: some View {
        RoundedRectangle(cornerRadius: 10)
            .fill(Color.gray.opacity(0.3))
            .frame(height: 100)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .fill(
                        LinearGradient(
                            colors: [.clear, .white.opacity(0.5), .clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .offset(x: shimmerOffset)
            )
            .clipped()
            .onAppear {
                withAnimation(.linear(duration: 1.5).repeatForever(autoreverses: false)) {
                    shimmerOffset = 300
                }
            }
    }
}
```

## Summary

- ✅ **Implicit Animations** - Use `.animation()` for simple property changes
- ✅ **Explicit Animations** - Use `withAnimation` for grouped changes
- ✅ **Spring Animations** - Natural, physics-based movement
- ✅ **Transitions** - Control how views appear/disappear
- ✅ **Matched Geometry** - Smooth morphing between view states
- ✅ **Custom Animations** - `AnimatableModifier` for complex effects
- ✅ **Repeating Animations** - `.repeatForever()` for continuous motion
- ✅ **Performance** - Keep animations smooth and purposeful

**Animations make your app feel polished and professional. Use them wisely!** ✨

---

*Next: Learn SwiftUI Lists & Grids for efficiently displaying collections of data.*
