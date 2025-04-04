"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/signup", controllers_1.signup);
router.post("/login", controllers_1.login);
router.post("/logout", controllers_1.logout);
exports.default = router;
