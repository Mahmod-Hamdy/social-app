import * as z from "zod";

export const registerValidationData = z
    .object({
        name: z
        .string()
        .nonempty("Full Name is Required")
        .min(3, "Minimum Length is 3 chars")
        .max(15, "Maximum Length is 15"),
        username: z
        .string()
        .nonempty("User Name is Required")
        .min(3, "Minimum Length is 3 chars")
        .max(10, "Maximum Length is 10"),
        email: z
        .string()
        .nonempty("Email is Required")
        .email("This Email is Unvalid"),
        dateOfBirth: z
        .string()
        .nonempty("Date Of Birth is required")
        .refine((date) => {
            const currentYear = new Date().getFullYear();
            const userYear = new Date(date).getFullYear();
            const age = currentYear - userYear;
            return age >= 18;
        }, "User must be Older Than 18 Years Old"),
        gender: z.string().nonempty("Gender is required"),
        password: z
        .string()
        .nonempty("Password is required")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[^\s]{8,}$/,
            "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character. Spaces aren’t allowed.",
        ),
        rePassword: z.string().nonempty("Confirm Password is required"),
    })
    .refine(
        (data) => {
        return data.password === data.rePassword;
        },
        {
        path: ["rePassword"],
        message: "Passwords Not Match",
        },
    );
export type RegisterValidationDataType =z.infer<typeof registerValidationData>
