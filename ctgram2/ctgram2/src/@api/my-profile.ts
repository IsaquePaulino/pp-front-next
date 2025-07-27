'use server'
import { Me } from "@/@types/me"
import { api } from "@/lib/api"

export async function myProfile(token: string): Promise<Me> {
    try {
        const response = await api.get("/my-posts",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return response.data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error)
        throw new Error(error.response.data.message)
    }
}
