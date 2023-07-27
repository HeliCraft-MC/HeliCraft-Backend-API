import { Application } from "express";
import routes from './routes/routes';

import mainConfig from './config/main.json';

const port = mainConfig.config.port;

const express = require('express');
const app: Application = express();

app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})