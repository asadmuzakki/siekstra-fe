import {z} from "zod";

export const LoginModels = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(8,'Password minimal 8 karakter')
})

export type LoginModelsType = z.infer<typeof LoginModels>


export const RegisterModel = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .regex(
        /^\s*[A-Z][a-z]*(\s[A-Za-z]+)*\s*$/,
        "Name must start with an uppercase letter"
      ),

    email: z.string().email("Invalid email"),



    password: z.string().min(8, "Password must be at least 8 characters"),

    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Confirmation password must be the same as password",
    path: ["password_confirmation"],
  });

export type RegisterModelType = z.infer<typeof RegisterModel>;