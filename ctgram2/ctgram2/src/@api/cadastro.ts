import { CadastroSchema } from "@/@types/cadastro";
import { toast } from "sonner";
import { criaConta } from "./cria_conta";
async function handleCadastro(data: CadastroSchema) {
    try {
      const { senha, confirma_senha } = data;
      if (senha !== confirma_senha) {
        console.info({error: "Senha e confirmar senha são diferentes."})
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
    } catch {}
  }
