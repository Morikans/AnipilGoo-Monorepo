"use client";

import { PostFormValues } from "@/post/page";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input, TextArea, UploadImage } from "../common";

// レポート型の定義
interface Report {
  id: number;
  image: File[]; // 複数画像データ
  inputValue: string;
  place: string;
}

// 個別レポートの単一コンポーネント
export const Report = ({
  index,
  onImageChange,
  onDelete,
  register,
  errors,
}: {
  report: Report;
  index: number;
  onImageChange: (index: number, files: File[]) => void;
  onDelete: (index: number) => void;
  register: UseFormRegister<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
}) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">巡礼レポート {index + 1}</h2>

      {/* 画像アップロード */}
      <UploadImage
        onChange={(files) => onImageChange(index, files)}
        errors={errors}
      />

      {/* 内容フィールド */}
      <TextArea
        register={register}
        name={`reports.${index}.inputValue`}
        validation={{
          required: "内容を入力してください", // 必須バリデーションのエラーメッセージ
        }}
        error={errors.reports?.[index]?.inputValue?.message}
        text="説明"
      />

      {/* 聖地の場所フィールド */}
      <Input
        id="region"
        text="聖地の場所"
        name={`reports.${index}.place`}
        register={register}
        validation={{
          required: "聖地の場所を入力してください",
        }}
        error={errors.reports?.[index]?.place?.message}
      />

      {/* 削除ボタン */}
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4 cursor-pointer"
      >
        このレポートを削除
      </button>
    </div>
  );
};
