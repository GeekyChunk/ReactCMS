import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
	Container,
	Form,
	Button
} from 'react-bootstrap'

let token = localStorage.getItem('token') || null

export default class NewCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			slug: ''
		};
		this.handleTitle = this.handleTitle.bind(this);
		this.handleSlug = this.handleSlug.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTitle(event) {
    	this.setState({title: event.target.value});
	}

	handleSlug(event) {
    	this.setState({slug: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		if (token != null) {
			axios.post('http://127.0.0.1:8000/api/cards/', this.state, {headers: {
				Authorization: token
			}})
		}
	}

	render() {
		return (
			<Container>
				<div className="row d-flex justify-content-center">
					
					<div className="mt-5 card" style={{ width: '45rem' }} >
						<div className="card-body">
							<h4 align="center"> Add A Card </h4>
							<hr />
							<Form onSubmit={this.handleSubmit}>
							  <Form.Group className="mb-3" controlId="formBasicEmail">
							    <Form.Label>Title</Form.Label>
							    <Form.Control onChange={this.handleTitle} value={this.state.title} placeholder="Card's Title" />
							  </Form.Group>
							  <Form.Group className="mb-3" controlId="formBasicPassword">
							    <Form.Label>Slug</Form.Label>
							    <Form.Control onChange={this.handleSlug} value={this.state.slug} placeholder="Card's Slug" />
							  </Form.Group>
							  <div className="d-grid">
							  	<div className="btn-group">
								  <Button variant="primary" type="submit">
								    Submit
								  </Button>
								  <Link className="btn btn-danger" to="/cards">
								  	Cancel
								  </Link>

							  	</div>
							  </div>
							  
							</Form>	
						</div>				
					</div>
				</div>
			</Container>
		)
	}
}