// src/validateUtils.js

/**
 * Validates that the provided email is in the correct format.
 * This function is used by handleForgotPassword in ForgotPasswordHandler.js
 * and processPasswordReset in PasswordResetHandler.js.
 *
 * @param {string} email - The email address to validate.
 * @return {boolean} Returns true if the email is valid, false otherwise.
 */
function validateEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the provided email matches the pattern
    return emailPattern.test(email);
}

// Export the validateEmail function
module.exports = {
    validateEmail
};
