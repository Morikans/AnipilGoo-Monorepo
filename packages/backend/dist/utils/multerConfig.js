"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const multerStorage = multer_1.default.memoryStorage(); // メモリに保存
exports.upload = (0, multer_1.default)({
    storage: multerStorage,
});
