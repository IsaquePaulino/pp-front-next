'use server'
import { CreatePostSchema } from "@/app/sistema/postar/page"
import { api } from "@/lib/api"

export async function createPost({ descricao, foto_link }: CreatePostSchema, token:string) {
    try {
        await api.post("/post", {
            foto_link,
            descricao: descricao === "" ? null : descricao
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error)
        throw new Error(error.response.data.message)
    }
}
