import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const createPostSchema = z.object({
  description: z.string().optional().nullable(),
  foto: z.string(),
});

const bodyValidationSchema = new ZodValidationPipe(createPostSchema);

type CreatePostSchema = z.infer<typeof createPostSchema>;

@Controller("/post")
@UseGuards(JwtAuthGuard)
export class CreatePostController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationSchema) body: CreatePostSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { description, foto } = body;
    const authorId = user.sub;

    await this.prisma.post.create({
      data: {
        foto,
        authorId,
        description,
      },
    });
  }
}
