import React from "react";
import { ArticleCard, SubTitle } from "../common";
import { createRandomArticles } from "@/dummyData/dummyArticles";

interface Props {
  type:
    | "popularArticles"
    | "followArticles"
    | "latestArticles"
    | "latestComments";
}

export const HomeArticles = ({ type }: Props) => {
  const articles = createRandomArticles(3);
  return (
    <div>
      <SubTitle type={type} />
      {articles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </div>
  );
};
