import { Router, Request, Response, NextFunction } from 'express';
import skinConfig from '../../config/skinSystem.json';
import { verifyToken } from '../../utils/token.utils';
import multer from 'multer';
import sharp from 'sharp';

const router = Router();
const skinPath = skinConfig.skins.path;
const toRoot = skinConfig.skins.fromRoot;

const upload = multer({
  dest: 'temp/', // Temporary directory to store uploaded files
  limits: {
    fileSize: 2 * 1024 * 1024, // Maximum file size (2MB)
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG files are allowed'));
    }
  },
});

router.post('/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Resize the image to 128x128
    await sharp(req.file.path)
      .resize(128, 128)
      .toFile(`/${req.file.filename}.png`);

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
