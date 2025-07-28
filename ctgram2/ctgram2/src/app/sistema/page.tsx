'use client'
import { feed } from "@/@api/feed"
import { Post } from "@/@types/posts"
import { Menu } from "@/components/menu"
import Image from "next/image"
import { useEffect, useState } from "react"
import userDefaultPic from "@/imagens/foto_perfil.jpg"
import Cookies from 'js-cookie'
import { toast } from "sonner"

export default function Feed() {
    const [posts, setPosts] = useState<Post[] | null>(null)

    useEffect(() => {
        async function loadFeed() {
            try {
                const token = Cookies.get("token")
                if (token) {
                    const response = await feed(token)
                    setPosts(response)
                } else {
                    throw new Error("Token de acesso não encontrado.")
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Erro inesperado"
                console.error("Erro ao carregar feed:", errorMessage)
                toast.error(errorMessage)
            }
        }

        loadFeed()
    }, [])

    return (
        <div className="w-full">
            <Menu>
                <h1 className="font-bold text-2xl">Feed</h1>
                <div className="flex flex-col w-full h-full items-center gap-12 pb-12">
                    {posts !== null && posts.length === 0 && (
                        <div className="text-gray-600 text-center">
                            <p>Nenhum post encontrado. Que tal criar um?</p>
                        </div>
                    )}

                    {
                        posts !== null && posts.length > 0 &&
                        posts?.map((item) => {
                            return (
                                <div key={item.post_id} className="flex flex-col">
                                    <div id="header"
                                        className="bg-black p-3 rounded-tl-lg rounded-tr-lg border-r border-l border-t pt-4
                        flex items-start gap-3 max-w-xl w-full">
                                        <Image
                                            src={item.user_foto === null ? userDefaultPic : item.user_foto}
                                            height={100}
                                            width={100}
                                            alt="Foto de perfil"
                                            className="h-8 w-8 rounded-full border-2/"
                                        />
                                        <p className="text-lg italic text-white">{item.username}</p>
                                    </div>
                                    <Image
                                        src={item.foto}
                                        alt="Foto"
                                        width={400}
                                        height={400}
                                        priority
                                        className="w-sm md:w-xl h-auto max-h-[450px] object-cover"
                                    />
                                    <div id="footer" className="bg-black p-3 rounded-bl-lg rounded-br-lg border-r border-l 
                        border-b pb-4 flex items-start w-full max-w-xl">
                                        <span className="font-medium text-lg italic text-white">{' '}
                                            {
                                                item.description !== null &&
                                                <span className="text-lg font-normal not-italic break-words">{item.description.length > 145
                                                    ? item.description.substring(0, 142).concat('...')
                                                    : item.description}
                                                </span>
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
            </Menu>
        </div>
    )
}