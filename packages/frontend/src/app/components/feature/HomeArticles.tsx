import React from "react";
import { ArticleCard, SubTitle } from "../common";

interface Props {
  type:
    | "popularArticles"
    | "followArticles"
    | "latestArticles"
    | "latestComments";
}

export const HomeArticles = ({ type }: Props) => {
  const article = {
    title: "string",
    id: 1,
    animeName: "string",
    content: "string",
    thumbnailImageURL: "string",
    imageURLs: ["a"],
    clickCount: 1,
    createdAt: new Date('2024-11-12'),
    updatedAt: new Date(),
    likesCount: 1,
    commentsCount: 1,
    prefectureName: "string",
    cityName: "string",
    userId: "string",
  };
  const user = {
    email: "string",
    id: "string",
    name: "string",
    createdAt: new Date(),
    imageURL: "string",
  };
  return (
    <div>
      <SubTitle type={type} />
      <ArticleCard
        article={article}
        user={user}
      />
    </div>
  );
};
