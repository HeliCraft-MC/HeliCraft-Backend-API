import { Connection } from "mysql2/typings/mysql/lib/Connection";
import database from "../database.config";
import mysql from 'mysql2';
import { enabled } from '../../index';

let connectionTemp;

if(enabled) {
    const connectionUri = `mysql://${database.user.name}:${database.user.password}@${database.host}:${database.port}/${database.database.name}`;
    console.log(`Connecting to MySQL on ${connectionUri}`);
    connectionTemp = mysql.createConnection(connectionUri);
    console.log("Connected!");
} else {
    connectionTemp = null;
}

const connection = connectionTemp;
export default connection;