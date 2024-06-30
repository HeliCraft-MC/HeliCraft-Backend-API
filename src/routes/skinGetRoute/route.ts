import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';

import getUsernameByHash from '../../database/functions/skins/getUsernameByHash'

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

router.get('/skin/:nickname', (req: Request, res: Response, next: NextFunction) => {
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
    res.sendFile(skinFilePath);
  } catch (err) {
    next(err);
  }
});

// Get skin with hash
router.get('/skinHash/:hash', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { hash } = req.params;
    if (!hash) {
      throw new Error('No hash provided');
    }

    let nicknameTemp: string | null = await getUsernameByHash(hash);
    let nickname: string;
    if(nicknameTemp) nickname = nicknameTemp;
    else nickname = "default";

    let skinFilePath = path.join(skinPath, `${nickname}.png`);
    if (!fs.existsSync(skinFilePath)) {
      skinFilePath = path.join(skinPath, `default.png`);
    }
    res.sendFile(skinFilePath);
  } catch (err) {
    next(err);
  }
});


router.get('/docs/skin/:nickname', (req: Request, res: Response) => {
  const inputString = `## Route: GET /skin/:nickname

  Retrieves the skin image for the specified user nickname.

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

router.get('/docs/skinHash/:hash', (req: Request, res: Response) => {
  const inputString = `## Route: GET /skin/:nickname

  Retrieves the skin image for the specified user nickname.

  ### URL Parameters
  - \`hash\` (string): Hash of skin of user.

  ### Response
  - If the skin image for the specified hash exists:
    - Status code: 200 (OK)
    - Body: The skin image file

  - If the skin image for the specified hash does not exist:
    - Status code: 200 (OK) with the default skin image
  `;
  res.send(md.render(inputString));
});


export default router;
