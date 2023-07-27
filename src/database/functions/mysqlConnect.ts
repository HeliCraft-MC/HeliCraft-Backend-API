import database from "../database.config";
import mysql from 'mysql2';

const connectionUri = `mysql://${database.user.name}:${database.user.password}@${database.host}:${database.port}/${database.database.name}`;
const connection = mysql.createConnection(connectionUri);

export default connection;