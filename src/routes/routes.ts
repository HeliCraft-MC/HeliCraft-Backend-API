import { Router } from "express";

import indexRoute from "./indexRoute/route";
import loginRoute from "./authRoute/route";
import changePasswordRoute from "./changePasswordRoute/route";

import skinUpload from "./skinUploadRoute/route";
import skinGetRoute from "./skinGetRoute/route";
import getSkinHead from "./getSkinHead/route";
import skinGetHashRoute from "./skinGetHashRoute/route";

import mojangAPI_getUUIDByUsername from "../mojangAPI/username-to-uuid/route";
import mojangAPI_getUsernameByUUID from "../mojangAPI/uuid-to-username/route";

import router_hciapp from "../HeliInteractiveApp/routes/routes";


const router = Router();



router.use('/', indexRoute);
router.use('/', loginRoute);
router.use('/', changePasswordRoute);

router.use('/', skinUpload);
router.use('/', skinGetRoute);
router.use('/', getSkinHead);
router.use('/', skinGetHashRoute);

router.use('/', mojangAPI_getUUIDByUsername);
router.use('/', mojangAPI_getUsernameByUUID);

router.use('/', router_hciapp);

export default router;