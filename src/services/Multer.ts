import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const profiledir = path.join(process.cwd(), 'uploads', file.fieldname);
    fs.mkdirSync(profiledir, { recursive: true });
    cb(null, profiledir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
