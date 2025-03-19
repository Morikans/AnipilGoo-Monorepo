import { Request, Response, NextFunction } from "express";
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
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
