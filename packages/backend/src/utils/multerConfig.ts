import multer from "multer";

const multerStorage = multer.memoryStorage(); // メモリに保存

export const upload = multer({
  storage: multerStorage,
});
