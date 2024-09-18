// src/RegisterUser.js

import axios from 'axios';
import { sendSMS } from './SendSMS';
import { verifyUserCode } from './auth';
import { hashPassword, validatePassword } from './auth';

// Handles user registration by accepting phone number and initiating the verification process.
// Calls sendSMS function to send verification code via SMS.
export async function registerUser(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
    throw new Error('Invalid phone number. Please provide a valid 10-digit phone number.');
  }

  try {
    // Call sendSMS function to send verification code
    const result = await sendSMS(phoneNumber);
    return result;
  } catch (error) {
    throw new Error(`Failed to register user. ${error.message}`);
  }
}

// Verifies the entered verification code against the one sent to the user's phone number.
// Uses an existing function from auth.js.
export async function verifyUser(phoneNumber, verificationCode) {
  if (!phoneNumber || typeof phoneNumber !== 'string' || phoneNumber.length !== 10) {
    throw new Error('Invalid phone number. Please provide a valid 10-digit phone number.');
  }

  if (!verificationCode || typeof verificationCode !== 'string' || verificationCode.length !== 6) {
    throw new Error('Invalid verification code. Please provide a valid 6-digit verification code.');
  }

  try {
    // Call verifyUserCode function to verify the code
    const isValid = await verifyUserCode(phoneNumber, verificationCode);
    return isValid;
  } catch (error) {
    throw new Error(`Verification failed. ${error.message}`);
  }
}

// Allows user to set a secure password. Ensures password meets security criteria before storing it securely.
export async function setPassword(userId, password) {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid user ID.');
  }

  try {
    // Validate password
    await validatePassword(password);

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Update the user's password (You may need an API endpoint to complete this step)
    // Example of making a request to update the password:
    const response = await axios.post(`/api/users/${userId}/password`, { password: hashedPassword });

    if (response.status === 200) {
      return 'Password updated successfully.';
    } else {
      throw new Error('Failed to update password.');
    }
  } catch (error) {
    throw new Error(`Setting password failed. ${error.message}`);
  }
}
