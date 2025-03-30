import React from "react";
import { Article, User } from "@backend/types/prismaTypes";
import Link from "next/link";
import { FaMapMarkerAlt, FaRegHeart, FaRegComment } from "react-icons/fa";
import { daysAgoConvert } from "@/utils";

interface CardProps {
  article: Article;
  user: User;
}

export const ArticleCard = ({ article, user }: CardProps) => {
  console.log(article.createdAt);
  return (
    <Link href={`/article/${article.id}`}>
      <p>{article.animeName}</p>
      <img src={article.thumbnailImageURL} alt="" />
      <p>{article.title}</p>
      <FaMapMarkerAlt />
      <p>
        {article.prefectureName} {article.cityName}
      </p>
      <img src={user.imageURL} alt="" />
      <p>{user.name}</p>
      <p>{article.likesCount}</p>
      <p>{article.commentsCount}</p>
      <p>{daysAgoConvert(article.createdAt)}</p>
    </Link>
  );
};
