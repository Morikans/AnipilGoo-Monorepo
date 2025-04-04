"use client";
import "cropperjs/dist/cropper.css"; // CropperJSのCSSをインポート
import { Thumbnail } from "@/components";

const page = () => {

  return (
    <div>
      <Thumbnail imageURL='./sample.png'/>
    </div>
  );
};

export default page;
