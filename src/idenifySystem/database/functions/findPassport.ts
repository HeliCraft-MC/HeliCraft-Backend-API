import mysql from 'mysql2';
import database from '../database.config';
import {Passport} from '../database.types';
import connection from './mysqlConnect';

/**
 * Retrieves a user from the database based on their username.
 *
 * @param {string} username - The username of the user to find.
 * @return {Promise<Passport | null>} A promise that resolves with the user object if found, or null if not found.
 */
export default async function getPassportByUsername(username: string): Promise<Passport | null> {
  try {
    const result = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
      connection.execute(
        `SELECT * FROM ${database.tablePassport} WHERE NICKNAME = ?`,
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
      const passport: Passport = {
        passportId: result[0].passportId,
        nickname: result[0].nickname,
        passportIssuedBy: result[0].passportIssuedBy,
        stateOfIssue: result[0].stateOfIssue,
        issuedOn: result[0].issuedOn,
        arrestedIn: JSON.parse(result[0].arrestedIn),
        inPrison: JSON.parse(result[0].inPrison),
      };

      return passport;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}