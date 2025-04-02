"use client";
import React, { useState, useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css"; // Cropper.jsのスタイルをインポート

interface Props {
  imageSrc: string;
}

const TrimImage = ({ imageSrc }: Props) => {
  // トリミング後の画像データを保持するための状態
  const [cropData, setCropData] = useState("");
  // モーダルの表示・非表示を管理するための状態
  const [modalShow, setModalShow] = useState(false);
  // Cropperインスタンスへの参照を保持するためのref
  const cropperRef = useRef<ReactCropperElement>(null);

  // 画像のトリミングを処理する関数
  const handleCrop = () => {
    if (cropperRef.current) {
      // Cropperインスタンスを取得
      const cropper = cropperRef.current.cropper;
      // トリミング後の画像データを取得
      const croppedImage = cropper.getCroppedCanvas().toDataURL();
      // 画像データを状態にセット
      setCropData(croppedImage);
      // モーダルを表示
      setModalShow(true);
    }
  };

  return (
    <div className="col-md-6 col-12 mx-auto">
      {/* Cropperコンポーネントの表示 */}
      <Cropper
        src={imageSrc} // トリミング対象の画像のURL
        style={{ width: "100%" }} // スタイル設定: 幅を100%にする
        aspectRatio={1} // アスペクト比1:1に設定
        guides={false} // ガイド線を表示しない
        ref={cropperRef} // Cropperインスタンスへの参照を設定
        viewMode={1} // トリミングエリアが画像の外に出ないように設定
      />

      {/* トリミング実行ボタン */}
      <button
        className="col-md-auto col-12 btn btn-success mt-3"
        onClick={handleCrop}
      >
        これでくり抜く！
      </button>
    </div>
  );
};

export default TrimImage;
