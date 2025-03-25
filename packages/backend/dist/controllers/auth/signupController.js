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
exports.signup = void 0;
const utils_1 = require("../../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { data, error } = yield utils_1.supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error)
            throw error;
        // ユーザー情報をuserテーブルに保存
        const newProfile = yield prisma.user.create({
            data: {
                id: data.user.id, // Supabase Auth の User ID
                email: data.user.email,
            },
        });
        res.status(200).send({ message: "新規登録が完了しました！", data });
    }
    catch (err) {
        res.status(400).send({ error: err.message });
    }
});
exports.signup = signup;
