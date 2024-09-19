// src/PasswordResetHandler.js

const validateResetLink = require('./tokenUtils').validateResetLink;
const updatePassword = require('./userService').updatePassword;

class PasswordResetHandler {
    /**
     * This function handles the request when a user accesses the password reset link from their email.
     * It verifies the validity of the password reset link.
     *
     * @param {string} resetLink - The password reset link.
     * @returns {Promise<object>} - A promise that resolves to an object containing the result of the validation.
     */
    async processPasswordResetRequest(resetLink) {
        try {
            if (!resetLink) {
                throw new Error('Reset link is required.');
            }

            const isValid = await validateResetLink(resetLink);
            if (!isValid) {
                return { success: false, message: 'Invalid or expired password reset link.' };
            }

            return { success: true, message: 'Password reset link is valid.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    /**
     * This function takes the new password provided by the user and updates it in the database.
     *
     * @param {string} userId - The ID of the user whose password is to be updated.
     * @param {string} newPassword - The new password to be set.
     * @returns {Promise<object>} - A promise that resolves to an object containing the result of the update.
     */
    async updateUserPassword(userId, newPassword) {
        try {
            if (!userId || !newPassword) {
                throw new Error('User ID and new password are required.');
            }

            await updatePassword(userId, newPassword);
            return { success: true, message: 'Password updated successfully.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = PasswordResetHandler;
