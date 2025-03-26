import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    // ユーザー情報をIDで取得
    const updatedUser = await prisma.user.update({
      where: { id }, // 更新するユーザー
      // 更新データ
      data: {
        name: name || undefined,
      },
    });

    res.status(200).json({
      message: "ユーザー情報のアップデートが完了しました",
      user: updatedUser,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "サーバーエラー" });
    return;
  }
};
