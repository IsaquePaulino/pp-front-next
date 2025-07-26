import { z } from "zod"

export const cadastroSchema = z.object({
  senha: z.string().nonempty(),
  email: z.string().nonempty(),
  confirma_senha: z.string().nonempty(),
  nome: z.string(),
});

export type CadastroSchema = z.infer<typeof cadastroSchema>;