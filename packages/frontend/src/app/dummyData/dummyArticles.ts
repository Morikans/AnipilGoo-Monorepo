import { ArticleType } from "@/components";
import { User } from "@backend/types/prismaTypes";
import { fakerJA as faker } from "@faker-js/faker";

// ユーザーを生成する関数
const createRandomUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
  imageURL: faker.image.avatar(),
});

// 記事を生成する関数
const createRandomArticle = (): ArticleType => ({
  id: faker.number.int(),
  title: faker.lorem.sentence(),
  animeName: faker.lorem.words(2),
  content: faker.lorem.paragraph(),
  thumbnailImageURL: faker.image.avatar(),
  imageURLs: [faker.image.dataUri()],
  clickCount: faker.number.int({ min: 1, max: 100 }),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  likesCount: faker.number.int({ min: 1, max: 100 }),
  commentsCount: faker.number.int({ min: 1, max: 50 }),
  prefectureName: faker.location.state(),
  cityName: faker.location.city(),
  userId: faker.string.uuid(),
  user: createRandomUser(),
});

export const createRandomArticles = (count: number): ArticleType[] => {
  return Array.from({ length: count }, () => createRandomArticle());
};
