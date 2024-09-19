// src/ForgotPasswordHandler.js

import { validateEmail } from './validateUtils';
import { sendResetEmail } from './emailService';

/**
 * This function handles the action when a user clicks on the 'Forgot Password' link.
 * It prompts the user to enter their email address. It ensures that the email address
 * is in the correct format using the validateEmail function from validateUtils.js.
 * 
 * @param {string} email - The email address provided by the user.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function handleForgotPassword(email) {
    try {
        // Validate the email address format
        if (!validateEmail(email)) {
            return { success: false, message: 'Invalid email address format.' };
        }

        // Send password reset email
        const emailResponse = await sendPasswordResetEmail(email);
        
        if (emailResponse.success) {
            return { success: true, message: 'Password reset email sent successfully.' };
        } else {
            return { success: false, message: 'Failed to send password reset email.' };
        }

    } catch (error) {
        console.error('Error handling forgot password:', error);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }
}

/**
 * This function takes a validated email address and sends a password reset email to the user.
 * It calls emailService.js's sendResetEmail function to handle the actual email sending process.
 * 
 * @param {string} email - The validated email address.
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function sendPasswordResetEmail(email) {
    try {
        const response = await sendResetEmail(email);
        return response;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        return { success: false, message: 'Failed to send password reset email.' };
    }
}
