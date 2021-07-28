import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
	Container,
	ListGroup,
	Spinner,
	Card,
	Modal,
	Button,
	Form
} from 'react-bootstrap'

import Box from '../components/Box'
import NoteForm from '../components/NoteForm'

export default function ShowCard() {
	let token = localStorage.getItem('token') || null
	const [ Loading, setLoading ] = useState(true)
	const { id } = useParams()
	const [ Card, setCard ] = useState({notes: []})
	const [ H404, setH404 ] = useState(false)
	const [ show, setShow ] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

	useEffect(() => {
		if (token != null) {
			axios.get(`http://127.0.0.1:8000/api/cards/${id}`, {headers:{
				Authorization: token
			}})
			.then(response => {setCard(response.data);setLoading(false)})
			.catch(err => {
				if (err.response.status == 404) {setH404(true);setLoading(false)}
			})
		}
	}, [])

	const Form = () => {
		const [ FormData, setFormData ] = useState(null)

		const Submit = (e) => {
			e.preventDefault()
				axios.post('http://127.0.0.1:8000/api/notes/', {
					body: FormData,
					card: id
				}, {
					headers: {
						Authorization: token
					}
				})
				.then(response => {
					let notes_list = Card.notes
					notes_list.unshift(response.data)
					setCard({
						...Card,
						notes: notes_list
					})
				})
			}

		return (
				<form onSubmit={Submit} className="row p-2">
		        	<textarea onChange={e => setFormData(e.target.value)} className="form-control" required>{FormData}</textarea>
			        <input className="btn btn-success" type="submit" value="Submit" />
			      </form>
		)
	}

	const Notes = () => {
		if (Card.notes.length == 0) {
			return (
				<div className="alert alert-warning">
					No Note Available
				</div>
			)
		} else {
			return (
			<ListGroup>
				{
					Card.notes.map((note) => <ListGroup.Item key={note.id}> {note.body} </ListGroup.Item>)
				}
			
			   
			</ListGroup>
  )
		}
	}

	const Page = () => {
		if (H404 == true) {
			return (
				<div className="alert alert-danger">
					Card Not Found! 404
				</div>
			)
		} else {
			return (
				<div className="row d-flex justify-content-center">
					<div className="card my-3 mb-5" style={{ width: '40rem' }}>
						<div className="card-body">
							<h4 align="center">
								{Card.title}
								<hr />								
							</h4>
							<Form />
							<hr />
							<Notes />
						</div>
					</div>
				</div>
			)
		}	
	}

	return (
		<Container align="center">
      <br />
			{Loading ? <Spinner animation="border" variant="success" /> : <Page />}
		</Container>
	)
}