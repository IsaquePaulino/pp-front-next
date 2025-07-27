'use server'
import { ChangeDescriptionSchema } from "@/components/post"
import { api } from "@/lib/api"

export async function changePostDescription({ descricao, postId }: ChangeDescriptionSchema, token: string): Promise<void> {
    try {
        await api.patch(`/post/${postId}`, {
            descricao
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
