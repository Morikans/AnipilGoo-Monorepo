"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { Input, RegionInput, Thumbnail } from "@/components";

interface FormValues {
  title: string;
  animeName: string;
  region: string;
  reports: Report[];
}

interface Report {
  id: number; // 一意な ID
  image: string[]; // 複数画像
  inputValue: string; // テキスト入力
}

const Page = () => {
  // レポート（画像×複数 & テキストフィールド）
  const [reports, setReports] = useState<Report[]>([]);

  // react-hook-formのセットアップ
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  // フォーム送信時
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("フォームデータ:", data);
    console.log("動的レポートデータ:", reports);
  };

  // 動的に新しい「まとまり」を追加する
  const handleAddReport = () => {
    setReports([
      ...reports,
      {
        id: reports.length + 1, // 一意な ID
        image: [], // 初期画像リスト
        inputValue: "", // 初期入力値
      },
    ]);
  };

  const handleDeleteReport = (index: number) => {
    setReports((prevReports) => prevReports.filter((_, i) => i !== index));
  };

  // テキストフィールドの入力値を更新
  const handleInputChange = (index: number, value: string) => {
    const updatedReports = [...reports];
    updatedReports[index].inputValue = value;
    setReports(updatedReports);
  };

  // 画像の変更を反映
  const handleImageChange = (index: number, files: FileList | null) => {
    if (files && files.length > 0) {
      const updatedReports = [...reports];
      const fileURLs = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      ); // 画像のプレビューURLを生成
      updatedReports[index].image = fileURLs;
      setReports(updatedReports);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2xl mx-auto">
      <Thumbnail />

      {/* タイトル */}
      <div>
        <Input
          id="title"
          name="title"
          text="タイトル"
          register={register}
          validation={{
            required: "タイトルは必須です",
          }}
          error={errors.title?.message}
        />
      </div>

      {/* アニメ名 */}
      <div>
        <Input
          id="animeName"
          name="animeName"
          text="アニメ名"
          register={register}
          validation={{
            required: "アニメ名は必須です",
          }}
          error={errors.animeName?.message}
        />
      </div>

      {/* 動的生成されたレポート */}
      <div>
        {reports.map((report, index) => (
          <div key={report.id} className="border p-4 mb-4">
            <h2 className="font-bold text-lg mb-2">巡礼レポート {index + 1}</h2>

            {/* 画像アップロード */}
            <div className="mb-4">
              <label className="block mb-1">画像アップロード</label>
              <input
                type="file"
                multiple // 複数画像対応
                onChange={(e) => handleImageChange(index, e.target.files)}
                className="border p-2 w-full"
              />
              <div className="flex gap-2 mt-2">
                {report.image.map((imgSrc, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={imgSrc}
                    alt={`プレビュー ${imgIndex}`}
                    className="w-20 h-20 object-cover border"
                  />
                ))}
              </div>
            </div>

            {/* テキスト入力 */}
            <div>
              <label className="block mb-1">内容</label>
              <input
                type="text"
                value={report.inputValue}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder="内容を入力してください"
                className="border p-2 w-full"
              />
            </div>

            <button
              type="button"
              onClick={() => handleDeleteReport(index)}
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            >
              レポートを削除する
            </button>
          </div>
        ))}
      </div>

      {/* 地域入力 (RegionInputはそのまま利用可能と仮定) */}
      <div>
        <RegionInput id="region" name="region" register={register} />
      </div>

      {/* レポート追加ボタン */}
      <button
        type="button"
        onClick={handleAddReport}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        レポートを追加する
      </button>

      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-4"
      >
        フォーム送信
      </button>
    </form>
  );
};

export default Page;
