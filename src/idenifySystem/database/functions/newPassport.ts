import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

/**
 * Creates a new passport in the database.
 *
 * @param {string} nickname - The nickname of the passport owner.
 * @param {string} passportIssuedBy - The issuer of the passport.
 * @param {string} stateOfIssue - The state of issue (citizenship) of the passport owner.
 * @param {Date} issuedOn - The date the passport was issued.
 * @return {Promise<boolean>} A promise that resolves with a boolean indicating if the passport was successfully created.
 */
export default async function createPassport(
  nickname: string,
  passportIssuedBy: string,
  stateOfIssue: string,
  issuedOn: Date
): Promise<boolean> {
  try {
    const result = await new Promise<mysql.ResultSetHeader>((resolve, reject) => {
      connection.execute(
        `INSERT INTO ${database.tablePassport} (nickname, passportIssuedBy, stateOfIssue, issuedOn, arrestedIn, inPrison) VALUES (?, ?, ?, ?, ?, ?)`,
        [nickname, passportIssuedBy, stateOfIssue, issuedOn, [], {}],
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