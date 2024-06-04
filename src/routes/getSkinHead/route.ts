import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';
import sharp from 'sharp';

const router = Router();
const skinPath = skinConfig.skins.path;

const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});

router.get('/skin/:nickname/head', async (req: Request, res: Response, next: NextFunction) => {
  console.log(`Skin head requested for ${req.params.nickname}`);
  try {
    const { nickname } = req.params;
    if (!nickname) {
      throw new Error('No nickname provided');
    }
    let skinFilePath = path.join(skinPath, `${nickname}.png`);
    if (nickname.split('.')[1] === 'png') {
      skinFilePath = path.join(skinPath, `${nickname}`);
    }
    if (!fs.existsSync(skinFilePath)) {
      skinFilePath = path.join(skinPath, `default.png`);
    }

    const headBuffer = await sharp(skinFilePath).extract({ left: 8, top: 8, width: 8, height: 8 }).toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(headBuffer);
  } catch (err) {
    next(err);
  }
});

router.get('/docs/skin/:nickname/head', (req: Request, res: Response) => {
  const inputString = `## Route: GET /skin/:nickname/head

  Retrieves the skin head image for the specified user nickname.

  ### URL Parameters
  - \`nickname\` (string): The nickname of the user.

  ### Response
  - If the skin image for the specified user exists:
    - Status code: 200 (OK)
    - Body: The skin image file

  - If the skin image for the specified user does not exist:
    - Status code: 200 (OK) with the default skin image
  `;
  res.send(md.render(inputString));
});


export default router;
