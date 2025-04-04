"use client";
import React, { useRef, useState } from "react";
import { CropImageModal } from "../common";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

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
    <div>
      <p>title</p>

      {/* トリミング後の画像を表示 */}
      {croppedImage ? (
        <div>
          <img
            src={croppedImage}
            alt="トリミング後の画像"
            className="w-4/5 mx-auto"
          />
          <button onClick={() => setCroppedImage(null)}>削除</button>
        </div>
      ) : (
        <label className="cursor-pointer inline-block">
          <MdOutlineAddPhotoAlternate size={30} className="" />
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
