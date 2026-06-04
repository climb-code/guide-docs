---
title: Advanced Server Actions
description: Master React Server Actions for data mutations, pending states, optimistic updates, and form status in Next.js.
---

**Server Actions** are asynchronous functions that run on the server. They can be defined inside Server Components or in separate files to handle form submissions, data mutations, and backend logic directly without manually creating API endpoints.

---

## 1. Defining Server Actions

To declare a Server Action, use the **`'use server'`** directive.

- **Inside a Server Component**: Add `'use server'` at the top of the function body.
- **In a separate file**: Add `'use server'` at the very top of the file. All exported functions from this file are treated as Server Actions and can be imported into both Client and Server Components.

### Example: Dedicated Actions File
```tsx
// app/actions.ts
'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function addSubscribeEmail(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    throw new Error('Invalid email address');
  }

  await db.subscribeUser(email);
  revalidatePath('/'); // Clear cache of the home page
}
```

---

## 2. Managing Form State and Status

To improve user experience, React and Next.js provide hooks to manage submission status and responses from Server Actions.

### A. Action Pending Status with `useFormStatus`
The `useFormStatus` hook returns status information of the parent form submission. 

> [!NOTE]
> `useFormStatus` must be used within a component that is rendered **inside** a `<form>` element (nested as a child).

```tsx
// components/SubmitButton.tsx
'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Subscribing...' : 'Subscribe'}
    </button>
  );
}
```

### B. Action State with `useActionState` (or `useFormState`)
`useActionState` (available in React 19 / newer Next.js versions, previously named `useFormState`) is used to update state based on the result of a Server Action (e.g., displaying success or validation error messages).

```tsx
// components/SubscribeForm.tsx
'use client';

import { useActionState } from 'react';
import { addSubscribeEmail } from '@/app/actions';
import SubmitButton from './SubmitButton';

const initialState = {
  message: '',
  success: false,
};

export default function SubscribeForm() {
  // state represents the returned value of the action, formAction is the action to pass to <form>
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      await addSubscribeEmail(formData);
      return { message: 'Subscribed successfully!', success: true };
    } catch (err: any) {
      return { message: err.message, success: false };
    }
  }, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="email" name="email" placeholder="Enter your email" required />
      <SubmitButton />
      {state.message && (
        <p className={state.success ? 'text-green-500' : 'text-red-500'}>
          {state.message}
        </p>
      )}
    </form>
  );
}
```

---

## 3. Optimistic Updates with `useOptimistic`

Optimistic updates make your app feel faster by instantly updating the UI with the expected outcome before the server responds.

The `useOptimistic` hook takes the current state and returns an optimistic state that can be updated during an async action.

```tsx
// components/TodoList.tsx
'use client';

import { useOptimistic, startTransition } from 'react';
import { addTodoAction } from '@/app/actions';

interface Todo {
  id: string;
  text: string;
  sending?: boolean;
}

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state, newTodoText: string) => [
      ...state,
      { id: Date.now().toString(), text: newTodoText, sending: true },
    ]
  );

  async function handleFormSubmit(formData: FormData) {
    const text = formData.get('todo') as string;
    
    // Trigger the optimistic update
    startTransition(() => {
      addOptimisticTodo(text);
    });

    // Run the actual Server Action
    await addTodoAction(text);
  }

  return (
    <div>
      <form action={handleFormSubmit}>
        <input type="text" name="todo" required />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {optimisticTodos.map((todo) => (
          <li key={todo.id} style={{ opacity: todo.sending ? 0.5 : 1 }}>
            {todo.text} {todo.sending && '(Saving...)'}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 4. Programmatic Invocation

Server Actions can also be invoked programmatically without using HTML forms or action attributes:

- **Inside Buttons / Event Handlers**:
  ```tsx
  'use client';
  
  import { deletePostAction } from '@/app/actions';
  import { useTransition } from 'react';
  
  export function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    
    return (
      <button 
        disabled={isPending} 
        onClick={() => startTransition(() => deletePostAction(id))}
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    );
  }
  ```

- **Inside `useEffect`**:
  You can fetch or trigger actions on component mount. However, keep in mind that actions are POST requests under the hood, so standard queries should still use server components or client fetching APIs.

---

## 5. Security Best Practices

Since Server Actions expose public endpoints under the hood, you must treat them with the same security principles as REST APIs:

1. **Authentication and Authorization**: Verify user sessions inside the Server Action.
2. **Input Validation**: Use schemas (like **Zod**) to parse and validate input parameters before processing.
3. **Rate Limiting**: Implement token-bucket or request counts to protect your actions from automated spam or DDoS.
