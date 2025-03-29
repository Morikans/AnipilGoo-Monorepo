"use client";
import { useState } from "react";
import { supabase } from "../utils/supabase";

const page = () => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const resendVerification = async () => {
    setSending(true);
    try {
      // ログイン中のユーザー情報を取得する
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data?.user?.email) {
        setMessage(
          "ユーザー情報の取得に失敗しました。再度ログインしてください。",
        );
        return;
      }

      const email = data.user.email;

      // メール再送信リクエスト
      const { error } = await supabase.auth.resend({
        email: email,
        type: "signup", // 新規登録メール再送
      });

      if (error) throw error;

      setMessage("確認メールを再送信しました。メールをご確認ください。");
    } catch (error) {
      console.error("再送信エラー:", error);
      setMessage("メールの再送信に失敗しました。もう一度お試しください。");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <h1>メール確認が必要です</h1>
      <p>
        登録したメールアドレスに確認メールが送信されています。確認リンクをクリックしてください。
      </p>
      <button onClick={resendVerification} disabled={sending}>
        {sending ? "送信中..." : "確認メールを再送信"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default page;
