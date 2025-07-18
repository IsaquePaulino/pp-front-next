import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const editPostDescriptionSchema = z.object({
  description: z.string(),
});

const bodyValidationSchema = new ZodValidationPipe(editPostDescriptionSchema);

type EditPostDescriptionSchema = z.infer<typeof editPostDescriptionSchema>;

@Controller("/post/:id")
@UseGuards(JwtAuthGuard)
export class EditPostDescriptionController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param("id") postId: string,
    @Body(bodyValidationSchema) body: EditPostDescriptionSchema,
  ) {
    const userId = user.sub;
    const { description } = body;

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      throw new NotFoundException("Not found.");
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException("Not allowed.");
    }

    await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        description,
      },
    });
  }
}
