import React from 'react'
import Alert from '@material-ui/lab/Alert';

export default function Box(props) {
	return (
		<Alert severity={props.v}>{ props.m }</Alert>
	)
}