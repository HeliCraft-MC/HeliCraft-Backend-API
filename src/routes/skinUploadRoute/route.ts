import { Router, Request, Response, NextFunction } from 'express';
import skinConfig from '../../config/skinSystem.json';
import mainConfig from '../../config/main.json';
import { verifyToken } from '../../utils/token.utils';
import multer from 'multer';
import sharp from 'sharp';

const router = Router();
const skinPath = skinConfig.skins.path;
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

router.post('/skin/upload', upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      res.status(400).send('No file uploaded');
      return
    }
    if (!req.body.nickname) {
      res.status(400).send('No nickname provided');
      return
    }
    if (!req.body.token) {
      res.status(400).send('No token provided');
      return
    }

    if(!verifyToken(req.body.token, mainConfig.config.secret)) {
      res.status(401).send('Invalid token');
      return
    }

    // Resize the image to 128x128
    await sharp(req.file.path)
      .resize(64, 64)
      .toFile(`${skinPath}/${req.body.nickname}.png`);

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;
