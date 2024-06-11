import mysql from 'mysql2';
import database from '../database.config';
import connection from './mysqlConnect';

/**
 * Creates a new user in the database with the given username and password.
 *
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @return {Promise<boolean>} A promise that resolves to true if the user was created successfully, or false otherwise.
 */
export default async function createUser(username: string, password: string): Promise<boolean> {
    try {
        const result = await connection.execute(
            `INSERT INTO ${database.database.table} (${database.database.columns.username}, ${database.database.columns.password}) VALUES (?, ?)`,
            [username, password],
        );
        return true;
    } catch (error) {
        console.error('Error creating user:', error);
        return false;
    }
}