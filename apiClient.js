// src/services/apiClient.js

import axios from 'axios';

// Function to fetch customer data from the JSON source
// Includes 'favourite colour' property
export async function getCustomerData(customerId) {
    try {
        const response = await axios.get(`/path/to/your/api/customerData/${customerId}.json`);
        
        // Check if the response contains data
        if (response && response.data) {
            const customerData = response.data;
            
            // Validate that the essential fields are present in the response
            if (!customerData.name || !customerData.email || !customerData.favourite_colour) {
                throw new Error("Incomplete customer data received from the API");
            }

            return {
                id: customerId,
                ...customerData
            };
        } else {
            throw new Error("No data found for the given customer ID");
        }
    } catch (error) {
        console.error(`Error fetching customer data for ID ${customerId}:`, error.message);
        // Rethrow the error so that it can be handled by the calling function
        throw error;
    }
}
