import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

// TODO 型をもっと厳格に
/**
 * ユーザー認証を行う関数
 */
export interface AuthenticatedRequest extends Request {
    user?: any;
}

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
export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.accessToken; // クッキーからアクセストークンを取ってくる
    if (!token) {
        res.status(401).json({
            error: "アクセストークンがcookieに存在しません",
        });
        return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "トークンが無効です" });
        }
        req.user = user; // トークンのデコード結果をリクエストオブジェクトに追加
        next();
    });
};
