"use client";
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css"; // CropperJSのCSSをインポート

const page = () => {
  const cropperRef = useRef<ReactCropperElement>(null); // Cropperの参照を保持
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // トリミング結果を取得する関数
  const getCroppedImage = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas(); // 切り取られた結果をキャンバスとして取得
      const croppedDataUrl = croppedCanvas.toDataURL("image/png"); // Base64形式として取得
      setCroppedImage(croppedDataUrl);
    }
  };

  return (
    <div>
      {/* 画像トリミングコンポーネント */}
      <Cropper
        src="./sample.png"
        style={{ height: 400, width: "100%" }} // Cropperの幅や高さを指定
        aspectRatio={16 / 9}
        minCropBoxWidth={200}
        dragMode="move"
        viewMode={1}
        ref={cropperRef} // CropperJSを参照
      />
      <button onClick={getCroppedImage}>トリミング結果を取得</button>

      {/* トリミング後の結果をプレビュー */}
      {croppedImage && (
        <div>
          <h3>トリミング結果:</h3>
          <img src={croppedImage} alt="Cropped Result" />
        </div>
      )}
    </div>
  );
};

export default page;
