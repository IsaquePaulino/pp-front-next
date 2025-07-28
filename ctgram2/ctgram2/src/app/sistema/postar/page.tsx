'use client'
import { Menu } from "@/components/menu";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createPost } from "@/@api/create-post";
import { toast } from "sonner";
import { postSchema, CreatePostSchema } from "@/@api/postar"
import Cookies from "js-cookie";


export default function CreatePost() {
    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CreatePostSchema>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            foto_link: "",
            descricao: "",
        }
    })

    function handleErrorOnPostPhoto(errors: FieldErrors<CreatePostSchema>) {
            if (errors.foto_link?.message) {
                toast.error("URL inválida.", {
                    description: "Forneça uma url válida para postar sua foto."
                })
            }
        }

    async function handleCreatePost(data: CreatePostSchema) {
        try {
            const token = Cookies.get("token")
            if (token) {
                await createPost(data, token)
                toast.success("Post criado com sucesso!", { description: "Volte para o feed para ver seu novo post!" })
                reset()
            } else {
                throw new Error("Token de acesso não encontrado.")
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
            toast.error(errorMessage, { description: "Talvez sua autenticação tenha expirado!" })
        }
    }

    return (
        <Menu>
            <div className="w-full h-screen flex justify-center items-center align-middle">
                <main className="bg-black p-10 rounded-md  border-2 border-orange-400">
                    
                     <form id="postar" onSubmit={handleSubmit(handleCreatePost, handleErrorOnPostPhoto)} className="w-full flex flex-col gap-5 items-center">
                      <h1 className="text-white text-4xl"><strong>Postar nova foto</strong></h1>
                    <div>
                    <h2 className="text-white justify-items-start">Link para nova foto</h2>
                    <Input 
                        required
                        className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md"
                        type="text"
                        placeholder="Link da imagem"
                        {...register("foto_link")} />
                    </div>
                    <div>
                    <h2 className="pt-5 text-white">Descrição</h2>
                    <Input
                        className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md"
                        type="text"
                        placeholder="Descrição (opcional)"
                        {...register("descricao")}/>
                    </div>
                    <Button 
                    className="flex items-center justify-center py-5 px-13.5 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg"
                    type="submit" 
                    form="postar"
                    disabled={isSubmitting}
                    >Postar</Button>
                    </form>
                </main>
            </div>
            {/* <div className="w-full flex flex-col items-center justify-center h-screen">
                <Card className="w-full max-w-sm gap-4 py-8">
                    <CardHeader>
                        <CardTitle>Postar</CardTitle>
                        <CardDescription>Faça um novo post!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="postar" onSubmit={handleSubmit(handleCreatePost, handleErrorOnPostPhoto)}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex flex-col gap-1">
                                <p>Link para foto</p>
                                <input type="text" required placeholder="Sua foto" className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md" {...register("foto_link")} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p>Descrição(opcional)</p>
                                <textarea
                                    placeholder="Descrição"
                                    {...register("descricao")}
                                    className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md"
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            form="postar"
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center justify-center py-5 px-13.5 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg"
                        >Postar</Button>
                    </CardFooter>
                </Card>
            </div> */}
        </Menu>
    )
}