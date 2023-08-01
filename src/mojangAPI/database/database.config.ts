import { dbMojangConfig } from "./database.types";
import mysqlConfig from "../../config/mojangAPI.json";

let database : dbMojangConfig;

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
            password: mysqlConfig.mysql.database.columns.password,
            UUID: mysqlConfig.mysql.database.columns.UUID,
            UUID_WR: mysqlConfig.mysql.database.columns.UUID_WR
        }
    }
}

export default database;