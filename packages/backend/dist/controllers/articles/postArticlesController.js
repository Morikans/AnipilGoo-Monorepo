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
const prisma = new client_1.PrismaClient();
const postArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // /posts?page=2&pageSize=5に含まれるクエリパラメータを引数にしてページ数とページサイズを取得
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const { title, content, imageURL, tags } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "タイトルと本文は必須" });
        }
        // タグをデータベースに保存または既存タグを取得
        const tagRecords = yield Promise.all(tags.map((tagName) => __awaiter(void 0, void 0, void 0, function* () {
            let tag = yield prisma.tag.findUnique({
                where: { name: tagName },
            });
            // タグが存在しなければ作成
            if (!tag) {
                tag = yield prisma.tag.create({
                    data: { name: tagName },
                });
            }
            return tag;
        })));
        // 記事を作成し、タグを紐づけ
        const newArticle = yield prisma.article.create({
            data: {
                title,
                content,
                imageURL,
                tags: {
                    connect: tagRecords.map((tag) => ({ id: tag.id })), // 複数のタグに紐付け
                },
                clickCount: 0, // 初期のクリック数は 0
            },
            include: {
                tags: true, // 関連するタグもレスポンスに含める
            },
        });
        res.status(201).json(newArticle); // 作成成功時のレスポンス
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "記事の作成に失敗しました" });
    }
});
exports.postArticle = postArticle;
