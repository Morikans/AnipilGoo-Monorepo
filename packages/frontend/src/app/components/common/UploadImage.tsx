"use client";
import { PostFormValues } from "@/post/page";
import { useState } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface Props<T extends FieldValues> {
  register: UseFormRegister<T>;
  maxFiles?: number;
  name: Path<T>;
  error?: string;
  index: number; // レポート番号を受け取る
  onChange: (index: number, files: File[]) => void; // レポート番号付きのonChange
}

export const UploadImage = <T extends FieldValues>({
  maxFiles = 4,
  error,
  name,
  register,
  index,
  onChange, // レポート番号付きのonChangeを受け取る
}: Props<T>) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    const totalImages = images.length + newFiles.length;
    if (totalImages > maxFiles) {
      alert(`アップロード可能な画像は最大 ${maxFiles} 枚までです。`);
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...newFiles];
      onChange(index, updatedImages); // 親コンポーネントにレポート番号と画像リストを送信
      return updatedImages;
    });

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newUrls]);
  };

  const handleRemoveImage = (removeIndex: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== removeIndex);
      onChange(index, updatedImages); // 親コンポーネントに変更を通知
      return updatedImages;
    });

    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== removeIndex));
  };

  return (
    <div>
      {images.length < maxFiles && (
        <label className="cursor-pointer inline-block bg-black/70 p-3 rounded-full mt-3">
          <MdOutlineAddPhotoAlternate size={30} color="white" />
          <input
            type="file"
            multiple
            className="hidden"
            {...register(name, {
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                handleFileChange(e);
                // React Hook FormのonChangeを呼び出す
                e.target.dispatchEvent(new Event("input", { bubbles: true }));
              },
            })}
          />
        </label>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {previewUrls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-4">
          {previewUrls.map((url, i) => (
            <div key={i} className="relative">
              <img
                src={url}
                alt={`プレビュー ${i + 1}`}
                className="w-full mx-auto object-cover rounded-lg border aspect-video"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(i)}
                className="cursor-pointer p-2 rounded-full bg-black/50 absolute right-3 top-3"
              >
                <HiOutlineXMark size={25} color="white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
