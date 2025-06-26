import multer from 'multer';
const storage =  multer.memoryStorage();
export const singalUpload = multer({storage}).single("file");