import database from "../database.config";
import findUser from "./findUser";
import bcrypt from "bcrypt";


function givePassword(username:string):string{
    const user = findUser(username);
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
export default function validatePassword(username:string, password:string):boolean{
    const HASH = givePassword(username);
    const result = bcrypt.compareSync(password, HASH);
    return result;
}