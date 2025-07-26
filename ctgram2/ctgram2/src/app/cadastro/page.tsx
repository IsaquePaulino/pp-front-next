"use client"
import Image from "next/image";
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { criaConta } from "@/@api/cria_conta";

import { CadastroSchema, cadastroSchema } from "@/@types/cadastro";
import Cookies from "js-cookie"

export default function cadastro() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
    } = useForm<CadastroSchema>({
        resolver: zodResolver(cadastroSchema),
        defaultValues: {
            senha: "",
            email: "",
            confirma_senha: "",
            nome: "",
        },
    });
    async function handleCadastro(data: CadastroSchema) {
        try {
            const { senha, confirma_senha } = data;
            if (senha !== confirma_senha) {
                console.info({ error: "Senha e confirmar senha são diferentes." })
                toast.error("Senha e confirmar senha são diferentes.");
                return;
            }
            const response = await criaConta(data);
            if (response?.error) {
                console.info(response)
                toast.error(response.error);
                return;
            }
            toast.success("Cadastro realizado!");
        } catch { }
    }
    return (
        <div id="inicial">
            <main id="box">
                <Image src="https://www.ctjunior.com.br/images/logo/logo-branca-reta-noSlogan.svg" width={300} height={120.75} alt="" className="pb-5" />
                <form onSubmit={handleSubmit(handleCadastro)} className="w-full flex gap-y-5 flex-col items-center">
                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md ">
                        <Input
                            required
                            type="text"
                            placeholder="nome"
                            {...register("nome")} />
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md ">
                        <Input
                            required
                            type="email"
                            placeholder="seu@email.com"
                            {...register("email")}/>
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md">
                        <Input
                            required
                            type="password"
                            placeholder="senha"
                            {...register("senha")}/>
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md">
                        <Input
                            required
                            type="password"
                            placeholder="confirme sua senha"
                            {...register("confirma_senha")}/>
                    </div>

                    {errors.nome?.message && <span>{errors.nome.message}</span>}
                    {errors.email?.message && <span>{errors.email.message}</span>}
                    {errors.senha?.message && <span>{errors.senha.message}</span>}
                    {errors.confirma_senha?.message && <span>{errors.confirma_senha.message}</span>}
                    
                    <Button type="submit"
                    disabled = {isLoading}
                    form="cadastro"
                        className="flex items-center justify-center w-50 h-10 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
                        Cadastro</Button>

                    <Button onClick={() => router.push("/")}
                        className="flex items-center justify-center w-50 h-10 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg"
                    >Ir para Login</Button>
                </form>
            </main>
        </div>
    )
}