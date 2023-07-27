import checkPassword from "../database/functions/checkPassword";
import { createToken } from "./token.utils";


/**
 * Processes the authentication by checking the provided username and password against the stored credentials.
 * If the credentials are valid, a token is created using the given secret and returned.
 *
 * @param {string} username - The username to be authenticated.
 * @param {string} password - The password to be authenticated.
 * @param {string} secret - The secret used to create the token.
 * @return {any} The authentication token if the provided credentials are valid, otherwise false.
 */
export function proccessAuth(username:string, password:string, secret:string):any{
    const result = checkPassword(username, password);
    if(result){
        const token = createToken(username, password, secret);
        return token;
    }
    return false;
}