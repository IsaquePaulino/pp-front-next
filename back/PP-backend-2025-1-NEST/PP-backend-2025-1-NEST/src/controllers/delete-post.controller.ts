import {
  Controller,
  Delete,
  ForbiddenException,
  NotFoundException,
  Param,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/post/:id")
@UseGuards(JwtAuthGuard)
export class DeletePostController {
  constructor(private prisma: PrismaService) {}

  @Delete()
  async handle(@CurrentUser() user: UserPayload, @Param("id") postId: string) {
    const userId = user.sub;

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

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
