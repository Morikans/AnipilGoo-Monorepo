"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./auth/registerController"), exports);
__exportStar(require("./auth/loginController"), exports);
__exportStar(require("./auth/refreshToken"), exports);
__exportStar(require("./user/getUserController"), exports);
__exportStar(require("./user/updateUserController"), exports);
__exportStar(require("./articles/getArticleController"), exports);
__exportStar(require("./articles/getAllArticlesController"), exports);
__exportStar(require("./articles/postArticleController"), exports);
__exportStar(require("./articles/clickArticleController"), exports);
