'use server'
import { Post } from "@/@types/posts"
import { api } from "@/lib/api"

export async function feed(token: string): Promise<Post[]> {
    try {
        const response = await api.get("/posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data.posts
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error)
        throw new Error(error.response.data.message)
    }
}
