import React, { Component } from 'react';
import { fetchCustomerDetails } from './api'; // Assuming there's an api.js file for API calls.

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerDetails: null,
      error: null,
    };
  }

  componentDidMount() {
    const { customerId } = this.props;

    fetchCustomerDetails(customerId)
      .then(response => {
        this.setState({ customerDetails: response });
      })
      .catch(error => {
        this.setState({ error: error.message });
        console.error('Error fetching customer details:', error);
      });
  }

  displayCustomerInfo(customer) {
    return (
      <div className="customer-info">
        <h3>{customer.name}</h3>
        <p>Email: {customer.email}</p>
        <p>Favorite Color: {customer.favouriteColour}</p>
        {/* Include other necessary customer details here */}
      </div>
    );
  }

  displayError() {
    return (
      <div className="error">
        <p>Error: {this.state.error}</p>
      </div>
    );
  }

  render() {
    const { customerDetails, error } = this.state;

    return (
      <div className="customer-details">
        {error && this.displayError()}
        {customerDetails && this.displayCustomerInfo(customerDetails)}
      </div>
    );
  }
}

export default CustomerDetails;
