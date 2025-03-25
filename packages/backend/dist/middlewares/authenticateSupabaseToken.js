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
exports.authenticateSupabaseToken = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // APIキー
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
/**
 * 認証ミドルウェア
 * クライアントのクッキーからアクセストークンを取得し、
 * 有効な場合はリクエストオブジェクトにユーザー情報を追加する。
 * 無効な場合は `401` または `403` を返す。
 *
 * @param req - 認証を必要とするリクエストオブジェクト
 * @param res - レスポンスオブジェクト
 * @param next - 次のミドルウェア関数
 *
 * @throws {401} アクセストークンがクッキーに存在しない場合
 * @throws {403} アクセストークンが無効な場合
 */
const authenticateSupabaseToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // "Bearer <token>"
    // const token = req.cookies.accessToken; // クッキーからアクセストークンを取ってくる
    if (!token) {
        res.status(401).json({
            error: "アクセストークンがcookieに存在しません",
        });
        return;
    }
    // トークンをSupabaseで検証
    const { data, error } = yield supabase.auth.getUser(token);
    if (error || !(data === null || data === void 0 ? void 0 : data.user)) {
        res.status(401).json({ error: "トークンが無効です" });
        return;
    }
    req.user = data.user; // 認証済みユーザー情報をリクエストに付与
    next();
});
exports.authenticateSupabaseToken = authenticateSupabaseToken;
