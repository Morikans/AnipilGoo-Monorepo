import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, GoogleButton } from "../common";

interface FormValues {
  email: string;
  password: string;
}

interface ButtonProps {
  formType: "login" | "signUp";
}

export const LoginForm = ({ formType }: ButtonProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>{formType === "signUp" ? "新規登録" : "ログイン"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10">
        {/* Email の Input */}
        <Input
          id="email"
          text="メールアドレス"
          type="email"
          name="email"
          register={register}
          validation={{
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "正しいメールアドレスを入力してください",
            },
          }}
          error={errors.email?.message}
        />

        {/* Password の Input */}
        <div className="mt-7 flex items-center">
          <Input
            id="password"
            text="パスワード"
            type="password"
            name="password"
            register={register}
            validation={{
              required: "パスワードは必須です",
              minLength: {
                value: 6,
                message: "パスワードは6文字以上で入力してください",
              },
            }}
            error={errors.password?.message}
            mask={true}
          />
        </div>
        <GoogleButton text="Googleでログイン"/>
        <div className="mt-7">
          <Button text="送信" btnColor="blown" />
        </div>
      </form>
    </div>
  );
};
