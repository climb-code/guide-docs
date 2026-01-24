---
title: "SwiftUI Forms & Input"
description: "Master form controls and user input in SwiftUI including TextField, Toggle, Picker, Stepper, and form validation"
---

Forms and input controls are essential for collecting user data in your apps. SwiftUI provides a rich set of form controls that are easy to use and beautifully styled. In this guide, you'll learn how to create forms, handle user input, and validate data.

## TextField

Text input for single-line text:

```swift
struct TextFieldExample: View {
    @State private var name = ""
    
    var body: some View {
        TextField("Enter your name", text: $name)
            .textFieldStyle(.roundedBorder)
            .padding()
    }
}
```

**With Placeholder:**
```swift
@State private var email = ""

TextField("Email address", text: $email)
    .textFieldStyle(.roundedBorder)
    .keyboardType(.emailAddress)
    .autocapitalization(.none)
```

**Styled TextField:**
```swift
TextField("Username", text: $username)
    .padding()
    .background(Color.gray.opacity(0.1))
    .cornerRadius(10)
    .overlay(
        RoundedRectangle(cornerRadius: 10)
            .stroke(Color.blue, lineWidth: 1)
    )
```

### Keyboard Types
```swift
TextField("Email", text: $email)
    .keyboardType(.emailAddress)

TextField("Phone", text: $phone)
    .keyboardType(.phonePad)

TextField("Number", text: $number)
    .keyboardType(.numberPad)

TextField("Decimal", text: $decimal)
    .keyboardType(.decimalPad)

TextField("URL", text: $url)
    .keyboardType(.URL)
```

### Text Input Modifiers
```swift
TextField("Name", text: $name)
    .autocapitalization(.words)
    .disableAutocorrection(true)
    .submitLabel(.done)
```

## SecureField

Password input with hidden characters:

```swift
@State private var password = ""

SecureField("Password", text: $password)
    .textFieldStyle(.roundedBorder)
    .padding()
```

**Toggle Password Visibility:**
```swift
struct PasswordField: View {
    @State private var password = ""
    @State private var isSecure = true
    
    var body: some View {
        HStack {
            if isSecure {
                SecureField("Password", text: $password)
            } else {
                TextField("Password", text: $password)
            }
            
            Button(action: { isSecure.toggle() }) {
                Image(systemName: isSecure ? "eye.slash" : "eye")
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .background(Color.gray.opacity(0.1))
        .cornerRadius(8)
    }
}
```

## TextEditor

Multi-line text input:

```swift
@State private var notes = ""

TextEditor(text: $notes)
    .frame(height: 200)
    .padding(4)
    .background(Color.gray.opacity(0.1))
    .cornerRadius(8)
```

**With Placeholder:**
```swift
struct MultiLineTextField: View {
    @State private var text = ""
    
    var body: some View {
        ZStack(alignment: .topLeading) {
            if text.isEmpty {
                Text("Enter your notes...")
                    .foregroundColor(.gray)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 12)
            }
            
            TextEditor(text: $text)
                .padding(4)
                .opacity(text.isEmpty ? 0.6 : 1)
        }
        .frame(height: 200)
        .background(Color.gray.opacity(0.1))
        .cornerRadius(8)
    }
}
```

## Toggle

Boolean on/off switch:

```swift
@State private var isOn = false

Toggle("Notifications", isOn: $isOn)
    .padding()
```

**Custom Style:**
```swift
Toggle("Dark Mode", isOn: $isDarkMode)
    .toggleStyle(SwitchToggleStyle(tint: .purple))

// Different styles
Toggle("Option 1", isOn: $option1)
    .toggleStyle(.switch)  // Default

Toggle("Option 2", isOn: $option2)
    .toggleStyle(.button)  // Button style
```

**With Label:**
```swift
Toggle(isOn: $isEnabled) {
    VStack(alignment: .leading) {
        Text("Enable Feature")
            .font(.headline)
        Text("This enables the special feature")
            .font(.caption)
            .foregroundColor(.gray)
    }
}
```

## Picker

Select from a list of options:

```swift
@State private var selectedColor = "Red"
let colors = ["Red", "Green", "Blue", "Purple"]

Picker("Color", selection: $selectedColor) {
    ForEach(colors, id: \.self) { color in
        Text(color)
    }
}
.pickerStyle(.automatic)
```

### Picker Styles

**Menu Style:**
```swift
Picker("Favorite Color", selection: $selectedColor) {
    ForEach(colors, id: \.self) { color in
        Text(color).tag(color)
    }
}
.pickerStyle(.menu)
```

**Segmented Style:**
```swift
Picker("Size", selection: $selectedSize) {
    Text("Small").tag("S")
    Text("Medium").tag("M")
    Text("Large").tag("L")
}
.pickerStyle(.segmented)
.padding()
```

**Wheel Style:**
```swift
Picker("Age", selection: $selectedAge) {
    ForEach(18..<100) { age in
        Text("\(age)").tag(age)
    }
}
.pickerStyle(.wheel)
.frame(height: 150)
```

**Navigation Link Style:**
```swift
Form {
    Picker("Country", selection: $selectedCountry) {
        ForEach(countries, id: \.self) { country in
            Text(country)
        }
    }
}
```

## DatePicker

Select dates and times:

```swift
@State private var selectedDate = Date()

DatePicker("Select Date", selection: $selectedDate)
    .padding()
```

**Display Components:**
```swift
// Date only
DatePicker("Birthday", selection: $birthday, displayedComponents: .date)

// Time only
DatePicker("Time", selection: $time, displayedComponents: .hourAndMinute)

// Both date and time
DatePicker("Date & Time", selection: $dateTime, displayedComponents: [.date, .hourAndMinute])
```

**Date Range:**
```swift
let tomorrow = Calendar.current.date(byAdding: .day, value: 1, to: Date())!
let nextYear = Calendar.current.date(byAdding: .year, value: 1, to: Date())!

DatePicker(
    "Select Date",
    selection: $selectedDate,
    in: tomorrow...nextYear  // Only allow dates between tomorrow and next year
)
```

**Compact Style:**
```swift
DatePicker("Date", selection: $date)
    .datePickerStyle(.compact)

DatePicker("Date", selection: $date)
    .datePickerStyle(.graphical)

DatePicker("Date", selection: $date)
    .datePickerStyle(.wheel)
```

## Stepper

Increment/decrement numeric values:

```swift
@State private var quantity = 0

Stepper("Quantity: \(quantity)", value: $quantity)
    .padding()
```

**With Range:**
```swift
@State private var age = 25

Stepper("Age: \(age)", value: $age, in: 0...120)
```

**With Step:**
```swift
@State private var price = 0.0

Stepper("Price: $\(price, specifier: "%.2f")", 
        value: $price, 
        in: 0...1000, 
        step: 0.50)
```

**Custom Label:**
```swift
Stepper(value: $rating, in: 1...5) {
    HStack {
        Text("Rating:")
        ForEach(0..<rating, id: \.self) { _ in
            Image(systemName: "star.fill")
                .foregroundColor(.yellow)
        }
    }
}
```

## Slider

Select value from a range:

```swift
@State private var volume = 0.5

Slider(value: $volume)
    .padding()
```

**With Range and Label:**
```swift
Slider(value: $brightness, in: 0...100) {
    Text("Brightness")
}
.padding()
```

**With Min/Max Labels:**
```swift
Slider(value: $volume, in: 0...100) {
    Text("Volume")
} minimumValueLabel: {
    Image(systemName: "speaker.fill")
} maximumValueLabel: {
    Image(systemName: "speaker.wave.3.fill")
}
.padding()
```

**With Step:**
```swift
@State private var rating = 3.0

Slider(value: $rating, in: 1...5, step: 0.5) {
    Text("Rating: \(rating, specifier: "%.1f")")
}
```

## ColorPicker

Select colors:

```swift
@State private var selectedColor = Color.blue

ColorPicker("Pick a color", selection: $selectedColor)
    .padding()

// Preview the selected color
Circle()
    .fill(selectedColor)
    .frame(width: 100, height: 100)
```

## Button

Trigger actions:

```swift
Button("Submit") {
    print("Button tapped")
}

// With custom styling
Button(action: {
    print("Custom button")
}) {
    Text("Custom Button")
        .font(.headline)
        .foregroundColor(.white)
        .padding()
        .background(Color.blue)
        .cornerRadius(10)
}
```

**Button Styles:**
```swift
Button("Bordered") { }
    .buttonStyle(.bordered)

Button("Prominent") { }
    .buttonStyle(.borderedProminent)

Button("Plain") { }
    .buttonStyle(.plain)
```

## Form Container

Group input controls in a form:

```swift
struct UserForm: View {
    @State private var name = ""
    @State private var email = ""
    @State private var age = 25
    @State private var newsletter = false
    
    var body: some View {
        Form {
            Section("Personal Info") {
                TextField("Name", text: $name)
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                Stepper("Age: \(age)", value: $age, in: 18...100)
            }
            
            Section("Preferences") {
                Toggle("Subscribe to newsletter", isOn: $newsletter)
            }
            
            Section {
                Button("Submit") {
                    submitForm()
                }
            }
        }
    }
    
    func submitForm() {
        print("Submitting: \(name), \(email), \(age)")
    }
}
```

## Input Validation

### Basic Validation
```swift
struct ValidatedForm: View {
    @State private var email = ""
    
    var isValidEmail: Bool {
        email.contains("@") && email.contains(".")
    }
    
    var body: some View {
        VStack {
            TextField("Email", text: $email)
                .textFieldStyle(.roundedBorder)
                .padding()
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(isValidEmail ? Color.green : Color.red, lineWidth: 1)
                )
            
            if !isValidEmail && !email.isEmpty {
                Text("Please enter a valid email")
                    .foregroundColor(.red)
                    .font(.caption)
            }
            
            Button("Submit") {
                if isValidEmail {
                    print("Valid email submitted")
                }
            }
            .disabled(!isValidEmail)
        }
        .padding()
    }
}
```

### Password Strength Validator
```swift
struct PasswordValidator: View {
    @State private var password = ""
    
    var passwordStrength: String {
        if password.count < 6 { return "Weak" }
        if password.count < 10 { return "Medium" }
        return "Strong"
    }
    
    var strengthColor: Color {
        switch passwordStrength {
        case "Weak": return .red
        case "Medium": return .orange
        default: return .green
        }
    }
    
    var body: some View {
        VStack(alignment: .leading) {
            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)
            
            if !password.isEmpty {
                HStack {
                    Text("Strength: ")
                    Text(passwordStrength)
                        .foregroundColor(strengthColor)
                        .bold()
                }
                .font(.caption)
            }
        }
        .padding()
    }
}
```

## Complete Form Example

```swift
struct RegistrationForm: View {
    @State private var username = ""
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var age = 18
    @State private var country = "USA"
    @State private var agreedToTerms = false
    @State private var showingAlert = false
    
    let countries = ["USA", "UK", "Canada", "Australia"]
    
    var isFormValid: Bool {
        !username.isEmpty &&
        email.contains("@") &&
        password.count >= 8 &&
        password == confirmPassword &&
        agreedToTerms
    }
    
    var body: some View {
        NavigationView {
            Form {
                Section("Account Information") {
                    TextField("Username", text: $username)
                        .autocapitalization(.none)
                    
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                }
                
                Section("Password") {
                    SecureField("Password", text: $password)
                    SecureField("Confirm Password", text: $confirmPassword)
                    
                    if !confirmPassword.isEmpty && password != confirmPassword {
                        Text("Passwords don't match")
                            .foregroundColor(.red)
                            .font(.caption)
                    }
                }
                
                Section("Personal Details") {
                    Stepper("Age: \(age)", value: $age, in: 18...120)
                    
                    Picker("Country", selection: $country) {
                        ForEach(countries, id: \.self) { country in
                            Text(country)
                        }
                    }
                }
                
                Section {
                    Toggle("I agree to Terms & Conditions", isOn: $agreedToTerms)
                }
                
                Section {
                    Button("Register") {
                        showingAlert = true
                    }
                    .disabled(!isFormValid)
                }
            }
            .navigationTitle("Registration")
            .alert("Success", isPresented: $showingAlert) {
                Button("OK", role: .cancel) { }
            } message: {
                Text("Registration successful!")
            }
        }
    }
}
```

## Focus Management

Control which field has focus:

```swift
struct FocusExample: View {
    @State private var username = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?
    
    enum Field {
        case username
        case password
    }
    
    var body: some View {
        VStack {
            TextField("Username", text: $username)
                .textFieldStyle(.roundedBorder)
                .focused($focusedField, equals: .username)
                .submitLabel(.next)
                .onSubmit {
                    focusedField = .password
                }
            
            SecureField("Password", text: $password)
                .textFieldStyle(.roundedBorder)
                .focused($focusedField, equals: .password)
                .submitLabel(.done)
            
            Button("Clear & Focus Username") {
                username = ""
                password = ""
                focusedField = .username
            }
        }
        .padding()
    }
}
```

## Best Practices

### 1. Use Appropriate Input Types
```swift
// ✅ Good - Correct keyboard for email
TextField("Email", text: $email)
    .keyboardType(.emailAddress)

// ❌ Avoid - Wrong keyboard type
TextField("Email", text: $email)
    // Uses default text keyboard
```

### 2. Provide Clear Labels
```swift
// ✅ Good - Clear, descriptive
TextField("Email address", text: $email)

// ❌ Avoid - Vague
TextField("Input", text: $email)
```

### 3. Validate Input
```swift
// ✅ Good - Validate before submission
Button("Submit") {
    submitForm()
}
.disabled(!isFormValid)

// ❌ Avoid - No validation
Button("Submit") {
    submitForm()  // Always enabled
}
```

### 4. Use Forms for Grouped Inputs
```swift
// ✅ Good - Organized in form
Form {
    Section("Contact") {
        TextField("Email", text: $email)
        TextField("Phone", text: $phone)
    }
}

// ❌ Avoid - Scattered inputs
VStack {
    TextField("Email",text: $email)
    TextField("Phone", text: $phone)
}
```

## Summary

SwiftUI provides powerful form controls:

✅ **TextField** - Single-line text input  
✅ **SecureField** - Password input  
✅ **TextEditor** - Multi-line text  
✅ **Toggle** - Boolean switches  
✅ **Picker** - Selection from options  
✅ **DatePicker** - Date and time selection  
✅ **Slider** - Range value selection  
✅ **Form** - Group related inputs  

**Key Takeaways:**
- Use appropriate keyboard types for input fields
- Validate user input before submission
- Provide clear feedback on validation errors
- Use Form for organized input groups
- Disable submit until form is valid
- Manage focus for better UX

---

**Next Steps:** Learn about **SwiftUI Images & Media** to display rich content in your apps! 🚀
