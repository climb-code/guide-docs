---
title: "SwiftUI Images & Media"
description: "Master working with images, async loading, SF Symbols, and media in SwiftUI"
---

Images and media are crucial for creating engaging user interfaces. SwiftUI makes it easy to display images, load them asynchronously, work with system icons, and handle various image formats. In this guide, you'll learn everything about images and media in SwiftUI.

## Image Basics

### Display Local Images
```swift
// Image from assets catalog
Image("photo-name")
    .resizable()
    .frame(width: 200, height: 200)

// Without resizable, image displays at natural size
Image("logo")
```

### SF Symbols (System Icons)
```swift
Image(systemName: "heart.fill")
    .foregroundColor(.red)
    .font(.largeTitle)

Image(systemName: "star.fill")
    .imageScale(.large)
    .foreground

Color(.yellow)
```

## Resizable Modifier

Make images scale to fit:

```swift
Image("photo")
    .resizable()
    .frame(width: 300, height: 200)

// Without resizable, frame has no effect on image size
```

## Aspect Ratio

Control how images fit within frames:

```swift
// Fit - entire image visible
Image("photo")
    .resizable()
    .aspectRatio(contentMode: .fit)
    .frame(width: 300, height: 200)

// Fill - fills frame, may crop
Image("photo")
    .resizable()
    .aspectRatio(contentMode: .fill)
    .frame(width: 300, height: 200)
    .clipped()  // Clip overflowing parts

// Specific aspect ratio
Image("photo")
    .resizable()
    .aspectRatio(16/9, contentMode: .fit)
```

## Scaling Images

```swift
// Scale to fit container
Image("photo")
    .resizable()
    .scaledToFit()
    .frame(width: 300)

// Scale to fill container
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 300, height: 200)
    .clipped()
```

## Image Shapes

Clip images to shapes:

```swift
// Circle
Image("profile")
    .resizable()
    .scaledToFill()
    .frame(width: 100, height: 100)
    .clipShape(Circle())

// Rounded rectangle
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 200, height: 150)
    .clipShape(RoundedRectangle(cornerRadius: 20))

// Capsule
Image("banner")
    .resizable()
    .scaledToFill()
    .frame(width: 300, height: 100)
    .clipShape(Capsule())
```

## AsyncImage

Load images from URLs:

```swift
// Basic async loading
AsyncImage(url: URL(string: "https://example.com/image.jpg"))
    .frame(width: 200, height: 200)

// With scale parameter
AsyncImage(url: URL(string: "https://example.com/image.jpg"), scale: 2.0)
```

### With Custom Content
```swift
AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in
    image
        .resizable()
        .scaledToFit()
} placeholder: {
    ProgressView()
}
.frame(width: 200, height: 200)
```

### With Phase Handling
```swift
AsyncImage(url: URL(string: "https://example.com/image.jpg")) { phase in
    switch phase {
    case .empty:
        ProgressView()
    case .success(let image):
        image
            .resizable()
            .scaledToFit()
    case .failure:
        Image(systemName: "photo")
            .foregroundColor(.gray)
    @unknown default:
        EmptyView()
    }
}
.frame(width: 200, height: 200)
```

### Complete AsyncImage Example
```swift
struct AsyncImageExample: View {
    let imageURL = "https://picsum.photos/200/300"
    
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { phase in
            if let image = phase.image {
                image
                    .resizable()
                    .scaledToFill()
                    .frame(width: 200, height: 300)
                    .clipShape(RoundedRectangle(cornerRadius: 15))
                    .shadow(radius: 10)
            } else if phase.error != nil {
                VStack {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.largeTitle)
                    Text("Failed to load")
                        .font(.caption)
                }
                .frame(width: 200, height: 300)
                .background(Color.gray.opacity(0.2))
                .cornerRadius(15)
            } else {
                ZStack {
                    Color.gray.opacity(0.2)
                    ProgressView()
                }
                .frame(width: 200, height: 300)
                .cornerRadius(15)
            }
        }
    }
}
```

## Image Rendering Modes

```swift
// Original (default)
Image("icon")
    .renderingMode(.original)

// Template (tintable)
Image("icon")
    .renderingMode(.template)
    .foregroundColor(.blue)

Image(systemName: "heart.fill")
    .renderingMode(.template)
    .foregroundColor(.red)
```

## Image Interpolation

Control how images are scaled:

```swift
Image("pixel-art")
    .interpolation(.none)  // Pixelated, no smoothing
    .resizable()
    .scaledToFit()

Image("photo")
    .interpolation(.high)  // Smooth scaling
    .resizable()
    .scaledToFit()
```

## Image Overlay & Background

```swift
// Overlay
Image("photo")
    .resizable()
    .scaledToFit()
    .overlay(
        Text("Overlay Text")
            .font(.headline)
            .foregroundColor(.white)
            .padding(),
        alignment: .bottom
    )

// Background
Text("Text on Image")
    .font(.largeTitle)
    .foregroundColor(.white)
    .padding()
    .background(
        Image("background")
            .resizable()
            .scaledToFill()
    )
```

## SF Symbols Variants

```swift
// Different variants
Image(systemName: "heart")       // Outline
Image(systemName: "heart.fill")  // Filled

// Multicolor
Image(systemName: "folder.fill.badge.plus")
    .symbolRenderingMode(.multicolor)

// Hierarchical
Image(systemName: "cloud.sun.rain.fill")
    .symbolRenderingMode(.hierarchical)
    .foregroundColor(.blue)

// Palette
Image(systemName: "person.3.fill")
    .symbolRenderingMode(.palette)
    .foregroundStyle(.blue, .green, .red)
```

## Custom Image Processing

```swift
// Grayscale
Image("photo")
    .resizable()
    .scaledToFit()
    .grayscale(1.0)

// Blur
Image("photo")
    .resizable()
    .scaledToFit()
    .blur(radius: 5)

// Saturation
Image("photo")
    .resizable()
    .scaledToFit()
    .saturation(2.0)

// Contrast
Image("photo")
    .resizable()
    .scaledToFit()
    .contrast(1.5)

// Brightness
Image("photo")
    .resizable()
    .scaledToFit()
    .brightness(0.2)
```

## Image Grid

Display multiple images in a grid:

```swift
struct ImageGrid: View {
    let images = ["photo1", "photo2", "photo3", "photo4"]
    let columns = [
        GridItem(.flexible()),
        GridItem(.flexible())
    ]
    
    var body: some View {
        ScrollView {
            LazyVGrid(columns: columns, spacing: 10) {
                ForEach(images, id: \.self) { imageName in
                    Image(imageName)
                        .resizable()
                        .scaledToFill()
                        .frame(width: 150, height: 150)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                }
            }
            .padding()
        }
    }
}
```

##Practical Examples

### Profile Picture
```swift
struct ProfilePicture: View {
    let imageURL: String
    let size: CGFloat = 80
    
    var body: some View {
        AsyncImage(url: URL(string: imageURL)) { phase in
            if let image = phase.image {
                image
                    .resizable()
                    .scaledToFill()
            } else {
                Image(systemName: "person.circle.fill")
                    .resizable()
                    .foregroundColor(.gray)
            }
        }
        .frame(width: size, height: size)
        .clipShape(Circle())
        .overlay(Circle().stroke(Color.white, lineWidth: 2))
        .shadow(radius: 3)
    }
}
```

### Image Card
```swift
struct ImageCard: View {
    let imageURL: String
    let title: String
    let subtitle: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            AsyncImage(url: URL(string: imageURL)) { image in
                image
                    .resizable()
                    .scaledToFill()
            } placeholder: {
                Color.gray.opacity(0.3)
            }
            .frame(height: 200)
            .clipped()
            
            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                Text(subtitle)
                    .font(.subheadline)
                    .foregroundColor(.gray)
            }
            .padding()
        }
        .background(Color.white)
        .cornerRadius(12)
        .shadow(radius: 5)
    }
}
```

### Banner Image
```swift
struct BannerImage: View {
    var body: some View {
        ZStack(alignment: .bottomLeading) {
            Image("banner")
                .resizable()
                .scaledToFill()
                .frame(height: 250)
                .clipped()
            
            LinearGradient(
                colors: [.clear, .black.opacity(0.7)],
                startPoint: .top,
                endPoint: .bottom
            )
            
            VStack(alignment: .leading) {
                Text("Featured")
                    .font(.title)
                    .bold()
                Text("Discover amazing content")
                    .font(.subheadline)
            }
            .foregroundColor(.white)
            .padding()
        }
    }
}
```

## Best Practices

### 1. Always Make Images Resizable
```swift
// ✅ Good - Resizable for flexible sizing
Image("photo")
    .resizable()
    .scaledToFit()

// ❌ Avoid - Fixed at natural size
Image("photo")
```

### 2. Use Async Loading for Remote Images
```swift
// ✅ Good - Async with placeholder
AsyncImage(url: URL(string: imageURL)) { phase in
    if let image = phase.image {
        image.resizable().scaledToFit()
    } else {
        ProgressView()
    }
}

// ❌ Avoid - Blocking main thread
// Loading images synchronously
```

### 3. Clip Filled Images
```swift
// ✅ Good - Clipped to prevent overflow
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 200, height: 200)
    .clipped()

// ❌ Avoid - Image overflows frame
Image("photo")
    .resizable()
    .scaledToFill()
    .frame(width: 200, height: 200)
```

### 4. Use SF Symbols for Icons
```swift
// ✅ Good - Scalable system icons
Image(systemName: "heart.fill")
    .font(.largeTitle)

// ❌ Avoid - Custom image for simple icons
Image("heart-icon")
```

## Summary

SwiftUI provides powerful image handling:

✅ **Image** - Display local images and SF Symbols  
✅ **AsyncImage** - Load remote images asynchronously  
✅ **Resizable** - Scale images to fit  
✅ **AspectRatio** - Control image fitting  
✅ **ClipShape** - Clip to custom shapes  
✅ **SF Symbols** - 5000+ scalable system icons  

**Key Takeaways:**
- Use `.resizable()` for flexible image sizing
- `AsyncImage` for loading remote images
- `.scaledToFit()` or `.scaledToFill()` for aspect ratio
- Clip filled images to prevent overflow
- SF Symbols for consistent, scalable icons
- Handle loading states in AsyncImage

---

**Next Steps:** Learn about **SwiftUI Gestures** to make your images and views interactive! 🚀
