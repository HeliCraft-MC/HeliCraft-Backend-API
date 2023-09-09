import { Router, Request, Response } from 'express';
import createPassport from '../../../database/functions/newPassport';
import axios from 'axios';

const router = Router();


router.post('/passport/new', async (req: Request, res: Response) => {
  const { nickname, passportIssuedBy, stateOfIssue } = req.body;
  let date:string;
  let year;
  let month;
  let day;
  try{
    axios.post('https://server-api.helicraft.ru/v1/placeholders/replace', 
  'message=%25rs_year_world%25&uuid=', {
      headers: {
        'Accept': 'application/json',
        'key': 'ujfvhsohdfsofapkfcolsjfbidsfgsjgposhgvis',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      year = response.data;
    })

    axios.post('https://server-api.helicraft.ru/v1/placeholders/replace', 
  'message=%25rs_month_world%25&uuid=', {
      headers: {
        'Accept': 'application/json',
        'key': 'ujfvhsohdfsofapkfcolsjfbidsfgsjgposhgvis',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      month = response.data;
    })

    axios.post('https://server-api.helicraft.ru/v1/placeholders/replace',
  'message=%25rs_day_world%25&uuid=', {
      headers: {
        'Accept': 'application/json',
        'key': 'ujfvhsohdfsofapkfcolsjfbidsfgsjgposhgvis',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
       day = response.data;
    })
    date = `${day}/${month}/${year}`;
    try {
      const result = await createPassport(nickname, passportIssuedBy, stateOfIssue, date);
      res.status(201).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});


const md = require('markdown-it')().use(require('markdown-it-multimd-table'), {
  multiline: true,
  rowspan: false,
  headerless: false,
  multibody: true,
  autolabel: true,
});

const docs = `
# Create Passport

This route is used to create a new passport in the database.

## Endpoint

\`POST /passport/new\`

## Parameters

| Name             | Type     | Description                                |
| ---------------- | -------- | ------------------------------------------ |
| \`nickname\`       | String   | The nickname of the passport owner.        |
| \`passportIssuedBy\` | String   | The issuer of the passport.                |
| \`stateOfIssue\`    | String   | The state of issue (citizenship).           |

## Response

If the passport is successfully created, the response will be with a code **201** and a JSON object with the following structure:

\`\`\`json
{
  true
}
\`\`\`

If an error occurs during the passport creation, the response will be with a code **500** and a JSON object with the following structure:

\`\`\`json
{
  "error": "Internal Server Error"
}
\`\`\`

`;

router.get('/docs/passport/new', async (req: Request, res: Response) => {
  res.send(md.render(docs));
});

export default router;