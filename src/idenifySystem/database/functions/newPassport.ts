import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

/**
 * Generates a random 6-digit passport ID.
 *
 * @return {string} A 6-digit passport ID.
 */
function generatePassportId(): string {
  const min = 100000;
  const max = 999999;
  const passportId = Math.floor(Math.random() * (max - min + 1)) + min;
  return passportId.toString();
}

/**
 * Creates a new passport in the database with a unique 6-digit passport ID.
 *
 * @param {string} nickname - The nickname of the passport owner.
 * @param {string} passportIssuedBy - The issuer of the passport.
 * @param {string} stateOfIssue - The state of issue (citizenship) of the passport owner.
 * @param {Date} issuedOn - The date the passport was issued.
 * @return {Promise<string>} A promise that resolves with the generated passport number if the passport was successfully created.
 */
export default async function createPassport(
  nickname: string,
  passportIssuedBy: string,
  stateOfIssue: string,
  issuedOn: string
): Promise<string> {
  try {
    let passportId = generatePassportId();
    let result;

    // Check if the generated passport ID already exists in the database
    const checkQuery = `SELECT COUNT(*) AS count FROM ${database.tablePassport} WHERE passportId = ?`;
    let checkResult = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
      connection.execute(checkQuery, [passportId], (err, result: mysql.RowDataPacket[]) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // If the generated passport ID already exists, generate a new one until a unique ID is found
    while (checkResult[0].count > 0) {
      passportId = generatePassportId();
      checkResult = await new Promise<mysql.RowDataPacket[]>((resolve, reject) => {
        connection.execute(checkQuery, [passportId], (err, result: mysql.RowDataPacket[]) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    result = await new Promise<mysql.ResultSetHeader>((resolve, reject) => {
      connection.execute(
        `INSERT INTO ${database.tablePassport} (passportId, nickname, passportIssuedBy, stateOfIssue, issuedOn, arrestedIn, inPrison) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [passportId, nickname, passportIssuedBy, stateOfIssue, issuedOn, [], {}],
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
      return passportId;
    } else {
      throw new Error('Failed to create passport');
    }
  } catch (error) {
    throw error;
  }
}