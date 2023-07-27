import { Router } from "express";

import indexRoute from "./indexRoute/route";
import loginRoute from "./loginRoute/route";

const router = Router();

router.use('/', indexRoute);
router.use('/', loginRoute);

export default router;