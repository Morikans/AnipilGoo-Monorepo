import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { bucket } from "../../utils/storageConfig"; // GCS設定をインポート

const prisma = new PrismaClient();

export const postArticle = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "タイトルと本文は必須" });
      return;
    }

    // ファイルがアップロードされていない場合
    if (!req.file) {
      res.status(400).json({ message: "画像ファイルが必要です。" });
      return;
    }

    const fileName = `${Date.now()}_${req.file.originalname}`; // 新しいファイル名
    // タグを配列に変換
    const tagsArray = tags.split(",").map((tag) => tag.trim()); // tagsが文字列の場合を想定

    // Google Cloud Storage にファイルをアップロード
    const blob = bucket.file(fileName);
    const blobStream = blob.createWriteStream({
      resumable: false, // 一括アップロードを行う
      contentType: req.file.mimetype, // MIMEタイプを指定
    });

    blobStream.on("error", (err) => {
      console.error("GCSアップロードエラー:", err);
      res.status(500).json({
        message: "画像のアップロードに失敗しました。",
      });
    });

    blobStream.on("finish", async () => {
      // GCSの公開URLを生成
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // タグデータベース処理
      const tagRecords = await Promise.all(
        tagsArray.map(async (tagName: string) => {
          // タグを取得するか、新規に作成
          let tag = await prisma.tag.findUnique({
            where: { name: tagName },
          });

          if (!tag) {
            tag = await prisma.tag.create({
              data: { name: tagName },
            });
          }

          return tag;
        })
      );

      // 記事の作成
      const newArticle = await prisma.article.create({
        data: {
          title,
          content,
          imageURL: publicUrl, // GCSのURLを保存
          tags: {
            connect: tagRecords.map((tag) => ({ id: tag.id })), // タグと関連付け
          },
          clickCount: 0, // 初期値 0
        },
        include: {
          tags: true, // タグ情報も含めて返す
        },
      });

      // 作成成功時のレスポンス
      res.status(201).json(newArticle);
    });

    // メモリから GCS にデータをストリームで送信
    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "記事の作成に失敗しました" });
  }
};
