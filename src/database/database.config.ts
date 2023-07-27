import { dbConfig } from "./database.types";
import mysqlConfig from "../config/mysql.json";

let database : dbConfig;

database = {
    host: mysqlConfig.mysql.host,
    port: mysqlConfig.mysql.port,
    user: {
        name: mysqlConfig.mysql.user.name,
        password: mysqlConfig.mysql.user.password
    },
    database: {
        name: mysqlConfig.mysql.database.name,
        table: mysqlConfig.mysql.database.table,
        columns: {
            username: mysqlConfig.mysql.database.columns.username,
            password: mysqlConfig.mysql.database.columns.password
        }
    }
}

export default database;