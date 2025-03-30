// import { z } from 'zod';

// const strongPassword = z
//     .string()
//     .min(8, 'Minimum 8 characters')
//     .regex(/[A-Z]/, 'At least one uppercase letter')
//     .regex(/[a-z]/, 'At least one lowercase letter') 
//     .regex(/[0-9]/, 'At least one number')
//     .regex(/[\W_]/, 'At least one special character');

// export const registerSchema = z
//     .object({
//         email: z.string().email('Invalid email'),
//         password: strongPassword,
//         confirmPassword: z.string().min(1, 'Confirmation required'),
//     })
//     .refine((data) => data.password === data.confirmPassword, {
//         path: ['confirmPassword'],
//         message: 'Passwords do not match',
//     });
