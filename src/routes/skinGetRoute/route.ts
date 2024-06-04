import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';

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
    let skinFilePath = path.join(skinPath, `${nickname}.png`);


    if (!fs.existsSync(skinFilePath)) {
        skinFilePath = path.join(skinPath, `default.png`);
    }
    res.sendFile(skinFilePath);
  } catch (err) {
    next(err);
  }
});

router.get('/skin/:nickname.png', (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.params;
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
router.get('/docs/skin/:nickname.png', (req: Request, res: Response) => {
  const inputString = `## Route: GET /skin/:nickname.png

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


export default router;
