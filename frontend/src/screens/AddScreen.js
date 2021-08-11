import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	Button,
	TextField,
	TextareaAutosize,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, ShowList } from '../layouts';
import { addReceipe } from '../store/actions/receipeAction';
import { Helmet } from 'react-helmet';
import { useToasts } from 'react-toast-notifications';
import { DialogBox } from '../layouts';

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
	input: {
		width: '90%',
		maxWidth: '500px',
		margin: '10px 5%',
	},
	btn: {
		[theme.breakpoints.down('sm')]: {
			fontSize: '.7rem',
		},
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
	const [open, setOpen] = useState(false);
	const [openList, setOpenList] = useState(false);
	const [isDes, setIsDes] = useState(false);
	const [title, setTitle] = useState('');
	const [image, setImage] = useState('');
	const [time, setTime] = useState('');
	const [conclusion, setConclusion] = useState('');
	const [about, setAbout] = useState('');
	const [description, setDescription] = useState([]);
	const [ingredients, setIngrdients] = useState([]);

	const openAddIngredients = () => {
		setOpen(true);
		setIsDes(false);
	};
	const openAddDes = () => {
		setOpen(true);
		setIsDes(true);
	};
	const addHandler = (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
			image,
			ingredients,
			time,
			about,
			conclusion,
		};
		if (userInfo?._id) {
			dispatch(addReceipe(data));
			addToast('Receipe Submitted for Approval', { appearance: 'success' });
		} else {
			addToast('Please Login', { appearance: 'error' });
		}
		history.push('/');
	};

	const addDes = (data) => {
		setDescription([...description, data]);
		console.log(description);
	};
	const deleteDes = (id) => {
		setDescription(description.filter((ele) => ele.step_id !== id));
	};
	return !loading ? (
		<div className={`${classes.form} ${classes.forms_center}`}>
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
				className={classes.forms_center}
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
				<TextField
					id='standard-basic'
					className={classes.input}
					label='Enter your Image Url'
					value={image}
					onChange={({ target: { value } }) => setImage(value)}
				/>
				<TextareaAutosize
					maxRows={1}
					style={{ width: '80%', padding: '20px 20px', maxWidth: '500px' }}
					aria-label='maximum height'
					placeholder='About Receipe'
					value={about}
					onChange={(e) => setAbout(e.target.value)}
				/>

				<div style={{ display: 'flex', width: '80%', maxWidth: '500px' }}>
					<Button
						fullWidth
						variant='contained'
						color='primary'
						className={classes.btn}
						onClick={openAddIngredients}
						style={{ width: '80%', margin: '10px' }}
					>
						Add Ingredients
					</Button>
					<Button
						fullWidth
						variant='contained'
						color='primary'
						className={classes.btn}
						onClick={() => {
							setOpenList(true);
							setIsDes(false);
						}}
						style={{ width: '80%', margin: '10px' }}
					>
						Show Ingredients
					</Button>
				</div>

				<div style={{ display: 'flex', width: '80%', maxWidth: '500px' }}>
					<Button
						fullWidth
						variant='contained'
						className={classes.btn}
						color='danger'
						onClick={openAddDes}
						style={{ width: '80%', margin: '10px' }}
					>
						Add Steps
					</Button>
					<Button
						fullWidth
						variant='contained'
						className={classes.btn}
						color='danger'
						onClick={() => {
							setOpenList(true);
							setIsDes(true);
						}}
						style={{ width: '80%', margin: '10px' }}
					>
						Show Steps{' '}
					</Button>
				</div>
				<DialogBox
					isDes={isDes}
					open={open}
					setOpen={setOpen}
					addDes={addDes}
					addIng={(data) => setIngrdients([...ingredients, data])}
				/>
				<ShowList
					deleteIng={(id) =>
						setIngrdients(ingredients.filter((ele) => ele.ingredient_id !== id))
					}
					ing={ingredients}
					open={openList}
					setOpen={setOpenList}
					isDes={isDes}
					des={description}
					deleteDes={deleteDes}
				/>

				<TextareaAutosize
					maxRows={1}
					style={{ width: '80%', padding: '20px 20px', maxWidth: '500px' }}
					aria-label='maximum height'
					placeholder='Conclusions'
					value={conclusion}
					onChange={(e) => setConclusion(e.target.value)}
				/>
				<Button
					variant='contained'
					color='secondary'
					onClick={addHandler}
					className={classes.btn}
					style={{ display: 'block', width: '50%', maxWidth: '300px' }}
				>
					<strong className='center space_around'>Submit for approval</strong>
				</Button>
			</form>
		</div>
	) : (
		<Loader />
	);
};

export default AddScreen;
