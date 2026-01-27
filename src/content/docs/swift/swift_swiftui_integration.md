---
title: "SwiftUI & UIKit Integration"
description: "Learn to integrate UIKit components in SwiftUI using UIViewRepresentable and UIViewControllerRepresentable"
---

While SwiftUI is powerful, sometimes you need to use UIKit components. Whether it's accessing UIKit-only features or using existing UIKit code, SwiftUI makes integration seamless. In this guide, you'll learn how to wrap UIKit views and view controllers for use in SwiftUI.

## UIViewRepresentable

Wrap UIKit views for use in SwiftUI:

### Basic Example - UILabel
```swift
import SwiftUI
import UIKit

struct UILabelWrapper: UIViewRepresentable {
    let text: String
    
    func makeUIView(context: Context) -> UILabel {
        let label = UILabel()
        label.textAlignment = .center
        return label
    }
    
    func updateUIView(_ uiView: UILabel, context: Context) {
        uiView.text = text
    }
}

// Usage
struct ContentView: View {
    var body: some View {
        UILabelWrapper(text: "Hello from UIKit!")
            .frame(height: 50)
    }
}
```

### UIActivityIndicatorView
```swift
struct ActivityIndicator: UIViewRepresentable {
    @Binding var isAnimating: Bool
    let style: UIActivityIndicatorView.Style
    
    func makeUIView(context: Context) -> UIActivityIndicatorView {
        let indicator = UIActivityIndicatorView(style: style)
        return indicator
    }
    
    func updateUIView(_ uiView: UIActivityIndicatorView, context: Context) {
        if isAnimating {
            uiView.startAnimating()
        } else {
            uiView.stopAnimating()
        }
    }
}

// Usage
struct LoadingView: View {
    @State private var isLoading = true
    
    var body: some View {
        VStack {
            ActivityIndicator(isAnimating: $isLoading, style: .large)
            
            Button("Toggle") {
                isLoading.toggle()
            }
        }
    }
}
```

### UITextField with Keyboard Dismiss
```swift
struct UITextFieldWrapper: UIViewRepresentable {
    @Binding var text: String
    let placeholder: String
    
    func makeUIView(context: Context) -> UITextField {
        let textField = UITextField()
        textField.placeholder = placeholder
        textField.delegate = context.coordinator
        
        // Add toolbar with done button
        let toolbar = UIToolbar()
        toolbar.sizeToFit()
        let doneButton = UIBarButtonItem(
            title: "Done",
            style: .done,
            target: context.coordinator,
            action: #selector(Coordinator.dismissKeyboard)
        )
        toolbar.items = [
            UIBarButtonItem(systemItem: .flexibleSpace),
            doneButton
        ]
        textField.inputAccessoryView = toolbar
        
        return textField
    }
    
    func updateUIView(_ uiView: UITextField, context: Context) {
        uiView.text = text
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(text: $text)
    }
    
    class Coordinator: NSObject, UITextFieldDelegate {
        @Binding var text: String
        
        init(text: Binding<String>) {
            _text = text
        }
        
        func textFieldDidChangeSelection(_ textField: UITextField) {
            text = textField.text ?? ""
        }
        
        @objc func dismissKeyboard() {
            UIApplication.shared.sendAction(
                #selector(UIResponder.resignFirstResponder),
                to: nil,
                from: nil,
                for: nil
            )
        }
    }
}
```

### WKWebView
```swift
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL
    
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.navigationDelegate = context.coordinator
        return webView
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        webView.load(request)
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    class Coordinator: NSObject, WKNavigationDelegate {
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            print("Page loaded")
        }
    }
}

// Usage
struct BrowserView: View {
    var body: some View {
        WebView(url: URL(string: "https://www.apple.com")!)
            .edgesIgnoringSafeArea(.all)
    }
}
```

### MapKit Integration
```swift
import MapKit

struct MapView: UIViewRepresentable {
    @Binding var region: MKCoordinateRegion
    
    func makeUIView(context:Context) -> MKMapView {
        let mapView = MKMapView()
        mapView.delegate = context.coordinator
        return mapView
    }
    
    func updateUIView(_ mapView: MKMapView, context: Context) {
        mapView.setRegion(region, animated: true)
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, MKMapViewDelegate {
        var parent: MapView
        
        init(_ parent: MapView) {
            self.parent = parent
        }
        
        func mapView(_ mapView: MKMapView, regionDidChangeAnimated animated: Bool) {
            parent.region = mapView.region
        }
    }
}

// Usage
struct MapContainerView: View {
    @State private var region = MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 37.7749, longitude: -122.4194),
        span: MKCoordinateSpan(latitudeDelta: 0.1, longitudeDelta: 0.1)
    )
    
    var body: some View {
        MapView(region: $region)
            .edgesIgnoringSafeArea(.all)
    }
}
```

## UIViewControllerRepresentable

Wrap UIKit view controllers:

### UIImagePickerController
```swift
struct ImagePicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?
    @Environment(\.presentationMode) var presentationMode
    
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {
        // No updates needed
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        let parent: ImagePicker
        
        init(_ parent: ImagePicker) {
            self.parent = parent
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let image = info[.originalImage] as? UIImage {
                parent.image = image
            }
            parent.presentationMode.wrappedValue.dismiss()
        }
        
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            parent.presentationMode.wrappedValue.dismiss()
        }
    }
}

// Usage
struct ImagePickerView: View {
    @State private var image: UIImage?
    @State private var showPicker = false
    
    var body: some View {
        VStack {
            if let image = image {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 300)
            }
            
            Button("Select Image") {
                showPicker = true
            }
        }
        .sheet(isPresented: $showPicker) {
            ImagePicker(image: $image)
        }
    }
}
```

### UIDocumentPickerViewController
```swift
struct DocumentPicker: UIViewControllerRepresentable {
    @Binding var fileURL: URL?
    
    func makeUIViewController(context: Context) -> UIDocumentPickerViewController {
        let picker = UIDocumentPickerViewController(forOpeningContentTypes: [.pdf, .text])
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIDocumentPickerViewController, context: Context) {
        // No updates needed
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: NSObject, UIDocumentPickerDelegate {
        let parent: DocumentPicker
        
        init(_ parent: DocumentPicker) {
            self.parent = parent
        }
        
        func documentPicker(_ controller: UIDocumentPickerViewController, didPickDocumentsAt urls: [URL]) {
            parent.fileURL = urls.first
        }
    }
}
```

### UIActivityViewController (Share Sheet)
```swift
struct ShareSheet: UIViewControllerRepresentable {
    let items: [Any]
    
    func makeUIViewController(context: Context) -> UIActivityViewController {
        let controller = UIActivityViewController(
            activityItems: items,
            applicationActivities: nil
        )
        return controller
    }
    
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {
        // No updates needed
    }
}

// Usage
struct ShareView: View {
    @State private var showShare = false
    
    var body: some View {
        Button("Share") {
            showShare = true
        }
        .sheet(isPresented: $showShare) {
            ShareSheet(items: ["Check out this app!"])
        }
    }
}
```

## Coordinator Pattern

The coordinator acts as a bridge between SwiftUI and UIKit:

```swift
struct CustomView: UIViewRepresentable {
    @Binding var data: String
    
    func makeUIView(context: Context) -> UIView {
        let view = UIView()
        // Setup view
        return view
    }
    
    func updateUIView(_ uiView: UIView, context: Context) {
        // Update view when data changes
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(data: $data)
    }
    
    class Coordinator: NSObject {
        @Binding var data: String
        
        init(data: Binding<String>) {
            _data = data
        }
        
        // Handle UIKit delegate methods
    }
}
```

## SwiftUI in UIKit (Reverse Integration)

Use SwiftUI views in UIKit:

```swift
import SwiftUI
import UIKit

// SwiftUI View
struct MySwiftUIView: View {
    var body: some View {
        VStack {
            Text("SwiftUI in UIKit")
                .font(.title)
            Button("Tap Me") {
                print("Tapped")
            }
        }
        .padding()
    }
}

// UIKit ViewController
class MyViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Create hosting controller
        let swiftUIView = MySwiftUIView()
        let hostingController = UIHostingController(rootView: swiftUIView)
        
        // Add as child
        addChild(hostingController)
        view.addSubview(hostingController.view)
        
        // Setup constraints
        hostingController.view.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            hostingController.view.topAnchor.constraint(equalTo: view.topAnchor),
            hostingController.view.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            hostingController.view.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            hostingController.view.bottomAnchor.constraint(equalTo: view.bottomAnchor)
        ])
        
        hostingController.didMove(toParent: self)
    }
}
```

## Best Practices

### 1. Use Coordinator for Delegates
```swift
// ✅ Good - Coordinator handles delegates
class Coordinator: NSObject, UITextFieldDelegate {
    @Binding var text: String
    
    func textFieldDidChangeSelection(_ textField: UITextField) {
        text = textField.text ?? ""
    }
}
```

### 2. Update Only When Necessary
```swift
// ✅ Good - Check before updating
func updateUIView(_ uiView: UILabel, context: Context) {
    if uiView.text != text {
        uiView.text = text
    }
}
```

### 3. Clean Up Resources
```swift
// ✅ Good - Cleanup when view disappears
func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
    // Remove observers, cancel tasks, etc.
}
```

### 4. Handle Lifecycle Properly
```swift
//✅ Good - Proper lifecycle management
func makeUIView(context: Context) -> UIView {
    // Create and configure view
}

func updateUIView(_ uiView: UIView, context: Context) {
    // Update view based on SwiftUI state
}

static func dismantleUIView(_ uiView: UIView, coordinator: Coordinator) {
    // Cleanup
}
```

## Summary

SwiftUI and UIKit integration is seamless:

✅ **UIViewRepresentable** - Wrap UIKit views  
✅ **UIViewControllerRepresentable** - Wrap UIKit view controllers  
✅ **Coordinator** - Bridge between SwiftUI and UIKit  
✅ **UIHostingController** - SwiftUI in UIKit apps  
✅ **Bidirectional** - Use either in the other  

**Key Takeaways:**
- Use `UIViewRepresentable` for UIKit views
- Use `UIViewControllerRepresentable` for view controllers
- Coordinator pattern for delegates and callbacks
- `makeUIView`/`makeUIViewController` for creation
- `updateUIView`/`updateUIViewController` for updates
- `UIHostingController` to use SwiftUI in UIKit

---

**Congratulations!** 🎉 You now have a complete understanding of SwiftUI, from basics to UIKit integration! You're ready to build amazing iOS apps!
