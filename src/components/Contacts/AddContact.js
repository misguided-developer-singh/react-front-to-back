import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

import { Consumer } from '../../Context';
import TextInputGroup from '../Layout/TextInputGroup';

class AddContact extends Component {
   state = {
      name: '',
      email: '',
      phone: '',
      errors: {},
   };


   onChange = (event) => this.setState({ [event.target.name]: event.target.value });

   onSubmit = (dispatch, event) => {
      
      event.preventDefault();
         
      const { name, email, phone } = this.state;

      // Check for errors
      if (name === '') {
         this.setState({errors: { name: 'Name is required'}});
         return;
      };
      if (email === '') {
         this.setState({errors: { email: 'Email is required'}});
         return;
      };
      if (phone === '') {
         this.setState({errors: { phone: 'Phone is required'}});
         return;
      };

      // console.log(this.state);

      const newContact = {
         // id: uuid(),
         name: name,
         email: email,
         phone: phone
      };

      axios
         .post(`https://jsonplaceholder.typicode.com/users`, newContact)
         .then(response => dispatch({type: 'ADD_CONTACT', payload: response.data}));

      // Clear the state
      this.setState({ name: '', email: '', phone: '', errors: {} });
      // After submitting the form, re-directing to Home page
      this.props.history.push('/');
   }

   render() {

      const { name, email, phone, errors} = this.state;

      return (
         <Consumer>
            { value => {
                const { dispatch } = value;
                
               return (
                  <div className="card mb-3">
                  <div className="card-header">Add Contact</div>
                  <div className="card-body">
                     <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                        <TextInputGroup name="name" label="Name" value={name} placeholder="Enter Name..."                onChange={this.onChange}  error={errors.name} />
                        <TextInputGroup name="email" label="Email" value={email} placeholder="Enter Email..."                 type="email" onChange={this.onChange} error={errors.email} />
                        <TextInputGroup name="phone" label="Phone" value={phone} placeholder="Enter Phone..."                onChange={this.onChange}  error={errors.phone} />
                        <input type="submit" value="Add Contact" className="btn btn-light btn-block"/>
                     </form>
                  </div>
               </div>
               );
            }}
         </Consumer>
      );
   }
}

export default AddContact;
