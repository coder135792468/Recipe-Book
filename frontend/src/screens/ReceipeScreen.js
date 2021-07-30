import React, { useEffect, useState, useRef } from 'react';
import '../styles/receipe_screen.scss';
import { useToasts } from 'react-toast-notifications';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecipes,
	likeReceipe,
	unlikeReceipe,
	commentReceipe,
} from '../store/actions/receipeAction';
import { makeStyles, Grid, Button } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Comments } from '../layouts';
import { getUserData } from '../store/actions/userAction';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	feedbackcon: {
		height: '350px',
		backgroundColor: ' #3e829a',

		borderRadius: ' 30px 30px 0 0',
	},
	feedbackheader: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '4px 0',
		height: '40px',
		borderBottom: '1px solid whitesmoke',
	},
	headerelement: {
		padding: '5px 20px',
		backgroundColor: '#fff',
		marginTop: '10px',
		color: '#555',
		borderRadius: '40px',
		display: 'flex',
		alignItems: 'center',
	},
	feedbackaddcon: {
		width: ' 90%',
		margin: ' auto',
		height: ' 35px',
		maxWidth: ' 600px',
		backgroundColor: ' #efefef',
		borderRadius: ' 20px',
		display: ' flex',
	},
	comment: {
		flex: ' 1',
		height: ' 35px',
		padding: ' 0 15px',
		border: ' none',
		borderRadius: ' 20px 0 0 20px',
		outline: ' none',
	},
	feedback: {
		backgroundColor: ' #efefef',
		height: ' calc(350px - 130px)',
		padding: ' 10px',
		width: ' 80%',
		margin: ' 10px auto',
		borderRadius: ' 20px',
		overflow: ' scroll',
	},
	send: {
		width: '35px',
		height: '35px',
		borderRadius: '50%',
		background: '#4488ff',
		border: 'none',
		outline: 'none',
	},
}));
const ReceipeScreen = ({ history, match }) => {
	const classes = useStyles();
	const { addToast } = useToasts();
	const dispatch = useDispatch();
	const receipe = useSelector((state) => state.receipe);
	const { receipes } = receipe;

	const user = useSelector((state) => state.user);
	const { userInfo } = user;
	const con = useRef(null);
	const [info, setInfo] = useState(
		receipes.find((ele) => ele._id === match.params.id)
	);
	let isLiked = false;
	let isCommented = false;
	// eslint-disable-next-line
	const [liked, setLiked] = useState(isLiked);
	const [commented, setCommented] = useState(isCommented);
	const [text, setText] = useState('');

	const [likes, setLikes] = useState(info?.likes.length);
	const [comments, setComments] = useState(info?.comments);
	useEffect(() => {
		if (!receipes?.length) {
			dispatch(getRecipes());
		}
		if (!userInfo?._id) {
			dispatch(getUserData());
		}
		con.current.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (userInfo?._id) {
			// eslint-disable-next-line
			isLiked = info?.likes.some(
				(like) => like.user.toString() === userInfo._id.toString()
			);
			// eslint-disable-next-line
			isCommented = info?.comments.some(
				(comment) => comment.user.toString() === userInfo._id.toString()
			);
		}
		setLiked(isLiked);
		setCommented(isCommented);
		// eslint-disable-next-line
	}, [info]);

	const handleLike = () => {
		if (userInfo?._id) {
			if (liked) {
				dispatch(unlikeReceipe(info?._id, userInfo.token));
				setLiked(false);
				setLikes(likes - 1);
				dispatch(getRecipes());
				setInfo(receipes.find((ele) => ele._id === match.params.id));
			} else {
				dispatch(likeReceipe(info?._id, userInfo.token));
				setLiked(true);
				setLikes(likes + 1);
				dispatch(getRecipes());

				setInfo(receipes.find((ele) => ele._id === match.params.id));
			}

			// eslint-disable-next-line
		} else {
			addToast('Please Login to Like', { appearance: 'error' });
		}
	};

	const handleComment = () => {
		if (userInfo?._id) {
			if (!commented) {
				dispatch(commentReceipe(info?._id, text));
				setCommented(true);
				setComments([
					...comments,
					{
						text,
						name: userInfo?.name,
					},
				]);
				setText('');
			} else {
				addToast('You have already Given Your feedback', {
					appearance: 'info',
				});
			}
		} else {
			addToast('Please Login to comment', { appearance: 'info' });
		}
	};
	return (
		<div ref={con} className='receipe_screen'>
			<Helmet>
				<title>{info?.title}</title>
			</Helmet>
			<h2>
				<ArrowBackIcon
					onClick={() => history.push('/')}
					className='back_button'
				/>
				<p>{info?.title.toUpperCase()}</p>
			</h2>

			<img src={info?.image} alt={info?.title} />
			<div className='desc'>
				<p>
					<h4>Time:</h4>
					{info?.time ? info.time : 'No Time Given'}
				</p>

				<h4>Ingredients:</h4>
				<p className='ingredients'>
					{info?.ingredients ? info.ingredients : 'NO Ingredients Given'}
				</p>
				{info?.description && <h4>Steps:</h4>}
				<p className='steps'>{info?.description}</p>
			</div>

			<div className={classes.feedbackcon}>
				<div className={classes.feedbackheader}>
					<strong className={classes.headerelement} onClick={handleLike}>
						{likes > 10 ? '10+' : likes}

						<span
							style={{ margin: '0 10px', color: liked && 'tomato' }}
							className='fa fa-heart'
						></span>
					</strong>
					<Button className={classes.headerelement}>
						{comments?.length > 10 ? '10+' : comments?.length}

						<span
							style={{ margin: '0 10px', color: commented && 'tomato' }}
							className='fa fa-comment'
						></span>
					</Button>
				</div>
				<div className={classes.feedbackaddcon}>
					<input
						className={classes.comment}
						value={text}
						onChange={(e) => setText(e.target.value)}
						type='text'
						placeholder='Enter a Feedback'
					/>
					<button className={classes.send} onClick={handleComment}>
						<span className='fa fa-arrow-right'></span>
					</button>
				</div>
				<div className={classes.feedback}>
					{userInfo?._id ? (
						<>
							{comments?.map((comment, index) => (
								<Comments key={index + 1} comment={comment} />
							))}
						</>
					) : (
						<p style={{ textAlign: 'center' }}>
							Please Login to View and Add Comment
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default ReceipeScreen;
