import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Contact from "./components/Contact";
import Contacts from './components/Contacts/Contacts';
import Header from "./components/Layout/Header";
import About from "./components/pages/About";
import NotFound from './components/pages/NotFound';
import AddContact from './components/Contacts/AddContact';
import EditContact from './components/Contacts/EditContact';


import Provider from './Context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
        <Provider>
          <Router basename={process.env.PUBLIC_URL}>
           <div className="App">
              <Header branding="Contact Manager" />
              <div className="container">
                {/* <Contact name="Amarjit Singh" email="amar@gmail.com" phone="555-555-5555"/>
                <Contact name="Ratnesh Singh" email="ratan@gmail.com" phone="333-333-3333"/> */}
                <Switch>
                  <Route exact path="/" component={Contacts} />
                  <Route exact path="/contact/add" component={AddContact} />
                  <Route exact path="/contact/edit/:id" component={EditContact} />
                  <Route exact path="/about" component={About} />
                  <Route component={ NotFound } />
                </Switch>
              </div>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
