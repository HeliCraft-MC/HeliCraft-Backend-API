import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';

const router = Router();
const skinPath = skinConfig.skins.path;

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

export default router;
