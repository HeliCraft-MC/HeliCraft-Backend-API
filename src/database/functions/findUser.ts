import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

export default (username: string) => {
    connection.execute(`SELECT * FROM ${database.database.name} WHERE ${database.database.columns.username} = ''`, (err, result: mysql.RowDataPacket[]) => {
        if (err) {
            console.log(err);
        } else {
            return result[0];
        }
    });
}
