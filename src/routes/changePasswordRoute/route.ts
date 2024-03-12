import { Router, Request, Response } from 'express';
import mainConfig from '../../config/main.json';
import { verifyToken } from '../../utils/token.utils';
import changePassword from '../../database/functions/changePassword';
import bcrypt from 'bcrypt';

const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});

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

router.get('/docs/newPassword', (req: Request, res: Response) => {
  const inputString = `## Route: POST /newPassword

  Changes the user's password.

  ### Request Body
  - \`nickname\` (string): The nickname of the user.
  - \`password\` (string): The new password to be set.
  - \`token\` (string): The authentication token of the user.
  
  ### Response
  - If the required parameters are missing:
    - Status code: 400 (Bad Request)
  
  - If the user is not authenticated or the token is invalid:
    - Status code: 401 (Unauthorized)
  
  - If the password change is successful:
    - Status code: 200 (OK)
  
  - If there was an error processing the password change:
    - Status code: 500 (Internal Server Error)
  `;
  res.send(md.render(inputString));
});