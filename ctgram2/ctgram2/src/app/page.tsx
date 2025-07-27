"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { LoginSchema, loginSchema } from "@/@types/login";
import { login } from "@/@api/login"
import { zodResolver } from "@hookform/resolvers/zod";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { toast } from "sonner";
import Cookies from "js-cookie";


export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function handleLogin(data: LoginSchema) {
    console.log('DEBUG: handleLogin acionada com dados:', data);
    try {
      const token = await login(data);
      if (token?.error) {
        toast.error(token.error);
        return;
      }
      console.log('DEBUG: Login API bem-sucedido, token recebido:', token ? token.substring(0, 30) + '...' : 'nenhum');
      Cookies.set("token", token, { expires: 1 / 144 });
      toast.success("Login realizado!");
      router.push("/sistema");
    } catch { }
  }

  return (
    <div id="inicial">
      <main id="box">
        <Image src="https://www.ctjunior.com.br/images/logo/logo-branca-reta-noSlogan.svg" width={300} height={120.75} alt="" className="pb-5" />
        <form id="login" onSubmit={handleSubmit(handleLogin)} className="w-full flex gap-y-3 flex-col items-center">
          <div className="w-70 text-gray-80w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md0 bg-orange-200 border-2 border-orange-700 rounded-md ">
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
              {...register("password")} />
          </div>
        {errors.password?.message && <span>{errors.password.message}</span>}
        <div id="box">
          <Button type="submit"
            disabled={isLoading}
            className="flex items-center justify-center py-5 px-15 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
            Fazer login</Button>

          <h1 className="pt-5 text-xs">Ainda não tem uma conta?</h1>

          <Button onClick={() => router.push("/cadastro")}
            className="flex items-center justify-center py-5 px-13.5 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
            Cadastre-se</Button>
        </div>
        </form>
      </main>
    </div>
  );
}
