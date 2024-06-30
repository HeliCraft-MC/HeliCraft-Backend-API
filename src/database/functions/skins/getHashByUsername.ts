import mysql from 'mysql2';
import database from '../../database.config';
import connection from '../mysqlConnect';

/**
 * Returning player's skin hash
 *
 * @param {string} hash - The skin hash of the user to find.
 * @return {Promise<string | null>} A promise that resolves with the hash if found, or null if not found.
 */
export default async function getHashByUsername(username: string): Promise<string | null> {
  try {
    const result = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
      connection.execute(
        `SELECT ${database.database.tables.skins.columns.hash} 
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
      return result[0][database.database.tables.skins.columns.hash];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
