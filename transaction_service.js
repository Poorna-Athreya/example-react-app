// src/transaction_service.js

const nodemailer = require('nodemailer');
const errorHandling = require('./error_handling');
const security = require('./security');

// Assuming transporter configuration is done elsewhere and imported here
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Function to send email confirmation to the user.
 * @param {Object} transactionDetails - Details of the transaction including transaction ID, amount, date, and payment method.
 * @param {string} transactionDetails.transactionId - ID of the transaction.
 * @param {number} transactionDetails.amount - Amount of the transaction.
 * @param {string} transactionDetails.date - Date of the transaction.
 * @param {string} transactionDetails.paymentMethod - Payment method used in the transaction.
 * @param {string} recipientEmail - Email address of the recipient.
 */
async function sendEmailConfirmation(transactionDetails, recipientEmail) {
    try {
        const { transactionId, amount, date, paymentMethod } = transactionDetails;

        const message = {
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject: 'Transaction Confirmation',
            text: `Your transaction with ID ${transactionId} for $${amount} using ${paymentMethod} on ${date} has been successfully processed.`,
        };

        // Encrypt the message content before sending
        security.encryptConfirmationMessage(message);

        // Send email using the external email service provider's API (nodemailer)
        const info = await transporter.sendMail(message);
        console.log('Email sent: ' + info.response);

    } catch (error) {
        errorHandling.handleConfirmationError(error, 'email');
    }
}

/**
 * Function to send web confirmation message.
 * @param {Object} transactionDetails - Details of the transaction including transaction ID, amount, date, and payment method.
 * @param {string} transactionDetails.transactionId - ID of the transaction.
 * @param {number} transactionDetails.amount - Amount of the transaction.
 * @param {string} transactionDetails.date - Date of the transaction.
 * @param {string} transactionDetails.paymentMethod - Payment method used in the transaction.
 * @param {Function} updateUI - UI update function to display the message.
 */
async function sendWebConfirmation(transactionDetails, updateUI) {
    try {
        const { transactionId, amount, date, paymentMethod } = transactionDetails;
        const message = `Transaction ${transactionId}: $${amount} using ${paymentMethod} on ${date} was successful.`;

        // Encrypt the message content before updating UI
        security.encryptConfirmationMessage(message);

        // Update the UI with transaction details
        updateUI(message);

    } catch (error) {
        errorHandling.handleConfirmationError(error, 'web');
    }
}

/**
 * Function to process the transaction.
 * @param {Object} paymentDetails - Payment details including payment method and other necessary data.
 * @param {string} paymentDetails.method - Payment method used for the transaction.
 * @param {Object} paymentDetails.data - Additional data required for the payment method.
 * @param {Object} transactionDetails - Transaction details including transaction ID, amount, date, and payment method.
 * @param {string} transactionDetails.transactionId - ID of the transaction.
 * @param {number} transactionDetails.amount - Amount of the transaction.
 * @param {string} transactionDetails.date - Date of the transaction.
 * @param {string} transactionDetails.paymentMethod - Payment method used in the transaction.
 * @param {string} recipientEmail - Email address of the recipient.
 * @param {Function} updateUI - UI update function to display the message.
 */
async function processTransaction(paymentDetails, transactionDetails, recipientEmail, updateUI) {
    try {
        const { method, data } = paymentDetails;
        // Validate payment method
        const isValid = await security.validatePaymentMethod(method, data);
        
        if (!isValid) {
            throw new Error('Invalid payment method.');
        }

        // Proceed with the transaction processing (external API call, etc.)
        // ...

        // If payment processing is successful, send confirmation messages
        await sendEmailConfirmation(transactionDetails, recipientEmail);
        await sendWebConfirmation(transactionDetails, updateUI);

    } catch (error) {
        console.error('Transaction processing failed: ', error);
        updateUI('Transaction failed. Please try again.');
    }
}

module.exports = {
    sendEmailConfirmation,
    sendWebConfirmation,
    processTransaction,
};
