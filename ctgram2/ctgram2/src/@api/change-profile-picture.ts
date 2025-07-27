'use server'
import { ChangePictureSchema } from "@/app/sistema/meu-perfil/page"
import { api } from "@/lib/api"

export async function changeProfilePicture({ user_foto }: ChangePictureSchema, token: string): Promise<void> {
    try {
        await api.patch("/user", {
            foto_link: user_foto
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
