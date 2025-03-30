-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "cityName" TEXT NOT NULL DEFAULT '未設定',
ADD COLUMN     "commentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likesCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "prefectureName" TEXT NOT NULL DEFAULT '未設定',
ADD COLUMN     "thumbnailImageURL" TEXT NOT NULL DEFAULT '';
