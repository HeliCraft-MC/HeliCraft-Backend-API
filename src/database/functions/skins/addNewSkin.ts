import database from '../../database.config';
import connection from '../mysqlConnect';

/**
 * Creates a new user in the database with the given username and hash.
 *
 * @param {string} username - The username of the new user.
 * @param {string} hash - The password of the new user.
 * @return {Promise<boolean>} A promise that resolves to true if the user was created successfully, or false otherwise.
 */
export default async function addNewSkin(username: string, hash: string, last_updated: string): Promise<boolean> {
    try {
        const result = await connection.execute(
            `INSERT INTO ${database.database.tables.skins.name} 
            (${database.database.tables.skins.columns.username}, 
            ${database.database.tables.skins.columns.hash},
            ${database.database.tables.skins.columns.last_updated}) 
            VALUES (?, ?, ?)`,
            [username, hash, last_updated],
        );
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
}