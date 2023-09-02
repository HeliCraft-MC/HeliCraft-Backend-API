import { Application } from "express";
import routes from './routes/routes';

import mainConfig from './config/main.json';

const port = mainConfig.config.port;

const express = require('express');
const app: Application = express();

//cors
import cors from 'cors';

app.use(cors({
    origin: ["https://helicraft.ru","https://vuebeta.helicraft.ru", "https://localhost:3000", "http://localhost:3000", "http://localhost:5173/", "https://localhost:5173"],
}));


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(routes);


app.listen(port, () => {
    console.log(`Server started on  http://localhost:${port}`);
})