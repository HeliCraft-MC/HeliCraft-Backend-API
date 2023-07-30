import { Router } from "express";

import indexRoute from "./indexRoute/route";
import loginRoute from "./loginRoute/route";
import skinUpload from "./skinUploadRoute/route";
import skinGetRoute from "./skinGetRoute/route";

const router = Router();

router.use('/', indexRoute);
router.use('/', loginRoute);
router.use('/', skinUpload);
router.use('/', skinGetRoute);

export default router;