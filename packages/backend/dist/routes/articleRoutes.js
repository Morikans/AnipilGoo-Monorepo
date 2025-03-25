"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { upload } from "../utils/multerConfig";
const multerConfig_1 = require("../middlewares/multerConfig");
const controllers_1 = require("../controllers");
const authenticateSupabaseToken_1 = require("../middlewares/authenticateSupabaseToken");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/get", controllers_1.getAllArticles);
router.get("/get/:id", controllers_1.getArticleById);
router.post("/post", multerConfig_1.upload.array("files", 10), 
// authenticateSupabaseToken,
controllers_1.postArticle);
// ↑ "files" はリクエストボディのフォームデータキー
//       10 はアップロード可能なファイル数の上限
router.patch("/click/:id", authenticateSupabaseToken_1.authenticateSupabaseToken, controllers_1.clickArticle);
exports.default = router;
