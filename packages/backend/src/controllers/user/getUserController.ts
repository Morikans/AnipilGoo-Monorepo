import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // ユーザー情報をIDで取得
    const user = await prisma.user.findUnique({
      where: { id },
    });

    // ユーザーが見つからなかった場合の処理
    if (!user) {
      res.status(404).json({ error: "ユーザーが見つかりません" });
      return;
    }

    // ユーザー情報をレスポンスとして返す
    res.status(200).json(user);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "サーバーエラー" });
    return;
  }
};
