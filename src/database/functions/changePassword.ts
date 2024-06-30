import database from '../database.config';
import connection from './mysqlConnect';

export default async (username: string, HASH: string): Promise<boolean> => {
  try {
    const result = await connection.execute(
      `UPDATE ${database.database.tables.players.name} SET ${database.database.tables.players.columns.password} = ? WHERE ${database.database.tables.players.columns.username} = ?`,
      [HASH, username]
    );

    

    console.log(`Updated  row(s)`);

    return true;
  } catch (error) {
    console.error('Error updating values:', error);
    return false;
  }
};
