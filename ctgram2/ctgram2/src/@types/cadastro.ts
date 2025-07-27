import { z } from "zod"

export const cadastroSchema = z.object({
  password: z.string().nonempty(),
  email: z.string().nonempty(),
  confirm_password: z.string().nonempty(),
  username: z.string(),
});

export type CadastroSchema = z.infer<typeof cadastroSchema>;