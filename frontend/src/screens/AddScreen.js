import React, { useState, useEffect } from 'react';
import { ArrowRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	TextareaAutosize,
	Button,
	TextField,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../layouts';
import { addReceipe } from '../store/actions/receipeAction';
import { Helmet } from 'react-helmet';
import { useToasts } from 'react-toast-notifications';
import { getUserData } from '../store/actions/userAction';

const useStyles = makeStyles((theme) => ({
	input: {
		width: '90%',
		maxWidth: '500px',
		margin: '10px 5%',
	},
}));

const AddScreen = ({ history }) => {
	const { addToast } = useToasts();

	const dispatch = useDispatch();
	const receipe = useSelector((state) => state.receipe);
	const user = useSelector((state) => state.user);
	const { loading } = receipe;
	const { userInfo } = user;
	const classes = useStyles();
	const [title, setTitle] = useState('No Title');
	const [description, setDescription] = useState('No description');
	const [image, setImage] = useState(
		'https://thumbs.dreamstime.com/z/recipe-word-text-green-leaf-logo-icon-design-white-background-suitable-card-typography-143638205.jpg'
	);
	const [time, setTime] = useState('No time known');
	const [ingredients, setIngrdients] = useState('No ingredients');

	useEffect(() => {
		if (!userInfo?._id) {
			dispatch(getUserData());
		}
		// eslint-disable-next-line
	}, []);

	const addHandler = (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
			image,
			ingredients,
			time,
		};
		if (userInfo?._id) {
			dispatch(addReceipe(data));
			addToast('Receipe Submitted for Approval', { appearance: 'success' });
		} else {
			addToast('Please Login', { appearance: 'error' });
		}
		history.push('/');
	};

	return !loading ? (
		<div className='forms forms_center'>
			<Helmet>
				<title>ADD RECEIPE </title>
				<meta name='description' content='Admin Page for manage recipes' />
			</Helmet>
			<Button variant='contained' color='sucess'>
				<Link to='/' style={{ textDecoration: 'none' }}>
					Back to home
				</Link>
			</Button>
			<form
				noValidate
				autoComplete='off'
				style={{ width: '100%' }}
				className='forms_center'
				onSubmit={(e) => e.preventDefault()}
			>
				<TextField
					id='standard-basic'
					className={classes.input}
					label='Enter your title'
					value={title}
					onChange={({ target: { value } }) => setTitle(value)}
				/>
				<TextField
					id='standard-basic'
					className={classes.input}
					label='Enter Time'
					value={time}
					onChange={({ target: { value } }) => setTime(value)}
				/>
				<TextareaAutosize
					maxRows={5}
					minRows={2}
					aria-label='maximum height empty textarea'
					placeholder='Enter Ingredients'
					label='Enter your title'
					id='standard-basic'
					style={{
						width: '70%',
						padding: '2% 5%',
						maxWidth: '500px',
						margin: '10px 5%',
					}}
					className={classes.input}
					value={ingredients}
					onChange={({ target: { value } }) => setIngrdients(value)}
				/>
				<TextareaAutosize
					maxRows={9}
					minRows={9}
					aria-label='maximum height empty textarea'
					placeholder='Enter Description & Procedure'
					className={classes.input}
					value={description}
					onChange={({ target: { value } }) => setDescription(value)}
					label='Enter your title'
					id='standard-basic'
					style={{
						width: '70%',
						padding: '5%',
						maxWidth: '500px',
						margin: '10px 5%',
					}}
				/>
				<TextField
					id='standard-basic'
					className={classes.input}
					label='Enter your Image Url'
					value={image}
					onChange={({ target: { value } }) => setImage(value)}
				/>
				<Button
					variant='contained'
					color='secondary'
					onClick={addHandler}
					style={{ display: 'block', width: '50%', maxWidth: '300px' }}
				>
					<strong className='center space_around'>
						Submit for approval
						<ArrowRight style={{ fontSize: '30px' }} />
					</strong>
				</Button>
			</form>
		</div>
	) : (
		<Loader />
	);
};

export default AddScreen;
