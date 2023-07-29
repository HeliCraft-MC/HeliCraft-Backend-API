import { Router } from "express";

import indexRoute from "./indexRoute/route";
import loginRoute from "./loginRoute/route";
import skinUpload from "./skinUpload/route";

const router = Router();

router.use('/', indexRoute);
router.use('/', loginRoute);
router.use('/', skinUpload);

export default router;