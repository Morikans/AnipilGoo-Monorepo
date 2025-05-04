import React from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  name: Path<T>;
  validation?: object;
  error?: string;
  text: string;
}

export const TextArea = <T extends FieldValues>({
  register,
  name,
  validation,
  error,
  text,
}: Props<T>) => {
  return (
    <label>
      <p className="font-bold">{text}</p>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <textarea
        {...register(name, validation)}
        placeholder="内容を入力してください"
        onInput={(e) => {
          const textarea = e.target as HTMLTextAreaElement;
          textarea.style.height = "auto"; // 高さをリセット
          textarea.style.height = `${textarea.scrollHeight}px`; // 必要な高さを設定
        }}
        className="bg-white w-full rounded-sm border border-gray-300 p-1 focus:outline-none transition duration-15 focus:bg-orange-50 focus:ring-2 focus:ring-orange-500/60 resize-none overflow-hidden"
        style={{ minHeight: "50px", lineHeight: "1.5" }}
      />
    </label>
  );
};
