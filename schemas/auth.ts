import * as z from 'zod';

//create common password validation==
const passwordValidation = z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

export const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordValidation,
    rememberMe: z.boolean().optional(),
});

export const signUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: passwordValidation,
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Oops! Passwords Don't Match",
    path: ["confirmPassword"],
});

// handle schema for auth form ====
export type AuthFormData = {
    email: string;
    password: string;
    confirmPassword?: string;
    rememberMe?: boolean;
};

// create Forgot Password Schemas=====
export const forgotPasswordEmailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const forgotPasswordOtpSchema = z.object({
    otp: z.string().length(6, { message: "Please enter a valid 6-digit code" }),
});

export const forgotPasswordResetSchema = z.object({
    password: passwordValidation,
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Oops! Passwords Don't Match",
    path: ["confirmPassword"],
});

export type ForgotPasswordEmailData = z.infer<typeof forgotPasswordEmailSchema>;
export type ForgotPasswordOtpData = z.infer<typeof forgotPasswordOtpSchema>;
export type ForgotPasswordResetData = z.infer<typeof forgotPasswordResetSchema>;

