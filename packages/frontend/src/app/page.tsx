import { HomeArticles } from "./components";

export default function Home() {
  return (
    <div>
      <HomeArticles type="popularArticles" />
      <HomeArticles type="followArticles" />
      <HomeArticles type="latestArticles" />
      <HomeArticles type="latestComments" />
    </div>
  );
}
