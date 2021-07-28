import React from 'react'
import { Router } from 'react-router-dom'
import {
	Button
} from 'react-bootstrap'
import axios from 'axios'

class NoteForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    	value: '',
    	result: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/api/notes/', {
    	body: this.state.value,
    	card: this.props.id
    }, {headers: {
    	Authorization: this.props.token
    }})
    .then(response => {
    	this.setState({result: response.data});
    })
    .catch(err => {
    	this.setState({result: err.response})
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="row p-2">
        <textarea className="form-control"  value={this.state.value} onChange={this.handleChange}></textarea>
        <input className="btn btn-success" type="submit" value="Submit" />
      	{JSON.stringify(this.state)}
      </form>
    );
  }
}


export default NoteForm