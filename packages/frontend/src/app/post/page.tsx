"use client";

import { useForm } from "react-hook-form";
import { Thumbnail, Report } from "@/components";

interface Report {
  id: number;
  image: File[]; // 複数画像データ
  inputValue: string;
  place: string;
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
          image: [],
          inputValue: "",
          place: "",
        },
      ],
    },
  });

  const reports = watch("reports");

  // レポート追加
  const handleAddReport = () => {
    const newReport = {
      id: Date.now(),
      image: [],
      inputValue: "",
      place: "",
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
  const handleImageChange = (index: number, files: FileList | null) => {
    if (files) {
      const updatedReports = [...reports];
      updatedReports[index].image = Array.from(files); // ファイルリストを配列化
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
        {reports.map((report, index) => (
          <Report
            key={report.id}
            report={report}
            index={index}
            onImageChange={handleImageChange}
            onDelete={handleDeleteReport}
            register={register}
            errors={errors}
          />
        ))}

        {/* レポート追加ボタン */}
        <button
          type="button"
          onClick={handleAddReport}
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
          レポートを追加する
        </button>

        {/* フォーム送信ボタン */}
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded mt-4"
        >
          フォームを送信
        </button>
      </form>
    </div>
  );
};

export default Page;
