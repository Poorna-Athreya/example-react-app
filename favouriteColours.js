// src/favouriteColours.js

// Import existing functions and libraries
import { getCustomerData, updateCustomerData } from './customerService';

/**
 * Adds a favourite colour to a customer's details.
 * It interacts with the existing `getCustomerData` function by updating the customer details
 * with the new favourite colour.
 * 
 * @param {string} customerId - The ID of the customer.
 * @param {string} favouriteColour - The favourite colour to add.
 * @returns {Promise<Object>} - The updated customer details.
 */
export async function addFavouriteColour(customerId, favouriteColour) {
    try {
        const customerData = await getCustomerData(customerId);

        if (!customerData) {
            throw new Error(`Customer with ID ${customerId} not found.`);
        }

        customerData.favouriteColour = favouriteColour;
        const updatedCustomerData = await updateCustomerData(customerId, customerData);

        return updatedCustomerData;
    } catch (error) {
        console.error('Error adding favourite colour:', error);
        throw error;
    }
}

/**
 * Retrieves the favourite colour for a specific customer using their customer ID.
 * 
 * @param {string} customerId - The ID of the customer.
 * @returns {Promise<string|null>} - The favourite colour of the customer, or null if not found.
 */
export async function getFavouriteColour(customerId) {
    try {
        const customerData = await getCustomerData(customerId);

        if (!customerData) {
            throw new Error(`Customer with ID ${customerId} not found.`);
        }

        return customerData.favouriteColour || null;
    } catch (error) {
        console.error('Error retrieving favourite colour:', error);
        throw error;
    }
}
