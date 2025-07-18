import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/feed")
@UseGuards(JwtAuthGuard)
export class FetchPostsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const posts = await this.prisma.post.findMany({
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
