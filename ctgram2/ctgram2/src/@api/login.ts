"use server";
import { LoginSchema } from "@/@types/login";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export async function login(data: LoginSchema) {
  try {
    const response = await api.post("/login", data);
    const token = response.data.token;
    return token;

  } catch (error: any) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        const message = error.response?.data.message;
        return { error: message };
      }
      return {
        error:
          "Erro ao realizar login: credenciais estão erradas ou não cadastradas.",
      };
    } else {
      return {
        error:
          "Erro ao realizar login: credenciais estão erradas ou não cadastradas.",
      };
    }
  }
}