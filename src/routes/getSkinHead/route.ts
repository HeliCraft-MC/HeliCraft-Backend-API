import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';
import sharp from 'sharp';
import { createCanvas, loadImage } from 'canvas';

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
    const headBuffer2 = await sharp(skinFilePath).extract({ left: 40, top: 8, width: 8, height: 8 }).toBuffer();

    const img = await loadImage(headBuffer);
    const img2 = await loadImage(headBuffer2);
    const canvas = createCanvas(256, 256);
    const ctx = canvas.getContext('2d');
    const pCanvas = createCanvas(16, 16);
    const pCtx = pCanvas.getContext('2d');

    pCtx.drawImage(img, 0, 0); // Draw the image on the canvas
    pCtx.drawImage(img2, 0, 0);

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const data = pCtx.getImageData(x, y, 1, 1).data;
        const r = data[0];
        const g = data[1];
        const b = data[2];
    
        for (let i = 0; i < 32; i++) {
          for (let j = 0; j < 32; j++) {
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x * 32 + i, y * 32 + j, 1, 1);
          }
        }
      }
    }

    const resizedHeadBuffer = canvas.toBuffer('image/png');

    res.set('Content-Type', 'image/png');
    res.send(resizedHeadBuffer);
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
