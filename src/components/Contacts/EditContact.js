import React, { Component } from 'react';
import uuid from 'uuid';
import axios from 'axios';

import { Consumer } from '../../Context';
import TextInputGroup from '../Layout/TextInputGroup';

class EditContact extends Component {
   state = {
      name: '',
      email: '',
      phone: '',
      errors: {},
   };

   async componentDidMount() {
      const { id } = this.props.match.params;
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      const contact = res.data;
      this.setState({ name: contact.name, email: contact.email, phone: contact.phone });
   }


   onChange = (event) => this.setState({ [event.target.name]: event.target.value });

   onSubmit = async (dispatch, event) => {
      
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

      const updatedContact =  { name: name, email: email, phone: phone};
      const { id } = this.props.match.params;

      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedContact);
      dispatch({type: 'UPDATE_CONTACT', payload: response.data});


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
                  <div className="card-header">Edit Contact</div>
                  <div className="card-body">
                     <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                        <TextInputGroup name="name" label="Name" value={name} placeholder="Enter Name..."                onChange={this.onChange}  error={errors.name} />
                        <TextInputGroup name="email" label="Email" value={email} placeholder="Enter Email..."                 type="email" onChange={this.onChange} error={errors.email} />
                        <TextInputGroup name="phone" label="Phone" value={phone} placeholder="Enter Phone..."                onChange={this.onChange}  error={errors.phone} />
                        <input type="submit" value="Update Contact" className="btn btn-light btn-block"/>
                     </form>
                  </div>
               </div>
               );
            }}
         </Consumer>
      );
   }
}

export default EditContact;
