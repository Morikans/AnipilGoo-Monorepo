import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { User, AuthApiError } from "@supabase/supabase-js";

interface UseAuth {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * サインアップ（メール登録）
   */
  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      console.log("サインアップ成功:", data);

      // ユーザーへ通知を追加（例: メール確認を促す文言）
      alert(
        "確認メールが送信されました！メール内のリンクをクリックして登録を完了してください。"
      );
    } catch (error) {
      if (error instanceof AuthApiError) {
        console.error("サインアップ エラー:", error.message);
        alert(error.message);
      }
    }
  };

  /**
   * サインイン（メールでログイン）
   * - メールが確認済みかどうかをチェックする
   */
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // エラーを処理
      if (error) {
        // メール未確認エラーが発生した場合
        if (error.message === "Email not confirmed") {
          // 任意のメッセージを表示
          alert(
            "メールアドレスが確認されていません。確認メールをご確認の上、認証を完了してください。"
          );
          return;
        }

        // 他のエラー処理
        throw error;
      }

      // ログイン成功時の処理
      setUser(data.user);
    } catch (error) {
      if (error instanceof AuthApiError) {
        console.error("サインイン エラー:", error.message);
        alert(error.message);
      }
    }
  };

  /**
   * サインアウト（ログアウト）
   */
  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  // 初期化と監視（ユーザー情報の取得と状態管理）
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // 認証状態の変化を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, signUp, signIn, signOut };
};

export default useAuth;
