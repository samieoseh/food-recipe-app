import * as z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ENVIRONMENT: z.string().min(1),
  NEXT_PUBLIC_HANKO_API_URL: z.string().url().min(1),
  NEXT_PUBLIC_SPONNACULAR_API: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

export const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_HANKO_API_URL: process.env.NEXT_PUBLIC_HANKO_API_URL,
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
  username: z.string().min(2).optional(),
});
