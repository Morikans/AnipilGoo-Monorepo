import { HomeArticles } from "./components";

export default function Home() {
  return (
    <div className="space-y-16">
      <HomeArticles type="popularArticles" />
      <HomeArticles type="followArticles" />
      <HomeArticles type="latestArticles" />
      <HomeArticles type="latestComments" />
      <HomeArticles type="monthlyAnimeArticleRanking" />
    </div>
  );
}
