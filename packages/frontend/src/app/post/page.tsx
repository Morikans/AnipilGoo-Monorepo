"use client";
import "cropperjs/dist/cropper.css"; // CropperJSのCSSをインポート
import { Thumbnail } from "@/components";

const page = () => {

  return (
    <div className="w-2xl mx-auto flex">
      <Thumbnail />
    </div>
  );
};

export default page;
