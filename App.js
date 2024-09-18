import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Customers from './Customers';
import CustomerDetails from './CustomerDetails';

// Header component
const Header = () => (
  <header>
    <h1>Customer Management</h1>
  </header>
);

class App extends React.Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/customerlist" />
            </Route>
            <Route path="/customerlist" component={Customers} />
            <Route path="/customerdetails/:id" component={CustomerDetails} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
