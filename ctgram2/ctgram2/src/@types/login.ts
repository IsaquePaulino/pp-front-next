import z from "zod";

export const loginSchema = z.object({
  senha: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos"}).nonempty({error: "Campo de senha não pode estar vazio"}),
  email: z.string().email({error: "E-mail inválido"}).nonempty({error: "Campo de e-mail não pode estar vazio"}),
})

export type LoginSchema = z.infer<typeof loginSchema>;