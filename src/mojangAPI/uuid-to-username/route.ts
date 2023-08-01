import getUsername from "../database/functions/getUsername";
import { userMojang } from "../database/database.types";

import { Router, Request, Response } from "express";

const md = require('markdown-it')()
.use(require('markdown-it-multimd-table'), {
  multiline:  true,
  rowspan:    false,
  headerless: false,
  multibody:  true,
  aotolabel:  true,
});


const router = Router();

router.get("/mojangAPI/getUsernameByUUID/:UUID", async (req: Request, res: Response) => {
    const UUID_WR = req.params.UUID;
    const result : userMojang | undefined = await getUsername(UUID_WR);

    if(result == undefined) {
        res.status(404);
        return
    } else {
        res.status(200).send(result);
    }
    
})

const docs = `### Route: GET /mojangAPI/getUsernameByUUID/:UUID

Retrieves the username associated with a given UUID.

#### Parameters
- \`UUID\` (string): The UUID of the user.

#### Response
- If the user is found:
  - Status code: 200 (OK)
  - Body: A JSON object representing the userMojang interface with the following properties:
    - \`username\` (string): The username of the user.
    - \`UUID\` (string): The UUID of the user.
    - \`UUID_WR\` (string): The UUID without separators.

- If the user is not found:
  - Status code: 404 (Not Found)

#### Example
\`\`\`http GET /mojangAPI/getUsernameByUUID/123e4567e89b12d3a456426614174000\`\`\`
#### Response
\`\`\`json { "username": "exampleusername", "UUID": "123e4567-e89b-12d3-a456-426614174000", "UUIDWR": "123e4567e89b12d3a456426614174000" }\`\`\`
`
router.get('/docs/mojangAPI/getUsernameByUUID', (req: Request, res: Response) => {
    res.send(md.render(docs));
})

export default router;