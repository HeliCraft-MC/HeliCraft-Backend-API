import { Router, Request, Response, NextFunction } from 'express';
import getHashByUsername from '../../database/functions/skins/getHashByUsername'

const router = Router();

const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});

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

router.get('/docs/skinGetHash/:nickname', (req: Request, res: Response) => {
  const inputString = `## Route: GET /skin/:nickname

  Retrieves the skin image hash for the specified user nickname.

  ### URL Parameters
  - \`nickname\` (string): The nickname of the user.

  ### Response
  - If the skin image for the specified user exists:
    - Status code: 200 (OK)
    - Body: json with parameter hash

  - If the skin image for the specified user does not exist:
    - Status code: 200 (OK) with the default skin image
    - Body: json with nullable parameter hash
  `;
  res.send(md.render(inputString));
});



export default router;
