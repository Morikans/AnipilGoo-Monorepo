import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid"; // ランダムなファイル名生成に使用

const prisma = new PrismaClient();

// S3クライアントの初期化
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!; // S3バケット名を環境変数に設定

export const postArticle = async (req: Request, res: Response) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files); // req.files にアップロードされたファイル情報
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: "タイトルと本文は必須です。" });
      return;
    }

    // ファイルがアップロードされていない場合
    if (!req.files || !req.files.length) {
      res.status(400).json({ message: "画像ファイルが必要です。" });
      return;
    }

    // Multerが処理した複数のファイルを取得
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    // タグを配列に変換
    const tagsArray = tags.split(",").map((tag) => tag.trim());

    // S3へのアップロード処理
    try {
      // 全ファイルをS3にアップロードし、URLを取得
      const uploadResults = await Promise.all(
        files.map(async (file) => {
          const fileName = `${uuidv4()}_${file.originalname}`; // ランダムなファイル名生成

          const uploadParams = {
            Bucket: BUCKET_NAME, // S3バケット名
            Key: fileName, // ファイル名
            Body: file.buffer, // ファイル内容
            ContentType: file.mimetype, // ファイルの MIME タイプ
          };

          const command = new PutObjectCommand(uploadParams);
          await s3Client.send(command);

          // S3 の公開URLを生成
          return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        })
      );

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
          imageURLs: uploadResults, // アップロードしたすべての画像のURLを保存
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
    } catch (err) {
      console.error("S3 アップロードエラー:", err);
      res.status(500).json({ message: "画像のアップロードに失敗しました。" });
      return;
    }
  } catch (error) {
    console.error("記事作成エラー:", error);
    res.status(500).json({ message: "記事の作成に失敗しました" });
  }
};
