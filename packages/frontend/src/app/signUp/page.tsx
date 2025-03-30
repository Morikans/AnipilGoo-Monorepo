"use client";
import { AuthForm } from "@/components";
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
    <AuthForm formType="signUp" />
  );
};

export default page;
