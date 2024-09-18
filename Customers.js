import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import { fetchCustomerData } from './services/apiClient';

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      selectedCustomer: null,
    };
  }

  componentDidMount() {
    this.fetchCustomerData();
  }

  fetchCustomerData = () => {
    fetchCustomerData()
      .then(response => {
        this.setState({ customerList: response });
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
        // Handle the error appropriately here, e.g., set an error state, show an error message, etc.
      });
  };

  render() {
    const { customerList } = this.state;
    return (
      <div>
        {customerList.map(customer => (
          <Panel bsStyle="info" key={customer.name} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <p>Favourite Colour: {customer.favouriteColour}</p>
              <Button bsStyle="info" onClick={() => this.setState({ selectedCustomer: customer.id })}>
                Click to View Details
              </Button>
            </Panel.Body>
          </Panel>
        ))}
      </div>
    );
  }
}

export default Customers;
