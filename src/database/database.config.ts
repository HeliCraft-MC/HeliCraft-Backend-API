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
        tables: {
            players: {
                name: mysqlConfig.mysql.database.tables.players.name,
                columns: {
                    username: mysqlConfig.mysql.database.tables.players.columns.username,
                    password: mysqlConfig.mysql.database.tables.players.columns.password
                }
            },
            skins: {
                name: mysqlConfig.mysql.database.tables.skins.name,
                columns: {
                    username: mysqlConfig.mysql.database.tables.skins.columns.username,
                    hash: mysqlConfig.mysql.database.tables.skins.columns.hash,
                    last_updated: mysqlConfig.mysql.database.tables.skins.columns.last_updated
                }
            }
        }
    }
}

export default database;