import React, { Component } from 'react';
import  axios  from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
       case 'DELETE_CONTACT':
            return {
               // ...state,
               contacts: state.contacts.filter(contact => contact.id !== action.payload)
            };
       case 'ADD_CONTACT':
            return {
               ...state,
               contacts: [action.payload, ...state.contacts]
            };
       case 'UPDATE_CONTACT':
            return {
               ...state,
               contacts: state.contacts.map(
                  contact => 
                     contact.id === action.payload.id ? ( contact = action.payload ) : contact
               )
            };

       default: return state;     
    }
};

export default class Provider extends Component {
   state = {
      contacts: [
         // {
         //    id: 1,
         //    name: 'Amarjit Kumar',
         //    email: 'amar@gmail.com',
         //    phone: '555-555-5555'
         // },
         // {
         //    id: 2,
         //    name: 'Ratnesh Kumar',
         //    email: 'ratnesh@gmail.com',
         //    phone: '111-111-1111'
         // },
         // {
         //    id: 3,
         //    name: 'Rahul Verma',
         //    email: 'rahul@gmail.com',
         //    phone: '777-777-7777'
         // }
      ],
      dispatch: action => {
         this.setState(state => reducer(state, action))
      }
   };

   // using Async/Await
   async componentDidMount() {
      console.log('componentDidMount is called...!');
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
     this.setState({ contacts: response.data });
   }

   // componentDidMount() {
   //    console.log('componentDidMount is called...!');
   //    axios.get('https://jsonplaceholder.typicode.com/users')
   //     .then(response => this.setState({ contacts: response.data }))
   // }

   render() {
      return (
         <Context.Provider value={this.state}>
            { this.props.children }
         </Context.Provider>
      )
   }
}

export const Consumer = Context.Consumer;
