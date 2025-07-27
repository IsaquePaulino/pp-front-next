import z from "zod"

export const postSchema = z.object({
    foto_link: z.string().url({message: "Você deve enviar uma URL válida"}),
    descricao: z.string().nullable()
})

export type CreatePostSchema = z.infer<typeof postSchema>