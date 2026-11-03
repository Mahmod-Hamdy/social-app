import * as z from "zod";

export const loginValidationData = z
    .object({
        email: z
        .string()
        .nonempty("Email is Required")
        .email("This Email is Unvalid"),
        password: z
        .string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[^\s]{8,}$/,
            "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character. Spaces aren’t allowed.",
        )
    });
export type LoginValidationDataType =z.infer<typeof loginValidationData>