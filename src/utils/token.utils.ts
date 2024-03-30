import jwt, { JwtPayload } from 'jsonwebtoken';

/**
 * Creates a token using the provided username, password, and secret.
 *
 * @param {string} username - The username to include in the token.
 * @param {string} secret - The secret key used to sign the token.
 * @return {string} The generated token.
 */
function createToken(username: string, secret: string): string {
  if (!username) {
    throw new Error('Username was null or undefined');
  }
  if (!secret) {
    throw new Error('Secret was null or undefined');
  }

  return jwt.sign({ username }, secret, { expiresIn: '7d' });
}

/**
 * Verify if a token is valid using a secret.
 *
 * @param {string} token - The token to be verified.
 * @param {string} username - The username to be verified in the token.
 * @param {string} secret - The secret used to verify the token.
 * @return {boolean} Returns true if the token is valid, false otherwise.
 */
function verifyToken(token: string, username: string, secret: string): boolean {
  if (!token) {
    throw new Error('Token was null or undefined');
  }
  if (!username) {
    throw new Error('Username was null or undefined');
  }
  if (!secret) {
    throw new Error('Secret was null or undefined');
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload; // Add type assertion here
    if (!jwt.verify(token, secret)) {
      return false; // Token is invalid
    }
    if (!decoded || !decoded.username) {
      return false; // Token is invalid
    }
    if (decoded.username !== username) {
      return false; // Token is invalid
    }

    jwt.verify(token, secret);
    return true; // Token is valid
  } catch (error) {
    return false; // Token is invalid
  }
}


export { createToken, verifyToken };

