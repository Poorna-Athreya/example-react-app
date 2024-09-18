// src/favouriteColours.js

import { getCustomerData } from './customerData';

export function addFavouriteColour(customerID, colour) {
    try {
        const customerData = getCustomerData(customerID);
        if (!customerData) {
            throw new Error("Customer not found");
        }
        customerData.favouriteColour = colour;
        // Save customer data back to the database or state management system
        // saveCustomerData(customerID, customerData);
        return customerData;
    } catch (error) {
        console.error("Failed to add favourite colour:", error);
        throw error;
    }
}

export function getFavouriteColour(customerID) {
    try {
        const customerData = getCustomerData(customerID);
        if (!customerData) {
            throw new Error("Customer not found");
        }
        return customerData.favouriteColour;
    } catch (error) {
        console.error("Failed to retrieve favourite colour:", error);
        throw error;
    }
}
