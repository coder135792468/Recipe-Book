import React, { useEffect, useState, useRef } from 'react';
import '../styles/receipe_screen.scss';
import { useToasts } from 'react-toast-notifications';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecipes,
	likeReceipe,
	unlikeReceipe,
	commentReceipe,
} from '../store/actions/receipeAction';
import { makeStyles, IconButton } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Comments, ReceipeInfo, Steps, ReceipeHelpInfo } from '../layouts';
import { getUserData } from '../store/actions/userAction';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},

	feedbackcon: {
		height: '350px',
		backgroundColor: ' #3e829a',
		backgroundColor: theme.palette.primary.main,
		borderRadius: ' 30px 30px 0 0',
		overflow: 'hidden',
	},
	feedbackheader: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: '4px 0',
		height: '40px',
		borderBottom: '1px solid whitesmoke',
		overflow: 'hidden',
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
		maxWidth: ' 600px',
		backgroundColor: ' #efefef',
		borderRadius: '40px',
		display: ' flex',
	},
	comment: {
		flex: ' 1',
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
					onClick={() => history.goBack()}
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
			</div>

			{info?.about && (
				<ReceipeInfo
					title={'About'}
					content={info?.about}
					bg={'rgba(0,0,250,0.3)'}
				/>
			)}
			<ReceipeHelpInfo
				des={false}
				title={'Ingredients'}
				content={info?.ingredients}
			/>
			<ReceipeHelpInfo des={true} title={'Steps'} desc={info?.description} />

			{info?.conclusion && (
				<ReceipeInfo title={'Conclusion'} content={info?.conclusion} />
			)}

			<div className={classes.feedbackcon}>
				<div className={classes.feedbackheader}>
					<IconButton className={classes.headerelement} onClick={handleLike}>
						{likes > 10 ? '10+' : likes}

						<FavoriteIcon style={{ color: liked && 'tomato' }} />
					</IconButton>
					<IconButton className={classes.headerelement}>
						{comments?.length > 10 ? '10+' : comments?.length}

						<span
							style={{ margin: '0 10px', color: commented && 'tomato' }}
							className='fa fa-comment'
						></span>
					</IconButton>
				</div>
				<div className={classes.feedbackaddcon}>
					<input
						className={classes.comment}
						value={text}
						onChange={(e) => setText(e.target.value)}
						type='text'
						placeholder='Enter a Feedback'
					/>
					<IconButton className={classes.send} onClick={handleComment}>
						<SendIcon />
					</IconButton>
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
