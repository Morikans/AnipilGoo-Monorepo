"use client";
import { useForm } from "react-hook-form";
import { Thumbnail, Report } from "@/components";

interface Report {
  id: number;
  images: File[]; // 複数画像データ
  inputValue: string;
  place: string;
  previewUrls: string[];
}

export interface PostFormValues {
  title: string;
  animeName: string;
  region: string;
  reports: Report[];
}

const Page = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      animeName: "",
      region: "",
      reports: [
        {
          id: 1,
          images: [],
          inputValue: "",
          place: "",
          previewUrls: [],
        },
      ],
    },
  });

  const reports = watch("reports");

  // レポート追加
  const handleAddReport = () => {
    const newReport = {
      id: Date.now(),
      images: [],
      inputValue: "",
      place: "",
      previewUrls: [],
    };
    setValue("reports", [...reports, newReport]);
  };

  // レポート削除
  const handleDeleteReport = (index: number) => {
    setValue(
      "reports",
      reports.filter((_, i) => i !== index)
    );
  };

  // 画像変更処理
  const handleImageChange = (index: number, files: File[]) => {
    if (files) {
      const updatedReports = [...reports];
      const newPreviewUrls = files.map(
        (file) => URL.createObjectURL(file) // プレビューURLを生成
      );

      // images と previewUrls を同時に更新
      updatedReports[index].images = Array.from(files);
      updatedReports[index].previewUrls = newPreviewUrls;

      setValue("reports", updatedReports);
    }
  };

  const onSubmit = (data: PostFormValues) => {
    console.log("フォーム送信データ:", data);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Thumbnail />

        {/* レポート一覧 */}
        <div className="mt-8">
          {reports.map((report, index) => (
            <Report
              key={report.id}
              index={index}
              onImageChange={handleImageChange}
              onDelete={handleDeleteReport}
              register={register}
              errors={errors}
              reportData={report}
            />
          ))}
        </div>

        {/* レポート追加ボタン */}
        <div>
          <button
            type="button"
            onClick={handleAddReport}
            className="w-full border py-1 rounded mt-4 cursor-pointer text-4xl"
          >
            +
          </button>
        </div>

        {/* フォーム送信ボタン */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 cursor-pointer"
          >
            フォームを送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
