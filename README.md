# my frontend task assignment

Hi! This is my frontend assignment project where I built a complete authentication flow. I have designed and implemented this exactly as per your requirements, handling everything from signing in and signing up to a full "Forgot Password" process with OTP verification.

I used **Next.js 15 (App Router)** and **NextAuth.js** for the backend logic, and styled the UI with **Tailwind CSS**.

## What's inside?

-   **Sign In / Sign Up**: You can log in using email/password or use Google and Microsoft buttons (configured with NextAuth).
-   **Forgot Password**: I implemented a 3-step wizard here -> Enter Email -> Verify OTP -> Reset Password.
-   **Validation**: Used React Hook Form and Zod to make sure inputs are correct and show proper error messages.

## How to run this locally

1.  **Install packages**
    Just run `npm install` in the terminal.

2.  **Start the app**
    Run `npm run dev` and open `localhost:3000`.

## Quick Testing Credentials

*   **Login Email**: Any Email (e.g. `test@example.com`)
*   **Login Password**: Any Password
*   **Forgot Password OTP**: `123456`

---
*Feel free to reach out if you have any questions about the code!*
