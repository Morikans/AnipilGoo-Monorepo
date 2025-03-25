import { User } from "@supabase/supabase-js"; // SupabaseのUser型を使用

declare global {
  namespace Express {
    export interface Request {
      user?: User; // ユーザー情報を型として追加
      files?:
        | { [fieldname: string]: Express.Multer.File[] }
        | Express.Multer.File[];
    }
  }
}
