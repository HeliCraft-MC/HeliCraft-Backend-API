import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

/**
 * Retrieves a user from the database based on their username.
 *
 * @param {string} username - The username of the user to find.
 * @return {Promise<mysql.RowDataPacket | null>} A promise that resolves with the user object if found, or null if not found.
 */
export default async function getUserByUsername(username: string): Promise<mysql.RowDataPacket | null> {
  try {
    const result = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
      connection.execute(
        `SELECT * FROM ${database.database.table} WHERE ${database.database.columns.username} = ?`,
        [username],
        (err, result: mysql.RowDataPacket[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
