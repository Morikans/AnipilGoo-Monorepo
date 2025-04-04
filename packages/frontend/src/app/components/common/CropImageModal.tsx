"use client";
import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css"; // Cropper.jsのスタイルをインポート

interface Props {
  imageSrc: string;
  onClose: () => void;
  onCrop: (croppedIMage: string) => void;
}

export const CropImageModal = ({ imageSrc, onClose, onCrop }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null); // Cropperの参照を保持
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // 画像のトリミングを処理する関数
  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas(); // 切り取られた結果をキャンバスとして取得
      const croppedDataUrl = croppedCanvas.toDataURL("image/png"); // Base64形式として取得
      onCrop(croppedDataUrl); // トリミング結果を親に渡す
      onClose(); // モーダルを閉じる
    }
  };

  return (
    // TODO モーダルサイズ調整必要かも
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-50">
      {/* Cropperコンポーネントの表示 */}
      <Cropper
        src={imageSrc}
        className="w-full "
        aspectRatio={16 / 9}
        guides={false} // ガイド線を表示しない
        ref={cropperRef} // Cropperインスタンスへの参照を設定
        viewMode={1} // トリミングエリアが画像の外に出ないように設定
        dragMode="move"
        minCropBoxWidth={200}
      />

      {/* トリミング実行ボタン */}
      <button
        className="col-md-auto col-12 btn btn-success mt-3"
        onClick={handleCrop}
      >
        トリミング
      </button>
      <button onClick={onClose}>閉じる</button>
    </div>
  );
};
