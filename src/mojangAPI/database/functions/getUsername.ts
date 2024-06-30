import database from "../database.config";
import { userMojang } from "../database.types";
import connection from "./mysqlConnect";
import mysql from 'mysql2';


/**
 * Retrieves user information from the database based on the UUID without separetions.
 * @param {string} UUID_WR - UUID without separetions, like '-'.
 * @returns {Promise<userMojang | undefined>} A Promise that resolves to a userMojang object containing the retrieved user information, or undefined if the user is not found.
 * @throws {Error} If there is an error retrieving the user information from the database.
 */
export default async (UUID_WR: string): Promise<userMojang | undefined> => {
    const user: userMojang = {
        username: "",
        UUID: "",
        UUID_WR: ""
    };
    try {
        const result = await new Promise<userMojang>((resolve, reject) => {
            if(connection)
                connection.execute(
                    `SELECT * FROM ${database.database.table} WHERE ${database.database.columns.UUID_WR} = ?`,
                    [UUID_WR],
                    (err, result: mysql.RowDataPacket[]) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            user.UUID_WR = UUID_WR;
                            user.username = result[0].username;
                            user.UUID = result[0].UUID;
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
