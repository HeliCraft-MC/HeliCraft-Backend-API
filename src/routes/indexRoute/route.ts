import { Router, Request, Response } from 'express';
import mainConfig from '../../config/main.json';

const name = mainConfig.config.name;
const version = mainConfig.doNotChange.version;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`${name} version ${version}`);
});

export default router;
