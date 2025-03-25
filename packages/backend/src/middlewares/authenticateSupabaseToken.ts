import { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // APIキー
const supabase = createClient(supabaseUrl, supabaseKey);

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
export const authenticateSupabaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  // const token = req.cookies.accessToken; // クッキーからアクセストークンを取ってくる
  if (!token) {
    res.status(401).json({
      error: "アクセストークンがcookieに存在しません",
    });
    return;
  }

  // トークンをSupabaseで検証
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    res.status(401).json({ error: "トークンが無効です" });
    return;
  }

  req.user = data.user; // 認証済みユーザー情報をリクエストに付与
  next();
};
