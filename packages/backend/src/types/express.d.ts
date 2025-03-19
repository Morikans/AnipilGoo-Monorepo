import { Request } from "express";
import { File } from "multer";

declare global {
    namespace Express {
        export interface Request {
            file?: File; // 単一ファイルの場合
            files?: File[]; // 複数ファイルの場合
        }
    }
}
