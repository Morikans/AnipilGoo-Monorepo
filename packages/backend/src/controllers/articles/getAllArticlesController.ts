import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllArticles = async (req: Request, res: Response) => {
  // /posts?page=2&pageSize=5に含まれるクエリパラメータを引数にしてページ数とページサイズを取得
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  try {
    const offset = (page - 1) * pageSize;
    const articles = await prisma.article.findMany({
      skip: offset,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
      },
    });

    // 合計件数を取得
    const totalCount = await prisma.article.count();

    res.json({
      data: articles,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize), // 切り上げ
        currentPage: page,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
