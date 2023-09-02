import { dbConfig } from "./database.types";
import mysqlConfig from "../../config/playerIdenify.json";

let database : dbConfig;

database = {
    host: mysqlConfig.mysql.host,
    port: mysqlConfig.mysql.port,
    user: {
        name: mysqlConfig.mysql.user.name,
        password: mysqlConfig.mysql.user.password
    },
    databaseName: mysqlConfig.mysql.db,
    tablePassport: mysqlConfig.tablePassport,
    tableStates: mysqlConfig.tableStates
}

export default database;