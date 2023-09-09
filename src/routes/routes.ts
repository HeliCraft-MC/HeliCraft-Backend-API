import { Router } from "express";

import indexRoute from "./indexRoute/route";
import loginRoute from "./loginRoute/route";
import skinUpload from "./skinUploadRoute/route";
import skinGetRoute from "./skinGetRoute/route";
import changePasswordRoute from "./changePasswordRoute/route";

import mojangAPI_getUUIDByUsername from "../mojangAPI/username-to-uuid/route";
import mojangAPI_getUsernameByUUID from "../mojangAPI/uuid-to-username/route";

import newPassport from "../idenifySystem/routes/passport/NewPassportRoute/route";
import getPassport from "../idenifySystem/routes/passport/GetPassportRoute/route";

const router = Router();



router.use('/', indexRoute);
router.use('/', loginRoute);
router.use('/', skinUpload);
router.use('/', skinGetRoute);
router.use('/', changePasswordRoute);

router.use('/', mojangAPI_getUUIDByUsername);
router.use('/', mojangAPI_getUsernameByUUID);

router.use('/', newPassport);
router.use('/', getPassport);

export default router;