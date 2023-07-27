import jwt from 'jsonwebtoken';

/**
 * Creates a token using the provided username, password, and secret.
 *
 * @param {string} username - The username to include in the token.
 * @param {string} password - The password to include in the token.
 * @param {string} secret - The secret key used to sign the token.
 * @return {string} The generated token.
 */
function createToken(username:string, password:string, secret:string):string{
    return jwt.sign({username, password}, secret, {expiresIn: '7d'});
}

/**
 * Verify if a token is valid using a secret.
 *
 * @param {string} token - The token to be verified.
 * @param {string} secret - The secret used to verify the token.
 * @return {boolean} Returns true if the token is valid, false otherwise.
 */
function verifyToken(token:string, secret:string):boolean{
    if(jwt.verify(token, secret)){
        return true;
    }
    return false;
}

export { createToken, verifyToken };