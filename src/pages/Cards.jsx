import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Box from '../components/Box'
import Carder from '../components/Carder'
import axios from 'axios'
import { Container, Button, Spinner } from 'react-bootstrap';

export default function Cards() {
	const [ Cards, setCards ] = useState([])
	let token = localStorage.getItem('token') || null
	const [ Loading, setLoading ] = useState(true)


	useEffect(() => {
		if (token != null) {
			axios.get('http://localhost:8000/api/cards/', {headers:{
				Authorization: token
			}})
			.then(response => {
				setCards(response.data);
				setLoading(false)
			})
			.catch(err => console.log(err))
		}
	}, [])


	const Page = () => {
		return (
			<Container>
				<h1 align="center"> Cards! </h1>
				<Link to="/cards/new">
					<Button variant="success">Add a card</Button>
				</Link>
				<hr />
				{ Cards.map((card) => <Carder title={card.title} slug={card.id} time={card.created_at} /> ) }
			</Container>
		)
		
	} 

	const Spin = () => {
		return (
			<Container align="center">
				<Spinner animation="border" variant="success" />
			</Container>
		)
	}

	return (
		<div>
			{ Loading ? <Spin /> : <Page /> }
		</div>
	)
}