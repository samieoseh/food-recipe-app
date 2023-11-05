import * as z from "zod";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&])[A-Za-z\d@#$!%^&*]{8,}$/;

const envSchema = z.object({
  NEXT_PUBLIC_SPONNACULAR_API: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters",
    })
    .regex(emailRegex, "Email must be of the format 'test@example.com'"),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .regex(
      passwordRegex,
      "Password must contain at least 8 characters, an uppercase and a symbol"
    ),
});

export const searchFormSchema = z.object({
  query: z.string().min(1, {
    message: "Search field cannot be empty",
  }),
});

export const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_SPONNACULAR_API: process.env.NEXT_PUBLIC_SPONNACULAR_API,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const ConnectedUserSchema = z.object({
  status: z.enum(["success", "failure"]),
  username: z.string().min(1),
  spoonacularPassword: z.string().min(1),
  hash: z.string().min(1),
});

export const RecipeUserSchema = z.object({
  created_at: z.date(),
  email: z.string().min(2),
  id: z.number(),
  spoonacular_hash: z.string().optional(),
  spoonacular_password: z.string().optional(),
});
