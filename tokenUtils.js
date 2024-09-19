import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const SECRET_KEY = 'your-secure-secret-key'; // This should be in an environment variable in a real application for security purposes

/**
 * Validates the password reset link by verifying the token
 * @param {string} token - The JWT token from the password reset link
 * @returns {Promise<Object>} - A promise that resolves to the decoded token payload if valid, or rejects if invalid or expired
 */
async function validateResetLink(token) {
  try {
    const verify = promisify(jwt.verify);
    const decodedToken = await verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid or expired password reset link.');
  }
}

export { validateResetLink };
