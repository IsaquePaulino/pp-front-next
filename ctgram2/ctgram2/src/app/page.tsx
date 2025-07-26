"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

import { LoginSchema, loginSchema } from "@/@types/login";
import { login } from "@/@api/login"
import { zodResolver } from "@hookform/resolvers/zod";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
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
      senha: "",
      email: "",
    },
  });

  async function handleLogin(data: LoginSchema) {
    try {
      const token = await login(data);
      if (token?.error) {
        toast.error(token.error);
        return;
      }
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
          <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md ">
            <Input
              required
              type="email"
              placeholder="seu@email.com" />
          </div>
          <div className="w-70 text-gray-800 bg-orange-200 border-2 border-orange-700 rounded-md">
            <Input
              required
              type="password"
              placeholder="senha" />
          </div>
        
        <div id="box">
          <Button type="submit"
            disabled={isLoading}
            form="login"
            className="flex items-center justify-center w-50 h-10 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
            Fazer login</Button>

          <h1 className="pt-5 text-xs">Ainda não tem uma conta?</h1>

          <Button onClick={() => router.push("/cadastro")}
            className="flex items-center justify-center w-50 h-10 bg-orange-500 rounded-md text-white cursor-pointer hover:bg-orange-300 transition ease-linear disabled:opacity-50 disabled:cursor-auto text-lg">
            Cadastre-se</Button>
        </div>
        </form>
      </main>
    </div>
  );
}
