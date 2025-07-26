'use server'
import { CadastroSchema } from "@/@types/cadastro"
import { api } from "@/lib/api"
import { AxiosError } from "axios"

export async function criaConta({ senha, email, nome }: CadastroSchema) {
  try {
    await api.post("/user", {
      email,
      nome,
      senha,
      foto_link: null
    })

  } catch (error: any) {
    if (error instanceof AxiosError) {
          if(error.response?.data.message) {
            const message = error.response?.data.message
            return { error: message}
          }
          return { error: "Erro ao se cadastrar: dados já usados em uma conta." }
        } else {
          return { error: "Erro ao se cadastrar: dados já usados em uma conta."}
        }
  }
}