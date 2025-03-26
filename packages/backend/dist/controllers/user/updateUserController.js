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
exports.updateUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    try {
        // ユーザー情報をIDで取得
        const updatedUser = yield prisma.user.update({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "サーバーエラー" });
        return;
    }
});
exports.updateUser = updateUser;
