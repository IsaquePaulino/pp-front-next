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
            password: "",
            email: "",
            confirm_password: "",
            username: "",
        },
    });
    async function handleCadastro(data: CadastroSchema) {
        console.log('DEBUG: handleCadastro acionada com dados:', data);
        try {
            const { password, confirm_password } = data;
            if (password !== confirm_password) {
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
        } catch {
            const errorMessage = errors instanceof Error ? errors.message : "Erro inesperado ao cadastrar."
            console.error("DEBUG: Erro na chamada da API de cadastro:", errorMessage, errors); // Log detalhado
            toast.error(`Falha no cadastro: ${errorMessage}`);
        }
    }
    return (
        <div id="inicial">
            <main id="box">
                <Image src="https://www.ctjunior.com.br/images/logo/logo-branca-reta-noSlogan.svg" width={300} height={120.75} alt="" className="pb-5" />
                <form id="cadastro" onSubmit={handleSubmit(handleCadastro)} className="w-full flex gap-y-5 flex-col items-center">
                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md ">
                        <Input
                            required
                            type="text"
                            placeholder="nome"
                            {...register("username")} />
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md ">
                        <Input
                            required
                            type="email"
                            placeholder="seu@email.com"
                            {...register("email")} />
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md">
                        <Input
                            required
                            type="password"
                            placeholder="senha"
                            {...register("password")} />
                    </div>

                    <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md">
                        <Input
                            required
                            type="password"
                            placeholder="confirme sua senha"
                            {...register("confirm_password")} />
                    </div>

                    {errors.username?.message && <span>{errors.username.message}</span>}
                    {errors.email?.message && <span>{errors.email.message}</span>}
                    {errors.password?.message && <span>{errors.password.message}</span>}
                    {errors.confirm_password?.message && <span>{errors.confirm_password.message}</span>}

                    <Button type="submit"
                        disabled={isLoading}
                        form="cadastro"
                        className="flex items-center justify-center py-5 px-14.5 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
                        Cadastro</Button>

                    <Button onClick={() => router.push("/")}
                        className="flex items-center justify-center py-5 px-11 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg"
                    >Ir para Login</Button>
                </form>
            </main>
        </div>
    )
}