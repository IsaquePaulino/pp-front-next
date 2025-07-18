import { Body, Controller, Patch, UseGuards, Get } from "@nestjs/common"; // <-- Adicionado 'Get' aqui
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editProfilePhotoSchema = z.object({
  foto: z.string(),
});

const bodyValidationSchema = new ZodValidationPipe(editProfilePhotoSchema);

type EditProfilePhotoSchema = z.infer<typeof editProfilePhotoSchema>;

@Controller("/photo")
@UseGuards(JwtAuthGuard)
export class EditProfilePhotoController {
  constructor(private prisma: PrismaService) {}

  // Endpoint PATCH existente (para atualizar a foto do perfil)
  @Patch()
  async handle(
    @Body(bodyValidationSchema) body: EditProfilePhotoSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { foto } = body;
    const userId = user.sub;

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        foto,
      },
    });
    return { foto }; // Opcional: retornar a foto atualizada
  }

  // NOVO ENDPOINT: Para OBTER a foto de perfil do usuário (GET /photo)
  @Get()
  async handleGetProfilePhoto(@CurrentUser() user: UserPayload) {
    const userId = user.sub;

    const userData = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        foto: true, // Seleciona apenas o campo 'foto'
      },
    });

    // Retorna a URL da foto salva ou um placeholder se não houver
    // Este placeholder é um domínio externo e precisa estar no next.config.ts do front.
    // Ou troque para um placeholder local como "/default-profile.png" se preferir.
    if (!userData || !userData.foto) {
      return { foto: "https://i.pinimg.com/736x/41/af/40/41af40966240f4b53abed779e59005ff.jpg" };
    }

    return { foto: userData.foto }; // Retorna a URL da foto do banco de dados
  }
}