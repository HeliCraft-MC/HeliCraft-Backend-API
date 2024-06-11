import { Router, Request, Response } from 'express';
import mainConfig from '../../config/main.json';
import { proccessAuth, register } from '../../utils/auth.utils';
import { verifyToken } from '../../utils/token.utils';


const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});


const router = Router();

// Authentication route
router.post('/auth', async (req: Request, res: Response) => {
  try {
    const { request, nickname, password, token } = req.body;
  console.log(req.body);

  if (request === "login") {
    if (nickname && password) {
      const result = await proccessAuth(nickname, password, mainConfig.config.secret);

      if (!result) {
        res.status(401).send();
      } else {
        res.status(200).send({
          token: result,
          username: nickname,
          expiresIn: '7d'
        });
      }
    } else {
      res.status(400).send();
    }
  } else if (request === "validate") {
    const result = verifyToken(token, nickname, mainConfig.config.secret);

    if (!result) {
      res.status(401).send();
    } else {
      res.status(200).send();
    }
  } else if (request === "register") {
    if (nickname && password) {
      const result = await register(nickname, password);
      if (!result) {
        res.status(400).send();
      } else {
        res.status(200).send();
      }
    } else {
      res.status(400).send();
    }
  }

  } catch (error) {
    res.status(400).send('e');
  }
});

// Documentation route
router.get('/docs/auth', (req: Request, res: Response) => {
  const inputString = `## Route: POST /auth

  Authenticates the user based on the provided credentials or validates an existing token.
  
  ### Request Body
  - \`request\` (string): The type of authentication request. Possible values: "login", "validate".
  - \`nickname\` (string): The nickname of the user.
  - \`password\` (string): The password of the user.
  - \`token\` (string): The authentication token to be validated.
  
  ### Response
  - If the request is "login" and the provided nickname and password are valid:
    - Status code: 200 (OK)
    - Body: A JSON object with the following properties:
      - \`token\` (string): The authentication token.
      - \`username\` (string): The nickname of the user.
      - \`expiresIn\` (string): The expiration duration of the token.
  
  - If the request is "login" and the provided nickname and password are invalid:
    - Status code: 401 (Unauthorized)
  
  - If the request is "validate" and the provided token is valid:
    - Status code: 200 (OK)
  
  - If the request is "validate" and the provided token is invalid:
    - Status code: 401 (Unauthorized)
  
  - If the request is "register" and the provided nickname and password are valid:
    - Status code: 200 (OK)
  
  - If the request is "register" and the provided nickname and password are invalid(user exists):
    - Status code: 400 (Bad Request)
  
  - If the request is missing any required parameters:
    - Status code: 400 (Bad Request)
  
  ### Example
  \`\`\`http POST /auth\`\`\`

  \`\`\`{ "request": "login", "nickname": "exampleuser", "password": "examplepassword" }\`\`\`

  ### Response
  \`json { "token": "exampletoken", "username": "exampleuser", "expiresIn": "7d" }\` `;
  res.send(md.render(inputString));
});

export default router;
