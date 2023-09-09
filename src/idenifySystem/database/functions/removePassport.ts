import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

/**
 * Removes a passport from the database based on the passport ID.
 *
 * @param {string} passportId - The ID of the passport to remove.
 * @return {Promise<boolean>} A promise that resolves with a boolean indicating if the passport was successfully removed.
 */
export default async function removePassport(passportId: string): Promise<boolean> {
  try {
    const result = await new Promise<mysql.ResultSetHeader>((resolve, reject) => {
      connection.execute(
        `DELETE FROM ${database.tablePassport} WHERE passportId = ?`,
        [passportId],
        (err, result: mysql.ResultSetHeader) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    if (result.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}