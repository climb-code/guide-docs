---
title: CSS Form Controls
description: Style inputs, selects, checkboxes, and buttons while preserving clear labels and focus states.
---

Form controls need to be easy to read and operate with a mouse, keyboard, or touch screen. CSS can give them a consistent appearance while keeping their built-in behavior.

## Style text fields consistently

Start with a visible label for each control. Use a class for shared field styles so checkboxes, file inputs, and buttons do not accidentally inherit text-field sizing.

```html
<form class="contact-form">
  <div class="field">
    <label for="email">Email address</label>
    <input class="text-control" id="email" name="email" type="email" required />
  </div>

  <div class="field">
    <label for="message">Message</label>
    <textarea class="text-control" id="message" name="message" rows="5"></textarea>
  </div>

  <button class="submit-button" type="submit">Send message</button>
</form>
```

```css
.contact-form {
  max-width: 32rem;
  display: grid;
  gap: 1.25rem;
}

.field {
  display: grid;
  gap: 0.4rem;
}

.text-control {
  box-sizing: border-box;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid #64748b;
  border-radius: 0.4rem;
  background: #fff;
  color: #0f172a;
  font: inherit;
}

textarea.text-control {
  resize: vertical;
}
```

`font: inherit` helps native controls match the surrounding text. `box-sizing: border-box` keeps a `width: 100%` field inside its container after padding and borders are added.

## Keep focus visible

People using a keyboard need a clear sign of which control is active. A text field can show a focus ring on focus; a button can use `:focus-visible` so keyboard focus is clear without showing the ring after every pointer click.

```css
.text-control:focus {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

.submit-button:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}
```

Do not remove the browser's default outline unless you replace it with an equally visible focus style. See [CSS Accessibility](/css/css-accessibility/) for more keyboard and contrast guidance.

## Style selection controls

`accent-color` changes the accent of native checkboxes and radio buttons without rebuilding them from scratch.

```html
<label class="choice">
  <input type="checkbox" name="updates" />
  Email me occasional updates
</label>
```

```css
.choice {
  display: flex;
  align-items: start;
  gap: 0.6rem;
}

.choice input {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #1d4ed8;
}
```

The label text is clickable because the input is inside the `<label>` element. Keep the native checkbox so it retains keyboard and assistive technology behavior.

## Show errors and disabled states

Use `:invalid` to style a field that fails HTML validation. A required empty field can match `:invalid` even before the user submits the form, so decide when to reveal any error message in the form's behavior as well as its CSS.

```css
.text-control:invalid {
  border-color: #b91c1c;
}

.text-control:disabled,
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

Pair an error color with a text message that explains the problem. Color alone does not tell every visitor what needs fixing.

## Common mistakes

- Using a placeholder as the only label. It disappears when the user types and may not explain the field clearly.
- Removing outlines without adding a visible focus style.
- Applying text-input styles to every `input` type, including checkboxes and file inputs.
- Relying only on red borders to communicate validation errors.
- Disabling a submit button without explaining why the form cannot be submitted.

## Further reading

See [MDN's form styling guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Styling_web_forms) for native control behavior and additional examples.
