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
exports.getArticleById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // URLパラメータから記事IDを取得
    const articleId = parseInt(req.params.id);
    // IDが無効な場合、400エラーを返す
    if (isNaN(articleId)) {
        res.status(400).json({ error: "記事IDが無効です" });
        return;
    }
    try {
        // Prismaを使って指定したIDの単体記事を取得
        const article = yield prisma.article.findUnique({
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
    }
    catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getArticleById = getArticleById;
