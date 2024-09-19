// emailService.js

const nodemailer = require('nodemailer');
const { emailConfig } = require('./config'); // Assuming there's a config file with email settings

/**
 * Sends a password reset email to the user
 * @param {string} email - The email address of the user
 * @returns {Promise<void>}
 */
async function sendResetEmail(email) {
    if (!email) {
        throw new Error('Email is required');
    }

    let transporter;
    try {
        transporter = nodemailer.createTransport(emailConfig);
    } catch (error) {
        console.error('Error configuring the email transporter:', error);
        throw new Error('Failed to configure email transporter');
    }

    const resetLink = generatePasswordResetLink(email); // Assuming we have a function to generate the reset link

    const mailOptions = {
        from: '"Your Application Name" <no-reply@yourapp.com>',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
        html: `<p>You requested a password reset. Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully to', email);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}

/**
 * Generates a password reset link for the user
 * @param {string} email - The email address of the user
 * @returns {string} The generated reset link
 */
function generatePasswordResetLink(email) {
    // NOTE: This is a placeholder implementation. The actual implementation will depend on your token generation method and URL structure.
    const token = Buffer.from(email).toString('base64'); // Simplistic token for demonstration. Replace with secure token generation logic.
    return `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
}

module.exports = {
    sendResetEmail
};
