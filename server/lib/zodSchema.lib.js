import {z} from 'zod';


export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number or special character, and at least 8 characters'),
    username: z.string().min(3),
});


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
})