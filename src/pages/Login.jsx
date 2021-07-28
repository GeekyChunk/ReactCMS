import React from "react"
import {
	Button,
	TextField,
	Grid,
	Paper,
	AppBar,
	Typography,
	Toolbar,
	Link,
} from "@material-ui/core"
import Box from '../components/Box'
import axios from 'axios'

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password:"", error:'null', n: false };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({ email: event.state.email, password: event.state.password });
	}
	handleSubmit(event) {
		event.preventDefault();
		let msg = null
		axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
			axios.post('http://127.0.0.1:8000/api/login', {
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                localStorage.setItem('token', `Bearer ${response.data.token}`)
            }).catch(err => {
                this.setState({error: err.response});
                if (err.response.data.message == "Bad Creds") {
                	this.setState({n: true})
                }
            })          
        }).catch(err => {
            this.setState({error: err.response})
        })

	}
	render() {
	return (
		<div>
		
		<Grid container spacing={2} justifyContent="center" direction="row">
			<Grid item align="center">
				<Grid
				container
				direction="column"
				justifyContent="center"
				spacing={0}
				className="login-form"
				>
					<Paper
					variant="elevation"
					elevation={2}
					className="login-background"
					style={{ padding: '2rem', margin: '3rem' }}
					>
						<Grid item align="center">
							<Typography component="h1" variant="h5" align="center">
							Sign in
							</Typography>
							{ this.state.n ? <Box v="error" m="Make sure email & password is correct" align="center" /> : <Box v="info" m="Login PLease" /> }
							</Grid>
							<Grid item style={{ padding: '0.5rem' }}>
							<form onSubmit={this.handleSubmit} align="center">
								<Grid container direction="column" align="center" spacing={1} style={{ width: '20rem' }}>
									<Grid item >
										<TextField
											type="email"
											fullWidth
											name="email"
											label="Email"
											variant="standard"
											id="standard-basic"
											value={this.state.email}
											onChange={(event) =>
												this.setState({
													[event.target.name]: event.target.value,
												})
											}
											required
											autoFocus
											align="center"
										/>
										</Grid>
										<Grid item>
											<TextField
											type="password"
											label="Password"
											fullWidth
											name="password"
											value={this.state.password}
											onChange={(event) =>
											this.setState({
											[event.target.name]: event.target.value,
											})
											}
											required
											/>
										</Grid>
										<Grid item align="center">
											<Button
											variant="contained"
											color="primary"
											type="submit"
											className="button-block"
											>
											Login
											</Button>
										</Grid>
									</Grid>
								</form>
							</Grid>
							<Grid item align="center">
								<Link href="#" color="secondary">
									Forgot Password?
								</Link>
							</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
		</div>
		);
	}
}
export default Login;