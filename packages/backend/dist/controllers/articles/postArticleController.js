"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postArticle = void 0;
const client_1 = require("@prisma/client");
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid"); // ランダムなファイル名生成に使用
const prisma = new client_1.PrismaClient();
// S3クライアントの初期化
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION, // e.g., "us-east-1"
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const BUCKET_NAME = process.env.S3_BUCKET_NAME; // S3バケット名を環境変数に設定
const postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const files = req.files;
        // タグを配列に変換
        const tagsArray = tags.split(",").map((tag) => tag.trim());
        // S3へのアップロード処理
        try {
            // 全ファイルをS3にアップロードし、URLを取得
            const uploadResults = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
                const fileName = `${(0, uuid_1.v4)()}_${file.originalname}`; // ランダムなファイル名生成
                const uploadParams = {
                    Bucket: BUCKET_NAME, // S3バケット名
                    Key: fileName, // ファイル名
                    Body: file.buffer, // ファイル内容
                    ContentType: file.mimetype, // ファイルの MIME タイプ
                };
                const command = new client_s3_1.PutObjectCommand(uploadParams);
                yield s3Client.send(command);
                // S3 の公開URLを生成
                return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            })));
            // タグデータベース処理
            const tagRecords = yield Promise.all(tagsArray.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
                // タグを取得するか、新規に作成
                let tag = yield prisma.tag.findUnique({
                    where: { name: tagName },
                });
                if (!tag) {
                    tag = yield prisma.tag.create({
                        data: { name: tagName },
                    });
                }
                return tag;
            })));
            // 記事の作成
            const newArticle = yield prisma.article.create({
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
        }
        catch (err) {
            console.error("S3 アップロードエラー:", err);
            res.status(500).json({ message: "画像のアップロードに失敗しました。" });
            return;
        }
    }
    catch (error) {
        console.error("記事作成エラー:", error);
        res.status(500).json({ message: "記事の作成に失敗しました" });
    }
});
exports.postArticle = postArticle;
