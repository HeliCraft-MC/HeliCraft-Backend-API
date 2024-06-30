import mysql from 'mysql2';
import database from '../../database.config';
import connection from '../mysqlConnect';

/**
 * Is user exists
 *
 * @param {string} username - The username of the user to find.
 * @return {Promise<mysql.RowDataPacket | null>} A promise that resolves true if the user was found, or null if not found.
 */
export default async function isUserExists(username: string): Promise<boolean> {
  try {
    const result = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
      connection.execute(
        `SELECT *
        FROM ${database.database.tables.skins.name} 
        WHERE ${database.database.tables.skins.columns.username} = ?`,
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
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}
