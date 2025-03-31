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
  const articles = createRandomArticles(4);
  return (
    <div>
      <SubTitle type={type} />
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2 mt-5 justify-center">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
};
