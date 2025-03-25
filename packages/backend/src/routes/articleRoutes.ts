// import { upload } from "../utils/multerConfig";
import { upload } from "../middlewares/multerConfig";
import {
  clickArticle,
  getAllArticles,
  getArticleById,
  postArticle,
} from "../controllers";
import { authenticateSupabaseToken } from "../middlewares/authenticateSupabaseToken";
import express from "express";

const router = express.Router();

router.get("/get", getAllArticles);
router.get("/get/:id", getArticleById);
router.post(
  "/post",
  upload.array("files", 10),
  // authenticateSupabaseToken,
  postArticle
);
// ↑ "files" はリクエストボディのフォームデータキー
//       10 はアップロード可能なファイル数の上限
router.patch("/click/:id", authenticateSupabaseToken, clickArticle);

export default router;
