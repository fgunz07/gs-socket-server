import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name is required."
        }),
        username: string({
            required_error: "Username is required."
        }),
        password: string({
            required_error: "Password is required."
        }),
        confirm_password: string({
            required_error: "Confirm Password is required."
        })
    })
    .refine((data) => data.password === data.confirm_password, 
    { 
        message: "Password confirmation does not match.", 
        path: ["confirm_password"] 
    }),
    query: object({}),
    params: object({})
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "confirm_password">
