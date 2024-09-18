// src/SendSMS.js

import axios from 'axios';

// Generates a random 6-digit verification code
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Sends verification code to the user's phone number using an external SMS service
async function sendSMS(phoneNumber) {
  try {
    const verificationCode = generateVerificationCode();

    // Calling sendSMSRequest function to send the SMS
    const response = await sendSMSRequest(phoneNumber, verificationCode);

    if (response.status === 200) {
      console.log('SMS sent successfully.', response.data);
      return { success: true, verificationCode };
    } else {
      throw new Error('Failed to send SMS. Please try again.');
    }
  } catch (error) {
    console.error('Error during sendSMS:', error.message);
    return { success: false, error: error.message };
  }
}

// Makes an external API request to the SMS service provider to send the SMS containing the verification code
async function sendSMSRequest(phoneNumber, verificationCode) {
  const smsServiceUrl = process.env.SMS_SERVICE_URL;
  const apiKey = process.env.SMS_SERVICE_API_KEY;

  try {
    const response = await axios.post(
      smsServiceUrl,
      {
        to: phoneNumber,
        message: `Your verification code is ${verificationCode}.`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error during sendSMSRequest:', error.message);
    throw new Error('Failed to send SMS request. Please try again.');
  }
}

export { sendSMS, sendSMSRequest };
