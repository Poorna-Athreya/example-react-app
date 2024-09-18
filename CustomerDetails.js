import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerDetails: null,
      error: null,
    };

    this.fetchCustomerDetails = this.fetchCustomerDetails.bind(this);
    this.updateCustomerDetails = this.updateCustomerDetails.bind(this);
  }

  componentDidMount() {
    this.fetchCustomerDetails(this.props.customerId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.customerId !== prevProps.customerId) {
      this.updateCustomerDetails(this.props.customerId);
    }
  }

  async fetchCustomerDetails(customerId) {
    try {
      const response = await axios.get(`/api/customers/${customerId}`);
      this.setState({ customerDetails: response.data, error: null });
    } catch (error) {
      this.setState({ customerDetails: null, error: 'Error fetching customer details' });
      console.error('Error fetching customer details:', error);
    }
  }

  updateCustomerDetails(newCustomerId) {
    this.fetchCustomerDetails(newCustomerId);
  }

  render() {
    const { customerDetails, error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    if (!customerDetails) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>{customerDetails.name}</h2>
        <p>Email: {customerDetails.email}</p>
        <p>Phone: {customerDetails.phone}</p>
        {/* Add more fields as needed */}
      </div>
    );
  }
}

CustomerDetails.propTypes = {
  customerId: PropTypes.string.isRequired,
};

export default CustomerDetails;
