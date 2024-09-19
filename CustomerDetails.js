import React, { Component } from 'react';
import { getCustomerData } from './Customers';
import { displayCustomerDetails as displayCustomerDetailsFromCustomers } from './Customers';

class CustomerDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerDetails: null,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchCustomerDetails(this.props.customerId);
    }

    fetchCustomerDetails = async (customerId) => {
        try {
            const customerDetails = await getCustomerData(customerId);
            this.setState({
                customerDetails: {
                    ...customerDetails,
                    favouriteColour: customerDetails.favouriteColour || 'Not specified', // Ensure favouriteColour is set
                },
                error: null,
            });
        } catch (error) {
            this.setState({ error: 'Failed to fetch customer details. Please try again later.' });
        }
    };

    displayCustomerDetails() {
        const { customerDetails } = this.state;
        if (!customerDetails) {
            return <p>Loading customer details...</p>;
        }

        return displayCustomerDetailsFromCustomers(customerDetails);
    }

    render() {
        const { error } = this.state;

        return (
            <div>
                {error && <p className="error">{error}</p>}
                {this.displayCustomerDetails()}
            </div>
        );
    }
}

export default CustomerDetails;
