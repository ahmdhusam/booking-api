import multer from 'multer';
import path from 'path';

export default {
  
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..','..','public'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path.basename(file.originalname, ext);

      cb(null, `${baseName}-${Date.now()}${ext}`)
    },
  })
};