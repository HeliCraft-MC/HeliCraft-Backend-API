import { Router, Request, Response } from 'express';
import {getPassportByUsername, getPassportByPassportId} from '../../../database/functions/findPassport';

const router = Router();

router.get('/passport/get', async (req: Request, res: Response) => {
    const query = String(req.query.query)
    try{
        if (Number(req.query.option) === 0) {
            const result = await getPassportByUsername(query)
            if (result) res.status(200).send(result)
            else res.status(400).send()
          } else if (Number(req.query.option) === 1) {
            const result = await getPassportByPassportId(query)
            if (result) res.status(200).send(result)
            else res.status(400).send()
          } else res.status(400).send();
    } catch (error) {
        res.status(500).send(error)
    }
})


const md = require('markdown-it')().use(require('markdown-it-multimd-table'), {
  multiline: true,
  rowspan: false,
  headerless: false,
  multibody: true,
  autolabel: true,
});

const docs = `# Get Passport

This route is used to retrieve a passport from the database based on the provided query.

## Endpoint

\`GET /passport/get\`

## Parameters

| Name             | Type     | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| \`query\`          | String   | The query to search for a passport.         |
| \`option\`         | Number   | The option to specify the search type.      |

### Query Options

- \`0\`: Search by username
- \`1\`: Search by passport ID

## Response

If the passport is found, the response will be with a code **200** and a JSON object containing the passport details.

### Passport information structure

\`\`\`Passport {
  passportId: string;
  nickname: string;
  passportIssuedBy: string;
  stateOfIssue: string;
  issuedOn: Date;
  arrestedIn: string[];
  inPrison: {
    inPrison: boolean;
    state: string;
    by: string;
  };
} 
\`\`\`

If the passport is not found or an error occurs, the response will be with a code **400** or **500**, respectively.`

router.get('/docs/passport/get', async (req: Request, res: Response) => {
  res.send(md.render(docs));
});


export default router;