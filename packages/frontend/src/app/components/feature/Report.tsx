"use client";

import { PostFormValues } from "@/post/page";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import { TextArea, UploadImage } from "../common";

// レポート型の定義
interface Report {
  id: number;
  image: File[]; // 複数画像データ
  inputValue: string;
  place: string;
}

// 個別レポートの単一コンポーネント
export const Report = ({
  report,
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
      <TextArea register={register} errors={errors} index={index} />

      {/* 聖地の場所フィールド */}
      <label className="block mb-1 mt-4">
        聖地の場所
        <input
          type="text"
          {...register(`reports.${index}.place` as const, {
            required: "聖地の場所を入力してください",
          })}
          placeholder="聖地の場所を入力"
          className="bg-white w-full rounded-sm border border-gray-300 p-1 focus:outline-none transition duration-15 focus:bg-orange-50 focus:ring-2 focus:ring-orange-500/60"
        />
        {errors.reports && errors.reports[index]?.place && (
          <p className="text-red-500 text-sm">
            {errors.reports[index]?.place?.message}
          </p>
        )}
      </label>

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
