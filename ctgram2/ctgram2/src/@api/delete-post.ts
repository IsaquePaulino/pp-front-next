'use server'
import { DeletePostSchema } from "@/components/post"
import { api } from "@/lib/api"

export async function deletePost({ postId }: DeletePostSchema, token: string): Promise<void> {
    try {
        await api.delete(`/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error)
        throw new Error(error.response?.data?.message ?? "Erro ao deletar post")
    }
}
