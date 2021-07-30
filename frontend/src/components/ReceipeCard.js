import React, { useState } from 'react';
import { red } from '@material-ui/core/colors';
import {
	Chip,
	Grid,
	CardActions,
	CardMedia,
	Card,
	makeStyles,
	Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { approveReceipe, deleteReceipe } from '../store/actions/receipeAction';

const useStyles = makeStyles((theme) => ({
	root: {
		width: 200,
		margin: '10px',
		borderRadius: 20,
		padding: 20,
		border: '1px solid whitesmoke',
		boxShadow: '0 0 20px 0px rgba(20,20,0,.03)',
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
		borderRadius: 20,
		width: '100%', // 16:9
	},
	heading: {
		fontSize: '1.1rem',
		fontWeight: '600',
		margin: '0 20px',
	},
	avatar: {
		backgroundColor: red[500],
	},
	gridCard: {
		margin: 'auto',
	},
	actions: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

const RecipeCard = ({ receipe, review = false }) => {
	const { addToast } = useToasts();
	const location = useLocation().pathname;
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const { title, _id, image, likes, comments } = receipe;
	const user = useSelector((state) => state.user);
	const { userInfo } = user;
	let liked = false;
	let commented = false;
	if (userInfo?._id) {
		liked = likes.some(
			(like) => like.user.toString() === userInfo._id.toString()
		);
		commented = comments.some(
			(comment) => comment.user.toString() === userInfo._id.toString()
		);
	}

	const [approved, setApproved] = useState(receipe.approved);
	const [deleted, setDeleted] = useState(receipe ? false : true);
	const approve = () => {
		//approved recipes
		dispatch(approveReceipe(_id, { approved: true }));

		setApproved(true);
		addToast('Approved Recipe', { appearance: 'success' });
	};
	const unApproveReceipe = () => {
		//approved recipes
		dispatch(approveReceipe(_id, { approved: false }));

		setApproved(false);
		addToast('Unapproved Receipe', { appearance: 'success' });
	};
	const deleteReceipes = () => {
		//dlete recipes
		if (!deleted) {
			dispatch(deleteReceipe(_id));
			setDeleted(true);
			window.location.reload();
			addToast('Receipe Removed Successfully', { appearance: 'success' });
		} else {
			addToast('Receipe already deleted', { appearance: 'error' });
		}
	};

	return (
		(approved || review) && (
			<Grid className={classes.gridCard} item xs={24} md={3} xl={3}>
				<Card className={classes.root}>
					<CardMedia
						className={classes.media}
						image={image}
						title='Paella dish'
						onClick={() => history.push(`/receipe/${_id}`)}
					/>

					<CardActions className={classes.actions} disableSpacing>
						<Chip
							clickable
							color={liked ? 'secondary' : 'primary'}
							label={likes.length > 10 ? '10+ Likes' : `${likes.length} Likes`}
						/>
						<Chip
							clickable
							color={commented ? 'secondary' : 'primary'}
							label={
								comments.length > 10
									? '10+ comments'
									: `${comments.length} comments`
							}
						/>
					</CardActions>
					<h6
						onClick={() => history.push(`/receipe/${_id}`)}
						className={classes.heading}
					>
						{title}
					</h6>
					{location === '/admin' && userInfo?.isAdmin && userInfo?._id && (
						<div>
							<h5 style={{ textAlign: 'center' }}>
								{approved ? 'Approved' : 'Not approved'}
							</h5>
							<Button
								color='primary'
								variant='contained'
								fullWidth
								onClick={approve}
							>
								Approved
							</Button>
							<Button
								color='secondary'
								variant='contained'
								fullWidth
								onClick={unApproveReceipe}
							>
								Not Approved
							</Button>
							<Button
								color='danger'
								variant='contained'
								fullWidth
								onClick={deleteReceipes}
							>
								Delete
							</Button>
						</div>
					)}
				</Card>
			</Grid>
		)
	);
};
export default RecipeCard;
