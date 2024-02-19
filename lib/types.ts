import z from "zod";

export const LoginBodySchema = z.object({
    email: z.string().email({
        message: "Invalid email!"
    }).trim(),
    password: z.string().min(1, {message: "Password cannot be empty!"})
})

export const SignupBodySchema = z.object({
    firstname: z.string().min(1, {message: "First name should be at least 1 character"}).trim(),
    lastname: z.string().min(1, {message: "Last name should be at least 1 character"}).trim(),
    email: z.string().email({
        message: "Invalid email!"
    }).trim(),
    password: z.string(),
    customUrl: z.string().min(5, {message: "CustomUrl should be at least 5 character long"})
})

export const UserUpdateBodySchema = z.object({
    firstname: z.string().min(1, {message: "First name should be at least 1 character"}).trim().optional(),
    lastname: z.string().min(1, {message: "Last name should be at least 1 character"}).trim().optional(),
    description: z.string().optional(),
    profilePicture: z.string().optional()
})

export const LinkButtonSchema = z.array(
    z.object({
        title: z.string(),
        url: z.string().url({message: "Invalid URL!"}),
        position: z.number()
    })
)

export type LoginSchema = z.infer<typeof LoginBodySchema>;
export type SignupSchema = z.infer<typeof SignupBodySchema>;
export type UserUpdateSchema = z.infer<typeof UserUpdateBodySchema>;
export type LinkButtonSchema = z.infer<typeof LinkButtonSchema>;
