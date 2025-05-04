"use client";
import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface Props {
  onChange: (files: File[]) => void; // 親へファイル情報を渡す
  maxFiles?: number;
}

/**
 * 画像アップロードコンポーネント
 * @param multiple 複数選択かどうか
 * @param onChange ファイル選択時に呼び出されるコールバック関数
 */
export const UploadImage = ({
  onChange,
  maxFiles = 4,
}: Props) => {
  const [images, setImages] = useState<File[]>([]); // ファイル情報
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // ファイルURL
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // FileList を配列に変換し、状態に追加
    const newFiles = Array.from(e.target.files);

    // 合計ファイル数が制限を超える場合は処理を中断
    if (images.length + newFiles.length > maxFiles) {
      setError(`画像は最大${maxFiles}枚まで添付できます。`);
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);

    // 新たに選択されたファイルのプレビュー URL を生成
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
    setError(null);

    // 必要に応じて外部へ選択されたファイルを渡す
    if (onChange) {
      onChange([...images, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    // 指定した画像を削除
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    setError(null);
  };

  return (
    <div>
      {images.length < maxFiles && (
        <label className="cursor-pointer inline-block bg-black/70 p-3 rounded-full mt-3">
          <MdOutlineAddPhotoAlternate size={30} color="white" />
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* エラーメッセージ */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* プレビュー画像の表示 */}
      {previewUrls.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              {/* プレビュー画像 */}
              <img
                src={url}
                alt={`プレビュー ${index + 1}`}
                className="w-full mx-auto object-cover rounded-lg border aspect-video"
              />
              {/* 画像削除ボタン */}
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
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
