import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

export default (username: string) => {
  return new Promise((resolve, reject) => {
    connection.execute(`SELECT * FROM ${database.database.table} WHERE ${database.database.columns.username} = '${username}'`, (err, result: mysql.RowDataPacket[]) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
}
