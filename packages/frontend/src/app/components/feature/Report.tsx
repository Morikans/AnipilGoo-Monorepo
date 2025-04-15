"use client";

import { PostFormValues } from "@/post/page";
import { FieldErrors, UseFormRegister } from "react-hook-form";

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
  onImageChange: (index: number, files: FileList | null) => void;
  onDelete: (index: number) => void;
  register: UseFormRegister<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
}) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">巡礼レポート {index + 1}</h2>

      {/* 画像アップロード */}
      <div className="mb-4">
        <label className="block mb-1">画像アップロード</label>
        <input
          type="file"
          multiple
          onChange={(e) => onImageChange(index, e.target.files)} // ファイル操作
          className="border p-2 w-full"
        />
        <div className="flex gap-2 mt-2">
          {report.image.map((file, imgIndex) => (
            <img
              key={imgIndex}
              src={URL.createObjectURL(file)} // ファイルのプレビュー
              alt={`プレビュー ${imgIndex}`}
              className="w-20 h-20 object-cover border"
            />
          ))}
        </div>
      </div>

      {/* 内容フィールド */}
      <div>
        <label className="block mb-1">内容</label>
        <input
          type="text"
          {...register(`reports.${index}.inputValue` as const, {
            required: "内容を入力してください",
          })}
          placeholder="内容を入力してください"
          className="border p-2 w-full"
        />
        {errors.reports && errors.reports[index]?.inputValue && (
          <p className="text-red-500 text-sm">
            {errors.reports[index]?.inputValue?.message}
          </p>
        )}
      </div>

      {/* 聖地の場所フィールド */}
      <div>
        <label className="block mb-1 mt-4">聖地の場所</label>
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
      </div>

      {/* 削除ボタン */}
      <button
        type="button"
        onClick={() => onDelete(index)}
        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
      >
        このレポートを削除
      </button>
    </div>
  );
};
