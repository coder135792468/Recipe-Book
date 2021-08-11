import React, { useState } from 'react';
import { Button, TextField, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { Loader } from '../layouts';
import { login } from '../store/actions/userAction';
import { constants } from '../helpers';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
	form: {
		maxWidth: '100vw',
		width: '100%',
		height: '100vh',
		position: 'absolute',
		inset: '0',
		zIndex: '4',
		overflow: 'scroll',
		'& *': {
			overflow: 'hidden',
		},
	},
	forms_center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
}));
const Login = ({ history }) => {
	const classes = useStyles();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { loading } = user;

	const loginHandler = () => {
		//login user
		dispatch(login(email, password));
		history.push('/');
	};
	return (
		<>
			<Helmet>
				<title>Login</title>
			</Helmet>
			{!loading ? (
				<div className={`${classes.form} ${classes.forms_center}`}>
					<Button variant='contained' color='sucess'>
						<Link to='/' style={{ textDecoration: 'none' }}>
							Back to home
						</Link>
					</Button>
					<form
						noValidate
						autoComplete='off'
						style={{ width: '100%' }}
						className={classes.forms_center}
					>
						<TextField
							id='standard-basic'
							style={{ width: '90%', maxWidth: '500px', margin: '10px 5%' }}
							label='Enter your email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<TextField
							id='standard-basic'
							style={{ width: '90%', maxWidth: '500px', margin: '10px 5%' }}
							label='Enter your password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							variant='contained'
							color='primary'
							onClick={loginHandler}
							style={{
								display: 'block',
								margin: '20px 0',
								width: '50%',
								maxWidth: '300px',
							}}
						>
							<strong className='center space_around'>
								{constants.auth.login}
							</strong>
						</Button>
						<Divider
							style={{ width: '90%', height: '3px', margin: '14px auto' }}
						/>
					</form>
					<p>
						Not Have an Account ? <Link to='/register'>Register</Link>
					</p>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default Login;
