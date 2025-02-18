import multer from "multer";

const storage = multer.memoryStorage(); // Store file in memory (RAM)

export const upload = multer({ storage });