// src/env.ts
import { z } from 'zod';

export const envSchema = z.object({ // <--- Garanta que 'export const' esteja aqui
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3331),
  JWT_SECRET: z.string().min(32), // Deve ser JWT_SECRET
});

export type Env = z.infer<typeof envSchema>;

export const validate = (config: Record<string, unknown>): Env => {
  return envSchema.parse(config);
};