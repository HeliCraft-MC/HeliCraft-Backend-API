import { Router, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import skinConfig from '../../config/skinSystem.json';

import getHashByUsername from '../../database/functions/skins/getHashByUsername'

const router = Router();
const skinPath = skinConfig.skins.path;

// Get hash of skin
router.get('/skinGetHash/:nickname', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nickname } = req.params;
    if (!nickname) {
      throw new Error('No nickname provided');
    }

    let hashTemp: string | null = await getHashByUsername(nickname);
    let hash: string;
    if(hashTemp) hash = hashTemp;
    else hash = "null";
    
    res.json({ "hash": hash });
  } catch (err) {
    next(err);
  }
});



export default router;
