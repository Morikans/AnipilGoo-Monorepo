"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multerConfig_1 = require("../utils/multerConfig");
const controllers_1 = require("../controllers");
const authenticateToken_1 = require("../middlewares/authenticateToken");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/get", controllers_1.getAllArticles);
router.get("/get/:id", controllers_1.getArticleById);
router.post("/post", multerConfig_1.upload.single("image"), authenticateToken_1.authenticateToken, controllers_1.postArticle);
router.patch("/click/:id", authenticateToken_1.authenticateToken, controllers_1.clickArticle);
exports.default = router;
