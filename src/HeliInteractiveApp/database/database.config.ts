import { dbConfigHCIAPP } from "./database.types";
import mysqlConfig from "../../config/HeliInteractiveAPP.json";

let database : dbConfigHCIAPP;

database = {
    host: mysqlConfig.mysql.host,
    port: mysqlConfig.mysql.port,
    user: {
        name: mysqlConfig.mysql.user,
        password: mysqlConfig.mysql.password
    },
    database: mysqlConfig.mysql.database
}

export default database;