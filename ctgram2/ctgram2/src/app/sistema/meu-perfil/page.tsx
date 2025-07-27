'use client'
import { Me } from "@/@types/me";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { myProfile } from "@/@api/my-profile";
import userDefaultPic from "@/imagens/foto_perfil.jpg"
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Menu } from "@/components/menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeProfilePicture } from "@/@api/change-profile-picture";
import { PostCard } from "@/components/post";

const changePictureSchema = z.object({
    user_foto: z.string().url().nonempty()
})

export type ChangePictureSchema = z.infer<typeof changePictureSchema>

export default function MeuPefil() {
    const [me, setMe] = useState<Me | null>(null)

    useEffect(() => {
        async function loadMeuPerfil() {
            try {
                const token = Cookies.get("token")
                if (token) {
                    const response = await myProfile(token)
                    setMe(response)
                } else {
                    throw new Error("Token de acesso não encontrado.")
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
                console.error("Erro ao carregar feed:", errorMessage)
                toast.error(errorMessage)
            }
        }

        loadMeuPerfil()
    }, [])

    const { register, reset, handleSubmit: trocarFoto, formState: { isSubmitting } } = useForm<ChangePictureSchema>({
        resolver: zodResolver(changePictureSchema),
        defaultValues: {
            user_foto: (me?.user_foto !== null && me !== null) ? me.user_foto : ""
        }
    })

    function handleErrorOnChangePhoto(errors: FieldErrors<ChangePictureSchema>) {
        if (errors.user_foto?.message) {
            toast.error("URL inválida.", {
                description: "Forneça uma url válida para trocar sua foto."
            })
        }
    }

    async function handleChangePhoto(data: ChangePictureSchema) {
        try {
            const token = Cookies.get("token")
            if (token) {
                await changeProfilePicture(data, token)
                setMe((prev) => prev ? { ...prev, user_foto: data.user_foto } : prev)
                toast.message("Foto de perfil alterada com sucesso!")
                reset()
            } else {
                throw new Error("Token de acesso não encontrado.")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
            console.error("Erro ao alterar foto de perfil:", errorMessage)
            toast.error(errorMessage)
        }
    }

    return (
        <div className="w-full">
            <Menu>
                <h1 className="font-bold text-xl italic">{me === null ? "Meu perfil" : me.username}</h1>
                <div className="flex flex-col w-full h-full items-center gap-12 pb-12 pt-6">
                    {
                        me === null
                            ?
                            <>
                            </>
                            :
                            <>
                                <Image
                                    src={me.user_foto === null ? userDefaultPic : me.user_foto}
                                    alt="Foto do usuário"
                                    height={400}
                                    width={400}
                                    className="h-48 w-48 rounded-full border-4 border-[#333]"
                                />
                                <form
                                    onSubmit={trocarFoto(handleChangePhoto, handleErrorOnChangePhoto)}
                                    className="flex flex-row gap-2"
                                >
                                    <Input
                                    className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md" type="text" placeholder="Link para foto de perfil" {...register("user_foto")} />
                                    <Button
                                        type="submit"
                                        
                                        disabled={isSubmitting}
                                        className="flex items-center //justify-center py-5 px-13.5 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg cursor-pointer"
                                    >Trocar foto</Button>
                                </form>
                                {me.posts?.map((item) => (
                                    <PostCard
                                        key={item.post_id}
                                        post={item}
                                        username={me.username}
                                        user_foto={me.user_foto}
                                        onUpdate={(newDesc) => {
                                            setMe(prev => {
                                              if (!prev) return prev
                                      
                                              
                                              if (newDesc === null) {
                                                const updatedPosts = prev.posts.filter(p => p.post_id !== item.post_id)
                                                return { ...prev, posts: updatedPosts }
                                              }
                                      
                                              
                                              const updatedPosts = prev.posts.map(p =>
                                                p.post_id === item.post_id ? { ...p, description: newDesc } : p
                                              )
                                              return { ...prev, posts: updatedPosts }
                                            })
                                          }}
                                    />
                                ))}
                            </>

                    }
                </div>
            </Menu>
        </div>
    )
}