import mysql from 'mysql2';
import database from '../database.config';
import mysqlConfig from "../../../config/HeliInteractiveAPP.json";
import CreateMissingMYSQLTablesIfMissing from './CreateMissingMYSQLTablesIfMissing';


const connectionUri = `mysql://${database.user.name}:${database.user.password}@${database.host}:${database.port}/heliinteractiveapp`;
console.log(`Connecting to MySQL on ${connectionUri}`);
const connection = mysql.createConnection(connectionUri);

console.log("Connected!");
export default connection

if (mysqlConfig.enabled) {
    connection.connect();
    CreateMissingMYSQLTablesIfMissing();
}