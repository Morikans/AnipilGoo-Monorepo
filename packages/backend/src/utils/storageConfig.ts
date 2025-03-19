import { Storage } from "@google-cloud/storage";

// Google Cloud Storageのインスタンスを作成
const storage = new Storage({
  keyFilename: "ad-site-451110-6d6df175e6f7.json", // サービスアカウントキーのパス
  projectId: "ad-site-451110", // プロジェクトID
});

// バケットの名前
const bucketName = "adsite-article-images";

export const bucket = storage.bucket(bucketName); // バケットオブジェクトをエクスポート
