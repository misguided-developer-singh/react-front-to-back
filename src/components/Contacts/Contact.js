import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';

import { Consumer } from '../../Context';


class Contact extends Component {
 
  state = {
    showContactInfo: false
  };

  onShowClick = (e) => {
    this.setState({showContactInfo: ! this.state.showContactInfo
      })
  };

  onDeleteClick = (id, dispatch, e) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => dispatch({type: 'DELETE_CONTACT', payload: id}));
    
  };

  render() {
    console.log('render method called...')
    //  const {name, email, phone} = this.props;
    const { id, name, email, phone } = this.props.contact;

    const showContactInfoElement = ( 
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              );

    return (
      <Consumer>
        {
           value => {
             const { dispatch } = value;
              return (
                <div className="card card-body mb-3">
                <h4>
                    {name}{' '} 
                    <i onClick={this.onShowClick} 
                       className="fas fa-sort-down" 
                       style={{ cursor: 'pointer'}} />
                    <i className="fas fa-times"
                       style={{ cursor: 'pointer', float: 'right', color: 'red'}}
                       onClick={this.onDeleteClick.bind(this, id, dispatch)} />
                    <Link to={`/contact/edit/${id}`}>
                    <i className="fas fa-pencil-alt"
                       style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}} />
                    </Link>
                </h4>
                {
                    this.state.showContactInfo ? showContactInfoElement : null
                }
              </div>
              );
           }
        }
      </Consumer>
    );
  }
}

// Contact.propTypes ={
//   name: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
// };

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  // deleteClickHandler: PropTypes.func.isRequired
};

export default Contact;
