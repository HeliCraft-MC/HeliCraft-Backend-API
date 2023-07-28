import database from "../database.config";
import findUser from "./findUser";
import bcrypt from "bcrypt";


async function givePassword(username:string): Promise<string> {
    const user = await findUser(username);
    const HASH = eval(`user.${database.database.columns.password}`);
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
  const HASH = await givePassword(username);
  const result = bcrypt.compareSync(password, HASH);
  return result;
}
