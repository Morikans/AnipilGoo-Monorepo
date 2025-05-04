"use client";
import React, { useRef, useState } from "react";
import { CropImageModal } from "../common";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HiOutlineXMark } from "react-icons/hi2";

export const Thumbnail = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isModalShow, setIsModalShow] = useState<boolean>(false); // モーダルの状態
  const [imageSrc, setImageSrc] = useState<string | null>(null); // 選択された元画像
  const [croppedImage, setCroppedImage] = useState<string | null>(null); // トリミング後の画像

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // FileReaderを使って選択した画像を一時的に読み込み
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string); // 読み込んだ画像をstateに保存
        setIsModalShow(true); // モーダルを表示
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (cropped: string) => {
    console.log("トリミング後の画像データ:", cropped);
    setCroppedImage(cropped); // トリミング結果を保存
  };

  const closeModal = () => {
    setIsModalShow(false);
    setImageSrc(null); // モーダルを閉じたときに画像をリセット
    if (inputRef.current) {
      inputRef.current.value = ""; // ファイル選択フィールドをリセット
    }
  };
  return (
    <div className="w-full">
      <p className="font-bold text-xl">サムネイル画像</p>

      {/* トリミング後の画像を表示 */}
      {croppedImage ? (
        <div className="relative mt-3 w-1/2">
          <img
            src={croppedImage}
            alt="トリミング後の画像"
            className="w-full mx-auto"
          />
          <button
            onClick={() => setCroppedImage(null)}
            className="cursor-pointer p-2 rounded-full bg-black/50 absolute right-3 top-3"
          >
            <HiOutlineXMark size={25} color="white" />
          </button>
        </div>
      ) : (
        <label className="cursor-pointer inline-block bg-black/70 p-3 rounded-full mt-3">
          <MdOutlineAddPhotoAlternate size={30} color="white" />
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {isModalShow && imageSrc && (
        <CropImageModal
          imageSrc={imageSrc}
          onClose={closeModal}
          onCrop={handleCrop} // トリミング結果を渡すための関数
        />
      )}
    </div>
  );
};
