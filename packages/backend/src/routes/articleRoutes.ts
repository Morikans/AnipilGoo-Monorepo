import { upload } from "../utils/multerConfig";
import { clickArticle, getAllArticles, getArticleById, postArticle } from "../controllers";
import { authenticateToken } from "../middlewares/authenticateToken";
import express from "express";

const router = express.Router();

router.get("/get", getAllArticles);
router.get("/get/:id", getArticleById);
router.post("/post", upload.single("image"), authenticateToken, postArticle);
router.patch("/click/:id", authenticateToken, clickArticle);

export default router;
