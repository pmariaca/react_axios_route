import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router';

import {
	Avatar, Button, CssBaseline, TextField, FormControlLabel,
	Checkbox, Link, Grid, Typography, Container
} from '@mui/material';


function Signup() {
	const navegate = useNavigate()
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			// .post(`user/create/`, {
			.post(`user/register/`, {
				email: formData.email,
				username: formData.username,
				password: formData.password,
			})
			.then((res) => {
				navegate("/login");
				console.log("Signup -- Success!", res);
				console.log("Signup -- ", res.data);
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Avatar  ></Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form style={{ width: '100%' }} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
export default Signup