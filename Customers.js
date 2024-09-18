import React, { Component } from 'react';
import { addFavouriteColour } from './favouriteColours';
import { getCustomerData } from './existingModule';
// Other necessary imports...

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerList: [],
      selectedCustomer: null,
    };
  }

  componentDidMount() {
    // Presuming there's a function to fetch customers called fetchCustomers
    // fetchCustomers().then(this.setCustomerList);
  }

  setCustomerList = (response) => {
    this.setState({ customerList: response });
  }

  updateFavouriteColour = (customerId, favouriteColour) => {
    if (!customerId || !favouriteColour) {
      console.error("Invalid input: Both customerId and favouriteColour are required");
      return;
    }
    
    getCustomerData(customerId)
      .then(customerData => {
        if (!customerData) {
          console.error("Customer not found");
          return;
        }

        return addFavouriteColour(customerData, favouriteColour);
      })
      .then(updatedCustomerData => {
        if (updatedCustomerData) {
          this.setState(prevState => {
            const updatedCustomerList = prevState.customerList.map(customer =>
              customer.id === customerId ? updatedCustomerData : customer
            );
            return { customerList: updatedCustomerList };
          });
          console.log("Favourite colour updated successfully");
        }
      })
      .catch(err => {
        console.error("Error updating favourite colour:", err);
      });
  }

  render() {
    const { customerList } = this.state;

    return (
      <div>
        {customerList.map(customer => (
          <Panel bsStyle="info" key={customer.id} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
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
