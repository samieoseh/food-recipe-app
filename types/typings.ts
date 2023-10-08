import * as z from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_ENVIRONMENT: z.string().min(1),
  NEXT_PUBLIC_HANKO_API_URL: z.string().url().min(1),
  NEXT_PUBLIC_SPONNACULAR_API: z.string().min(1),
});

export const parsedEnv = envSchema.parse({
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_HANKO_API_URL: process.env.NEXT_PUBLIC_HANKO_API_URL,
  NEXT_PUBLIC_SPONNACULAR_API: process.env.NEXT_PUBLIC_SPONNACULAR_API,
});
