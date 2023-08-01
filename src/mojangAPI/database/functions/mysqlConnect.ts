import database from "../database.config";
import mysql from 'mysql2';



const connectionUri = `mysql://${database.user.name}:${database.user.password}@${database.host}:${database.port}/${database.database.name}`;
console.log(`Connecting to MySQL on ${connectionUri}`);
const connection = mysql.createConnection(connectionUri);
console.log("Connected!");
export default connection;