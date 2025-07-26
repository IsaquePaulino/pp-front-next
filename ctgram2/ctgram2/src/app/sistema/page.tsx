"use client"

import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import Image from 'next/image';
import { Post } from "@/@types/posts"
import { feed } from "@/@api/feed"
import { Posts } from "@/components/post" 
import { toast } from 'sonner';
import userDefaultPic from "@/imagens/foto_perfil.jpg"
import Cookies from 'js-cookie';

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function carregandoPosts() {
            try {
                setLoading(true);
                const token = Cookies.get("token")
                if (token) {
                    const response = await feed(token)
                    setPosts(response)
                } else {
                    throw new Error("Token de acesso não encontrado.")
                }

            } catch (error) {

                const mensagem_error = error instanceof Error ? error.message : "Erro inesperado"
                console.error("Falha ao carregar o feed:", mensagem_error)
                toast.error(mensagem_error)
            }
            finally {
                setLoading(false);
            }
        }

        FeedPage()
    }, []);

    return (
        <div id="site-sb">
            <main className="flex-1 flex-col p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Seu Feed</h1>

                {loading && (
                    <div className="flex justify-center items-center h-48">
                        <p>Carregando posts...</p>
                    </div>
                )}

                {posts !== null && posts.length === 0 && (
                    <div className="text-gray-600 text-center">
                        <p>Nenhum post encontrado. Que tal criar um?</p>
                    </div>
                )}

                {posts !== null && posts.length === 0 && posts?.map((item) => {
                    return (
                        <div id="card" key={item.post_id} className="flex flex-col">
                            <div id="header"
                                className="p-3 rounded-tl-lg rounded-tr-lg border-r border-l border-t pt-4
                        flex justify-between items-center max-w-xl w-full">
                                <Image
                                    src={item.foto_perfil === null ? userDefaultPic : item.foto_perfil}
                                    height={100}
                                    width={100}
                                    alt="Foto de perfil"
                                    className="h-8 w-8 rounded-full"
                                />
                                <p className="text-lg italic">{item.nome}</p>
                            </div>
                            <Image
                                src={item.foto}
                                alt="Foto"
                                width={400}
                                height={400}
                                priority
                                className="border w-sm md:w-xl h-auto max-h-[450px] object-cover bg-orange-50"
                            />
                            <div id="footer" className="p-3 rounded-bl-lg rounded-br-lg border-r border-l 
                        border-b pb-4 flex items-start w-full max-w-xl">
                                <span className="font-medium text-lg italic">{item.nome}{' '}
                                    {
                                        item.descricao !== null &&
                                        <span className="text-lg font-normal not-italic break-words">{item.descricao.length > 145
                                            ? item.descricao.substring(0, 142).concat('...')
                                            : item.descricao}
                                        </span>
                                    }
                                </span>
                            </div>
                        </div>
                    )
                })
                }

                <div className="justify-center grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6">

                </div>
            </main>
        </div>
    );
}