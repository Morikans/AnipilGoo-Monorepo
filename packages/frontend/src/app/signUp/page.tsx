"use client";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const page = () => {
  const {
    register, // フィールドを登録
    handleSubmit, // フォームの送信を処理
    formState: { errors }, // バリデーションエラーを取得
  } = useForm<FormValues>();
  const { user, loading, signUp, signIn, signOut } = useAuth();

  const onSubmit = (data: FormValues) => {
    console.log(data); // フォームデータをログ出力（送信時）
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div>
          <label>
            email
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "正しいメールアドレスを入力してください",
                },
              })}
            />
          </label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">
            パスワード:
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "パスワードは必須です",
                minLength: {
                  value: 6,
                  message: "パスワードは6文字以上である必要があります",
                },
              })}
            />
          </label>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default page;
