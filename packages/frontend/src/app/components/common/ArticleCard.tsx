import React from "react";
import { Article, User } from "@backend/types/prismaTypes";
import Link from "next/link";
import { FaMapMarkerAlt, FaRegHeart, FaRegComment } from "react-icons/fa";
import { daysAgoConvert } from "@/utils";

export interface ArticleType extends Article {
  user: User;
}

export const ArticleCard = ({ article }: { article: ArticleType }) => {
  console.log(article.createdAt);
  return (
    <div className="rounded bg-secondary">
      <Link href={`/article/${article.id}`}>
        <p className="py-1 px-2 text-white">{article.animeName}</p>
        <img
          src={article.thumbnailImageURL}
          alt=""
          className="aspect-video object-cover"
        />
        <div className="bg-white p-2">
          <p>{article.title}</p>
          <div className="flex content-center gap-1">
            <FaMapMarkerAlt size={20} />
            <p>
              {article.prefectureName} {article.cityName}
            </p>
          </div>
          <img src={article.user.imageURL} alt="" />
          <p>{article.user.name}</p>
          <p>{article.likesCount}</p>
          <p>{article.commentsCount}</p>
          <p>{daysAgoConvert(article.createdAt)}</p>
        </div>
      </Link>
    </div>
  );
};
