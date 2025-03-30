import React from "react";

interface Props {
  type:
    | "popularArticles"
    | "followArticles"
    | "latestArticles"
    | "latestComments";
}

export const SubTitle = ({ type }: Props) => {
  const typeOptions = {
    popularArticles: {
      title: "人気記事",
    },
    followArticles: {
      title: "フォロー",
    },
    latestArticles: {
      title: "最新記事",
    },
    latestComments: {
      title: "最新コメント",
    },
  };

  const { title } = typeOptions[type];

  return (
    <div>
      <h2 className="font-bold text-xl">{title}</h2>
    </div>
  );
};
