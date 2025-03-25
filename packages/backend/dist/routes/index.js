"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRoutes = exports.authRoutes = void 0;
var authRoutes_1 = require("./authRoutes");
Object.defineProperty(exports, "authRoutes", { enumerable: true, get: function () { return __importDefault(authRoutes_1).default; } });
// export { default as userDataRoutes } from "./userDataRoutes";
var articleRoutes_1 = require("./articleRoutes");
Object.defineProperty(exports, "articleRoutes", { enumerable: true, get: function () { return __importDefault(articleRoutes_1).default; } });
