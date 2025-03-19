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
exports.clickArticle = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const clickArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const articleId = parseInt(req.params.id);
    try {
        // 指定された記事を検索
        const article = yield prisma.article.findUnique({
            where: { id: articleId },
        });
        if (!article) {
            res.status(404).json({ message: "記事がみつかりません" });
            return;
        }
        // クリック数をインクリメント
        const updatedArticle = yield prisma.article.update({
            where: { id: articleId },
            data: { clickCount: article.clickCount + 1 }, // インクリメント
            select: { id: true, title: true, clickCount: true }, //返すデータ選択
        });
        res.status(200).json({
            message: "Click count updated",
            updatedArticle,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "クリック数が更新されませんでした" });
    }
});
exports.clickArticle = clickArticle;
