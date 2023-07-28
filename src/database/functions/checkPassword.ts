import database from "../database.config";
import findUser from "./findUser";
import bcrypt from "bcrypt";


async function givePassword(username: string): Promise<string> {
    console.log(username);
    const user = await findUser(username);
    console.log(user);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const passwordProperty = database.database.columns.password;
    const HASH = eval(`user.${passwordProperty}`);
    console.log(HASH);
  
    if (!HASH) {
      throw new Error('Password not found');
    }
  
    return HASH;
  }

/**
 * Validates the password for a given username.
 *
 * @param {string} username - The username to validate the password for.
 * @param {string} password - The password to validate.
 * @return {boolean} Returns true if the password is valid, false otherwise.
 */
export default async function validatePassword(username: string, password: string): Promise<boolean> {
  console.log(username);
  const HASH = await givePassword(username);
  const result = bcrypt.compareSync(password, HASH);
  return result;
}
