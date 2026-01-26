---
title: "SwiftUI Gestures"
description: "Master touch gestures in SwiftUI including tap, drag, long press, magnification, and rotation"
---

Gestures make your SwiftUI apps interactive and engaging. From simple taps to complex multi-touch interactions, SwiftUI provides a rich set of gesture recognizers. In this guide, you'll learn how to add gestures to your views and create interactive experiences.

## Tap Gesture

Detect single and multiple taps:

```swift
struct TapExample: View {
    @State private var message = "Tap me!"
    
    var body: some View {
        Text(message)
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
            .onTapGesture {
                message = "Tapped!"
            }
    }
}
```

### Double Tap
```swift
Text("Double tap me")
    .onTapGesture(count: 2) {
        print("Double tapped!")
    }
```

### Triple Tap
```swift
Text("Triple tap me")
    .onTapGesture(count: 3) {
        print("Triple tapped!")
    }
```

## Long Press Gesture

Detect press and hold:

```swift
struct LongPressExample: View {
    @State private var isPressed = false
    
    var body: some View {
        Circle()
            .fill(isPressed ? Color.red : Color.blue)
            .frame(width: 100, height: 100)
            .onLongPressGesture {
                isPressed.toggle()
            }
    }
}
```

### With Minimum Duration
```swift
Text("Long press (2 seconds)")
    .onLongPressGesture(minimumDuration: 2.0) {
        print("Long pressed for 2 seconds!")
    }
```

### With Progress Tracking
```swift
struct LongPressProgress: View {
    @State private var progress = 0.0
    @State private var isComplete = false
    
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 100, height: 100)
            .overlay(
                Circle()
                    .trim(from: 0, to: progress)
                    .stroke(Color.white, lineWidth: 5)
                    .rotationEffect(.degrees(-90))
            )
            .onLongPressGesture(minimumDuration: 2.0, pressing: { isPressing in
                if isPressing {
                    withAnimation(.linear(duration: 2.0)) {
                        progress = 1.0
                    }
                } else {
                    progress = 0.0
                }
            }) {
                isComplete = true
            }
    }
}
```

## Drag Gesture

Track dragging motion:

```swift
struct DragExample: View {
    @State private var offset = CGSize.zero
    
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 100, height: 100)
            .offset(offset)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        offset = value.translation
                    }
                    .onEnded { _ in
                        withAnimation {
                            offset = .zero
                        }
                    }
            )
    }
}
```

### Draggable Card
```swift
struct DraggableCard: View {
    @State private var dragOffset = CGSize.zero
    @State private var isDragging = false
    
    var body: some View {
        RoundedRectangle(cornerRadius: 20)
            .fill(Color.blue)
            .frame(width: 200, height: 300)
            .overlay(Text("Drag me").foregroundColor(.white))
            .offset(dragOffset)
            .scaleEffect(isDragging ? 1.1 : 1.0)
            .shadow(radius: isDragging ? 20 : 5)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        dragOffset = value.translation
                        isDragging = true
                    }
                    .onEnded { value in
                        withAnimation(.spring()) {
                            // Snap back if not dragged far enough
                            if abs(value.translation.width) < 100 {
                                dragOffset = .zero
                            }
                            isDragging = false
                        }
                    }
            )
    }
}
```

### Swipe to Delete
```swift
struct SwipeToDelete: View {
    @State private var offset: CGFloat = 0
    @State private var isDeleted = false
    
    var body: some View {
        if !isDeleted {
            HStack {
                Text("Swipe to delete")
                    .padding()
                Spacer()
            }
            .background(Color.white)
            .offset(x: offset)
            .background(
                Color.red
                    .overlay(
                        Image(systemName: "trash")
                            .foregroundColor(.white)
                            .padding(),
                        alignment: .trailing
                    )
            )
            .gesture(
                DragGesture()
                    .onChanged { value in
                        if value.translation.width < 0 {
                            offset = value.translation.width
                        }
                    }
                    .onEnded { value in
                        if value.translation.width < -100 {
                            isDeleted = true
                        } else {
                            withAnimation {
                                offset = 0
                            }
                        }
                    }
            )
        }
    }
}
```

## Magnification Gesture

Pinch to zoom:

```swift
struct MagnificationExample: View {
    @State private var scale: CGFloat = 1.0
    
    var body: some View {
        Image(systemName: "star.fill")
            .font(.system(size: 50))
            .scaleEffect(scale)
            .gesture(
                MagnificationGesture()
                    .onChanged { value in
                        scale = value
                    }
                    .onEnded { _ in
                        withAnimation {
                            scale = 1.0
                        }
                    }
            )
    }
}
```

### Image Zoom
```swift
struct ImageZoom: View {
    @State private var scale: CGFloat = 1.0
    @State private var lastScale: CGFloat = 1.0
    
    var body: some View {
        Image("photo")
            .resizable()
            .scaledToFit()
            .scaleEffect(scale)
            .gesture(
                MagnificationGesture()
                    .onChanged { value in
                        scale = lastScale * value
                    }
                    .onEnded { _ in
                        lastScale = scale
                        // Optional: limit zoom
                        if scale > 3.0 {
                            withAnimation {
                                scale = 3.0
                                lastScale = 3.0
                            }
                        } else if scale < 1.0 {
                            withAnimation {
                                scale = 1.0
                                lastScale = 1.0
                            }
                        }
                    }
            )
    }
}
```

## Rotation Gesture

Rotate with two fingers:

```swift
struct RotationExample: View {
    @State private var rotation: Angle = .zero
    
    var body: some View {
        Rectangle()
            .fill(Color.blue)
            .frame(width: 200, height: 100)
            .rotationEffect(rotation)
            .gesture(
                RotationGesture()
                    .onChanged { value in
                        rotation = value
                    }
                    .onEnded { _ in
                        withAnimation {
                            rotation = .zero
                        }
                    }
            )
    }
}
```

### Persistent Rotation
```swift
struct PersistentRotation: View {
    @State private var rotation: Angle = .zero
    @State private var lastRotation: Angle = .zero
    
    var body: some View {
        Image(systemName: "arrow.up")
            .font(.system(size: 50))
            .rotationEffect(rotation)
            .gesture(
                RotationGesture()
                    .onChanged { value in
                        rotation = lastRotation + value
                    }
                    .onEnded { _ in
                        lastRotation = rotation
                    }
            )
    }
}
```

## Combining Gestures

### Simultaneously
Both gestures recognized at the same time:

```swift
struct SimultaneousGestures: View {
    @State private var scale: CGFloat = 1.0
    @State private var rotation: Angle = .zero
    
    var body: some View {
        Image(systemName: "star.fill")
            .font(.system(size: 50))
            .scaleEffect(scale)
            .rotationEffect(rotation)
            .gesture(
                MagnificationGesture()
                    .onChanged { value in
                        scale = value
                    }
                    .simultaneously(with:
                        RotationGesture()
                            .onChanged { value in
                                rotation = value
                            }
                    )
            )
    }
}
```

### Sequentially
One gesture after another:

```swift
struct SequentialGestures: View {
    @State private var message = "Long press, then drag"
    @State private var offset = CGSize.zero
    
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 100, height: 100)
            .offset(offset)
            .gesture(
                LongPressGesture(minimumDuration: 1.0)
                    .sequenced(before: DragGesture())
                    .onChanged { value in
                        switch value {
                        case .second(true, let drag):
                            offset = drag?.translation ?? .zero
                        default:
                            break
                        }
                    }
                    .onEnded { _ in
                        withAnimation {
                            offset = .zero
                        }
                    }
            )
    }
}
```

### Exclusively
Only one gesture at a time:

```swift
struct ExclusiveGestures: View {
    @State private var offset = CGSize.zero
    
    var body: some View {
        Rectangle()
            .fill(Color.blue)
            .frame(width: 200, height: 100)
            .offset(offset)
            .gesture(
                DragGesture()
                    .onChanged { value in
                        offset = value.translation
                    }
                    .exclusively(before:
                        TapGesture()
                            .onEnded {
                                offset = .zero
                            }
                    )
            )
    }
}
```

## Gesture State

Track gesture state:

```swift
struct GestureStateExample: View {
    @GestureState private var dragOffset = CGSize.zero
    @State private var position = CGSize.zero
    
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 100, height: 100)
            .offset(x: position.width + dragOffset.width,
                    y: position.height + dragOffset.height)
            .gesture(
                DragGesture()
                    .updating($dragOffset) { value, state, _ in
                        state = value.translation
                    }
                    .onEnded { value in
                        position.width += value.translation.width
                        position.height += value.translation.height
                    }
            )
    }
}
```

## Practical Gesture Examples

### Pull to Refresh
```swift
struct PullToRefresh: View {
    @State private var isRefreshing = false
    @State private var pullDistance: CGFloat = 0
    
    var body: some View {
        VStack {
            if isRefreshing {
                ProgressView()
                    .padding()
            }
            
            ScrollView {
                GeometryReader { geometry in
                    Color.clear.preference(
                        key: ScrollOffsetKey.self,
                        value: geometry.frame(in: .named("scroll")).minY
                    )
                }
                .frame(height: 0)
                
                ForEach(1...20, id: \.self) { item in
                    Text("Item \(item)")
                        .padding()
                }
            }
            .coordinateSpace(name: "scroll")
            .onPreferenceChange(ScrollOffsetKey.self) { value in
                if value > 100 && !isRefreshing {
                    isRefreshing = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                        isRefreshing = false
                    }
                }
            }
        }
    }
}

struct ScrollOffsetKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        value = nextValue()
    }
}
```

### Interactive Card Stack
```swift
struct CardStack: View {
    @State private var cards = ["Card 1", "Card 2", "Card 3"]
    
    var body: some View {
        ZStack {
            ForEach(cards, id: \.self) { card in
                CardView(text: card)
                    .gesture(
                        DragGesture()
                            .onEnded { value in
                                if abs(value.translation.width) > 100 {
                                    withAnimation {
                                        cards.removeFirst()
                                    }
                                }
                            }
                    )
            }
        }
    }
}

struct CardView: View {
    let text: String
    
    var body: some View {
        RoundedRectangle(cornerRadius: 20)
            .fill(Color.blue)
            .frame(width: 300, height: 400)
            .overlay(Text(text).foregroundColor(.white))
    }
}
```

## Best Practices

### 1. Provide Visual Feedback
```swift
// ✅ Good - Visual feedback during drag
@State private var isDragging = false

Circle()
    .scaleEffect(isDragging ? 1.2 : 1.0)
    .gesture(
        DragGesture()
            .onChanged { _ in isDragging = true }
            .onEnded { _ in isDragging = false }
    )
```

### 2. Use Animations
```swift
// ✅ Good - Smooth animations
.onEnded { _ in
    withAnimation(.spring()) {
        offset = .zero
    }
}

// ❌ Avoid - Abrupt changes
.onEnded { _ in
    offset = .zero
}
```

### 3. Limit Values
```swift
// ✅ Good - Constrained scale
.onEnded { _ in
    if scale > 3.0 { scale = 3.0 }
    if scale < 0.5 { scale = 0.5 }
}
```

### 4. Reset State Appropriately
```swift
// ✅ Good - Clean state management
.onEnded { _ in
    withAnimation {
        offset = .zero
        isDragging = false
    }
}
```

## Summary

SwiftUI gestures enable rich interactions:

✅ **Tap** - Single and multiple taps  
✅ **Long Press** - Press and hold  
✅ **Drag** - Swipe and drag motions  
✅ **Magnification** - Pinch to zoom  
✅ **Rotation** - Two-finger rotation  
✅ **Combining** - Simultaneous, sequential, exclusive  

**Key Takeaways:**
- onTapGesture for simple interactions
- DragGesture for swipe and move interactions
- Combine gestures for complex interactions
- Use GestureState for temporary state
- Provide visual feedback during gestures
- Animate gesture state changes

---

**Next Steps:** Learn about **SwiftUI & UIKit Integration** to use UIKit components in SwiftUI! 🚀
