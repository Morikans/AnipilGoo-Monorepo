"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = void 0;
const storage_1 = require("@google-cloud/storage");
// Google Cloud Storageのインスタンスを作成
const storage = new storage_1.Storage({
    keyFilename: "ad-site-451110-6d6df175e6f7.json", // サービスアカウントキーのパス
    projectId: "ad-site-451110", // プロジェクトID
});
// バケットの名前
const bucketName = "adsite-article-images";
exports.bucket = storage.bucket(bucketName); // バケットオブジェクトをエクスポート
