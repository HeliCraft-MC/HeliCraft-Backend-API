import { Router, Request, Response, NextFunction } from 'express';
import skinConfig from '../../config/skinSystem.json';
import mainConfig from '../../config/main.json';
import { verifyToken } from '../../utils/token.utils';
import multer from 'multer';
import sharp, { bool } from 'sharp';
import axios from 'axios';

import { file_md5 } from '../../utils/hash.utils';
import addNewSkin from '../../database/functions/skins/addNewSkin';
import isUserExists from '../../database/functions/skins/findUserByUsername';
import updateUserSkinHash from '../../database/functions/skins/updateUserSkinHash';


const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});

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

    if(!verifyToken(req.body.token, req.body.nickname, mainConfig.config.secret)) {
      res.status(401).send('Invalid token');
      return
    }

    // Resize the image to 128x128
    await sharp(req.file.path)
      .resize(64, 64)
      .toFile(`${skinPath}/${req.body.nickname}.png`);

    res.status(200).json({ message: 'File uploaded successfully' });

    // Generate skin hash for HeliCraftAutoSkin-Fabric-Client
    file_md5(`${skinPath}/${req.body.nickname}.png`).then(async (hash) => {
      await isUserExists(req.body.nickname).then((value) => {
        if(value) {
          return updateUserSkinHash(req.body.nickname, hash, String(Date.now()));
        } else {
          return addNewSkin(req.body.nickname, hash, String(Date.now()));
        }
      })
    });

    //integration for HeliCraftAutoSkin by Ktilis
    axios.get(`localhost:4418/update?player=${req.body.nickname}`).then((response) => {
      if(response.status === 200) return;
      console.warn(response);
    }).catch((err) => {
      console.warn(err);
    })
  } catch (err) {
    next(err);
  }
});

router.get('/docs/skin/upload', (req: Request, res: Response) => {
  const inputString = `## Route: POST /skin/upload

  Uploads a skin image for the specified user.

  ### Request Body
  - \`nickname\` (string): The nickname of the user.
  - \`token\` (string): The authentication token of the user.

  ### Form Data
  - \`file\`: The skin image file to be uploaded.

  ### Response
  - If the file is successfully uploaded and the token is valid:
    - Status code: 200 (OK)
    - Body: A JSON object with the message: 'File uploaded successfully'

  - If no file is uploaded:
    - Status code: 400 (Bad Request) with the message: 'No file uploaded'

  - If no nickname is provided:
    - Status code: 400 (Bad Request) with the message: 'No nickname provided'

  - If no token is provided:
    - Status code: 400 (Bad Request) with the message: 'No token provided'

  - If the provided token is invalid:
    - Status code: 401 (Unauthorized) with the message: 'Invalid token'
  `;
  res.send(md.render(inputString));
});

export default router;
