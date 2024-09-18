// src/error_handling.js

const fs = require('fs');
const path = require('path');

/**
 * Handles any errors that may occur while sending confirmation messages.
 * Logs the error, informs the user of the error, and provides an option to retry sending the confirmation message.
 * This function leverages any existing error handling mechanisms in place, such as retry mechanisms and user notification systems.
 *
 * @param {Error} error - The error object that was thrown.
 * @param {string} confirmationType - The type of confirmation (e.g., 'email', 'web') which encountered an error.
 * @param {Function} retryFunction - The function to retry sending the confirmation message.
 * @param {Object} userInfo - The user information object which might be needed for notifying the user.
 */
function handleConfirmationError(error, confirmationType, retryFunction, userInfo) {
    if (!error || typeof error !== 'object') {
        throw new Error('An error object must be provided.');
    }
    if (!confirmationType || typeof confirmationType !== 'string') {
        throw new Error('A valid confirmation type must be provided.');
    }
    if (!retryFunction || typeof retryFunction !== 'function') {
        throw new Error('A valid retry function must be provided.');
    }
    if (!userInfo || typeof userInfo !== 'object') {
        throw new Error('A valid user information object must be provided.');
    }

    const errorLogPath = path.join(__dirname, 'error_logs', `${confirmationType}_errors.log`);

    // Ensure the error log directory exists
    if (!fs.existsSync(path.dirname(errorLogPath))) {
        fs.mkdirSync(path.dirname(errorLogPath), { recursive: true });
    }

    // Log the error to a file
    const logMessage = `[${new Date().toISOString()}] - ${error.message}\n`;
    fs.appendFileSync(errorLogPath, logMessage, 'utf8');

    // Notify the user about the error
    notifyUserOfError(error, confirmationType, userInfo);

    // Provide user an option to retry
    if (shouldRetry(error)) {
        retryFunction();
    }
}

/**
 * Notifies the user about the error that occurred.
 *
 * @param {Error} error - The error object that was thrown.
 * @param {string} confirmationType - The type of confirmation (e.g., 'email', 'web') which encountered an error.
 * @param {Object} userInfo - The user information object which might be needed for notifying the user.
 */
function notifyUserOfError(error, confirmationType, userInfo) {
    // This is a mock function representing user notification.
    // Replace this with your actual user notification implementation.
    console.error(`Error sending ${confirmationType} confirmation to user ${userInfo.id}: ${error.message}`);
    // You can replace the below console log with actual notification logic, such as sending an email or displaying a message in the UI.
}

/**
 * Determines whether the error should trigger a retry.
 *
 * @param {Error} error - The error object that was thrown.
 * @returns {boolean} - Returns true if the error should trigger a retry, false otherwise.
 */
function shouldRetry(error) {
    // This is a simple example. You might want to add more complex logic based on the error type or other criteria.
    // For example, you might want to retry only on network-related errors.
    return error.message.includes('network');
}

module.exports = {
    handleConfirmationError
};
