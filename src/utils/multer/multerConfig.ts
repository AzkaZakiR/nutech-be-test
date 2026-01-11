import multer from "multer";

export const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 10 * 1024 * 1024,
   },
   fileFilter: (_, file, cb) => {
      const allowedMimeTypes = ["image/jpeg", "image/png"];

      if (!allowedMimeTypes.includes(file.mimetype)) {
         return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Hanya file JPEG dan PNG yang diizinkan"));
      }

      cb(null, true);
   },
});
