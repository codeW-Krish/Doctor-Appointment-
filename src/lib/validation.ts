import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const emailSchema = z
  .string()
  .email('Invalid email address')
  .regex(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email format'
  );

export const phoneSchema = z
  .string()
  .regex(
    /^\+?[1-9]\d{1,14}$/,
    'Phone number must be in international format (e.g., +1234567890)'
  );

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});