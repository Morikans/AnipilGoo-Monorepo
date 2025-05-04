"use client";
import { Input, TextArea, UploadImage } from "../common";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { PostFormValues } from "@/post/page";

// Report 型
interface Report {
  image: File[];
  inputValue: string;
  place: string;
}

export const Report = ({
  index,
  onDelete,
  register,
  errors,
  onImageChange,
}: {
  index: number;
  onDelete: (index: number) => void;
  register: UseFormRegister<PostFormValues>;
  errors: FieldErrors<PostFormValues>;
  onImageChange: (index: number, files: File[]) => void;
}) => {
  return (
    <div className="border p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">巡礼レポート {index + 1}</h2>

      {/* 画像アップロードコンポーネント */}
      <UploadImage
        name={`reports.${index}.image`}
        maxFiles={4}
        error={errors.reports?.[index]?.image?.message}
        register={register}
        onChange={onImageChange}
        index={index}
      />

      {/* 聖地の場所 */}
      <div className="mt-8">
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
      </div>

      {/* 内容 */}
      <div className="mt-8">
        <TextArea
          name={`reports.${index}.inputValue`}
          register={register}
          validation={{
            required: "内容を入力してください",
          }}
          error={errors.reports?.[index]?.inputValue?.message}
          text="説明"
        />
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
