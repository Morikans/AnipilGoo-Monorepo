"use client";
import { PostFormValues } from "@/post/page";
import React, { useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
  index: number;
}

export const TextArea = ({ register, errors, index }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      // 高さをリセットしてからスクロール高さを取得
      textareaRef.current.style.height = "auto"; // 高さをリセット
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 必要な高さを設定
    }
  };

  return (
    <label className="block mb-1">
      内容
      <textarea
        {...register(`reports.${index}.inputValue` as const, {
          required: "内容を入力してください",
        })}
        placeholder="内容を入力してください"
        ref={textareaRef} // テキストエリアのDOMを参照
        onInput={handleInput} // 入力時に高さを調整
        className="border p-2 w-full resize-none overflow-hidden" // `resize-none` は手動リサイズの無効化
        style={{ minHeight: "50px", lineHeight: "1.5" }} // 最小高さなどを設定
      />
      {errors.reports && errors.reports[index]?.inputValue && (
        <p className="text-red-500 text-sm">
          {errors.reports[index]?.inputValue?.message}
        </p>
      )}
    </label>
  );
};
