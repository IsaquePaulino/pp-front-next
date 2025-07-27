'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowsLeftRight, DotsThreeVertical, TextT, Trash } from "phosphor-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Image from "next/image"
import userDefaultPic from "@/imagens/foto_perfil.jpg"
import { z } from "zod"
import { changePostDescription } from "@/@api/change-post-description"
import Cookies from "js-cookie"
import { deletePost } from "@/@api/delete-post"

const changeDescriptionSchema = z.object({
    descricao: z.string(),
    postId: z.string(),
})

export type ChangeDescriptionSchema = z.infer<typeof changeDescriptionSchema>

const deletePostSchema = z.object({
    postId: z.string()
})

export type DeletePostSchema = z.infer<typeof deletePostSchema>

export function PostCard({
    post,
    username,
    user_foto,
    onUpdate,
}: {
    post: { post_id: string; description: string | null; foto: string }
    username: string
    user_foto: string | null
    onUpdate: (newDesc: string | null) => void
}) {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<ChangeDescriptionSchema>({
        resolver: zodResolver(changeDescriptionSchema),
        defaultValues: {
            descricao: post.description ?? "",
            postId: post.post_id
        }
    })

    async function handleChangeDescription(data: ChangeDescriptionSchema) {
        try {
            const token = Cookies.get("token")
            if (token) {
                await changePostDescription(data, token)
                toast.success("Descrição atualizada")
                onUpdate(data.descricao)
            } else {
                throw new Error("Token de acesso não encontrado.")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
            console.error("Erro ao alterar foto de perfil:", errorMessage)
            toast.error(errorMessage)
        }
    }

    const { register: r, handleSubmit: h, formState: { isSubmitting: enviando } } = useForm<DeletePostSchema>({
        resolver: zodResolver(deletePostSchema),
        defaultValues: {
            postId: post.post_id
        }
    })

    async function handleDeletePost(data: DeletePostSchema) {
        try {
            const token = Cookies.get("token")
            if (token) {
                console.log(token, data)
                await deletePost(data, token)
                toast.success("Post apagado com sucesso!")
                onUpdate(null)
            } else {
                throw new Error("Token de acesso não encontrado.")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
            console.error("Erro ao deletar post:", errorMessage)
            toast.error(errorMessage)
        }
    }

    return (
        <div id="card" className="flex flex-col">
            <div className="bg-black p-3 rounded-tl-lg rounded-tr-lg border-r border-l border-t pt-4 flex justify-between items-center max-w-xl w-full">
                <Image
                    src={user_foto ?? userDefaultPic}
                    height={100}
                    width={100}
                    alt="Foto de perfil"
                    className="h-8 w-8 rounded-full"
                />
                <Popover >
                    <PopoverTrigger asChild>
                        <DotsThreeVertical className="text-white cursor-pointer text-2xl" />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="flex flex-col w-full gap-4">
                            <p>Editar Post</p>
                            <form onSubmit={handleSubmit(handleChangeDescription)} className="flex flex-col w-full gap-4">
                                <div className="flex flex-row gap-2 items-center justify-between">
                                    <TextT />
                                    <Input 
                                      type="text" 
                                      placeholder="Nova descrição" 
                                      {...register("descricao")} />
                                    <Input type="hidden" {...register("postId")} />
                                </div>
                                <Button className="w-full flex flex-row gap-1 cursor-pointer" disabled={isSubmitting}>
                                    Trocar Descrição <ArrowsLeftRight />
                                </Button>
                            </form>
                            <Separator />
                            <div className="flex flex-row gap-2 items-center justify-between">
                                <form onSubmit={h(handleDeletePost)} className="w-full">
                                    <Input type="hidden" {...r("postId")} />
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        disabled={enviando}
                                        className="w-full flex flex-row gap-1 cursor-pointer">
                                        Apagar Post<Trash />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <Image
                src={post.foto}
                alt="Foto"
                width={400}
                height={400}
                className="border-2 w-sm md:w-xl h-auto max-h-[450px] object-cover bg-orange-300"
            />
            <div className="bg-black p-3 rounded-bl-lg rounded-br-lg border-r border-l border-b pb-4 flex items-start w-full max-w-xl">
                <span className="text-white font-medium text-lg text-justify italic">{username}{' '}
                    {post.description && (
                        <span className="text-white text-lg font-normal not-italic break-words ml-1">
                            {post.description.length > 145
                                ? post.description.substring(0, 142).concat('...')
                                : post.description}
                        </span>
                    )}
                </span>
            </div>
        </div>
    )
}
