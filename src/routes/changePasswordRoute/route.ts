import { Router, Request, Response } from 'express';
import mainConfig from '../../config/main.json';
import { verifyToken } from '../../utils/token.utils';
import markdown from 'markdown-it';
import changePassword from '../../database/functions/changePassword';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/newPassword', async (req: Request, res: Response) => {
    const { nickname, password, token } = req.body;
    if(!(nickname && password && token)){
        res.status(400).send();
        return;
    }
    if(verifyToken(token, mainConfig.config.secret)){
        const HASH = await bcrypt.hash(password, 10);
        const result = await changePassword(nickname, HASH);
        if(result){
            res.status(200).send();
        } else {
            res.status(500).send();
        }
    } else {
        res.status(401).send();
    }
})

export default router;