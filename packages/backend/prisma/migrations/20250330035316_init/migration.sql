-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
