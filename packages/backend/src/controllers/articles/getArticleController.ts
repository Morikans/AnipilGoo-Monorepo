import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getArticleById = async (req: Request, res: Response) => {
  // URLパラメータから記事IDを取得
  const articleId = parseInt(req.params.id);

  // IDが無効な場合、400エラーを返す
  if (isNaN(articleId)) {
    res.status(400).json({ error: "記事IDが無効です" });
    return;
  }
  try {
    // Prismaを使って指定したIDの単体記事を取得
    const article = await prisma.article.findUnique({
      where: {
        id: articleId, // 一意なIDで検索
      },
      include: {
        tags: true, // 必要に応じて関連データを含める
      },
    });

    // 記事が見つからなかった場合、404エラーを返す
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }

    // 記事が見つかった場合はJSONで返す
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
