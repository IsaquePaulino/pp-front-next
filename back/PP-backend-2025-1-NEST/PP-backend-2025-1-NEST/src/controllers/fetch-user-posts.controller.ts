import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/auth/current-user-decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserPayload } from "src/auth/jwt.strategy";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/my-posts")
@UseGuards(JwtAuthGuard)
export class FetchUserPostsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const authorId = user.sub;

    const posts = await this.prisma.post.findMany({
      where: {
        authorId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return {
      posts: posts.map((item) => {
        return {
          foto: item.foto,
          description: item.description,
          posted_at: item.createdAt,
          post_id: item.id,
          username: item.user.username,
        };
      }),
    };
  }
}
