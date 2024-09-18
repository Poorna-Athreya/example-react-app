import React, { useState, useEffect } from 'react';
import { Panel, Button } from 'react-bootstrap';
import axios from 'axios';

const CustomerData = () => {
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  // Fetches customer data from JSON file and sets it in state
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get('/path/to/customerData.json');
      setCustomerList(response.data);
    } catch (error) {
      console.error('Error fetching customer data', error);
      // Customize error handling as needed
    }
  };

  // Renders list of customers with their basic details and button to view more details
  const renderCustomerList = () => {
    return customerList.map((customer) => (
      <Panel bsStyle="info" key={customer.id} className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <Button bsStyle="info" onClick={() => setSelectedCustomer(customer.id)}>
            Click to View Details
          </Button>
        </Panel.Body>
      </Panel>
    ));
  };

  return <div>{renderCustomerList()}</div>;
};

export default CustomerData;
