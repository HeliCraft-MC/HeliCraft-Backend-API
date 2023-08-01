
import database from '../database.config';
import connection from './mysqlConnect';

export default async (username: string, HASH: string): Promise<boolean> => {
  try {
    const result = await connection.execute(
      `UPDATE ${database.database.table} SET ${database.database.columns.password} = ? WHERE ${database.database.columns.username} = ?`,
      [HASH, username]
    );

    

    console.log(`Updated  row(s)`);

    return true;
  } catch (error) {
    console.error('Error updating values:', error);
    return false;
  }
};
