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
exports.getArticles = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // /posts?page=2&pageSize=5に含まれるクエリパラメータを引数にしてページ数とページサイズを取得
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const offset = (page - 1) * pageSize;
        const articles = yield prisma.article.findMany({
            skip: offset,
            take: pageSize,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                tags: true,
            },
        });
        // 合計件数を取得
        const totalCount = yield prisma.article.count();
        res.json({
            data: articles,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / pageSize), // 切り上げ
                currentPage: page,
            },
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.getArticles = getArticles;
