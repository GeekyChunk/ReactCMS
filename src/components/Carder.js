import React from 'react'
import { Link } from 'react-router-dom'

export default function Carder(props) {
	return (
		<div>
			<Link to={"/cards/" + props.slug}>
	      		<h3>
	      			{props.title}
	      		</h3>
			</Link>
			<small>
				{props.time}
			</small>
			<hr />
	    </div>
	)
}