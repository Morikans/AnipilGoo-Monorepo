import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const clickArticle = async (req: Request, res: Response) => {
  const articleId = parseInt(req.params.id);

  try {
    // 指定された記事を検索
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      res.status(404).json({ message: "記事がみつかりません" });
      return;
    }

    // クリック数をインクリメント
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: { clickCount: article.clickCount + 1 }, // インクリメント
      select: { id: true, title: true, clickCount: true }, //返すデータ選択
    });

    res.status(200).json({
      message: "Click count updated",
      updatedArticle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "クリック数が更新されませんでした" });
  }
};
