import database from "../database.config";
import { userMojang } from "../database.types";
import connection from "./mysqlConnect";
import mysql from 'mysql2';


/**
 * Retrieves user information from the database based on the username.
 * @param {string} username - The username of the user to retrieve information for.
 * @returns {Promise<userMojang | undefined>} A Promise that resolves to a userMojang object containing the retrieved user information, or undefined if the user is not found.
 * @throws {Error} If there is an error retrieving the user information from the database.
 */
export default async (username: string): Promise<userMojang | undefined> => {
    const user: userMojang = {
        username: "",
        UUID: "",
        UUID_WR: ""
    };
    try {
        const result = await new Promise<userMojang>((resolve, reject) => {
            if(connection)
                connection.execute(
                    `SELECT * FROM ${database.database.table} WHERE ${database.database.columns.username} = ?`,
                    [username],
                    (err, result: mysql.RowDataPacket[]) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            user.username = username;
                            user.UUID = result[0].UUID;
                            user.UUID_WR = result[0].UUID_WR;
                            resolve(user);
                        }
                    }
                );
        });
        return result;
    } catch (error) { 
        console.error(error);
    }
};
