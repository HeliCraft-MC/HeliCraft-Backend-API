import database from '../../database.config';
import connection from '../mysqlConnect';

export default async function updateUserSkinHash(username: string, hash: string, last_updated: string): Promise<boolean> {
  try {
    const result = await connection.execute(
      `UPDATE ${database.database.tables.skins.name} 
      SET ${database.database.tables.skins.columns.hash} = ?, ${database.database.tables.skins.columns.last_updated} = ?
      WHERE ${database.database.tables.skins.columns.username} = ?`,
      [hash, last_updated, username]
    );

    console.log(`Updated row(s)`);

    return true;
  } catch (error) {
    console.error('Error updating values:', error);
    return false;
  }
};
