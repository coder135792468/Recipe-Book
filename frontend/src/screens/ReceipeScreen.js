import React, { useEffect, useState, useRef } from 'react';

import { useToasts } from 'react-toast-notifications';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRecipes,
	likeReceipe,
	commentReceipe,
} from '../store/actions/receipeAction';
import { constants } from '../helpers';
import { makeStyles, IconButton } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { Comments, ReceipeInfo, ReceipeHelpInfo } from '../layouts';
import { getUserData } from '../store/actions/userAction';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	img: {
		width: ' 300px',
		margin: ' 10px',
		borderRadius: ' 30px',
		objectFit: ' contain',
		position: ' relative',
		left: ' calc(50% - 150px)',
	},
	h2: {
		textAlign: 'center',
		color: 'rgb(77, 73, 73)',
		fontSize: '1.2rem',
		display: 'flex',
		alignItems: 'center',
		marginTop: '0',
		position: 'sticky',
		top: '0',
		zIndex: '3',
		backgroundColor: 'rgb(252, 252, 252)',
		backdropFilter: 'blur(40px)',
	},
	back_button: {
		backgroundColor: 'rgba(245, 245, 245, 0.644)',
		padding: '15px',
		borderRadius: '50%',
		margin: '0 5px',
	},
	desc: {
		padding: ' 10px 20px',
		margin: ' 10px',
		backgroundColor: ' rgba(255, 255, 255, 0.726)',
	},
	p1: {
		textAlign: ' center',
		width: ' 100%',
		fontWeight: ' 300',
		letterSpacing: ' 2px',
	},
	receipe_screen: {
		height: '100vh',
		zIndex: '5',
		position: 'relative',
	},
	p2: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgb(255, 138, 28)',
		borderRadius: '30px',
		color: '#fff',
		maxWidth: '300px',
		margin: '0 auto',
		boxShadow: '0 5px 30px rgba(158, 152, 152, 0.203)',
	},
	h4: {
		margin: '15px',
	},
	ingredients: {
		backgroundColor: 'rgb(247, 228, 247)',
		padding: '30px',
		whiteSpace: 'pre-wrap',
		borderRadius: '10px',
		maxWidth: '80vw',
		margin: '20px auto',
	},
	steps: {
		whiteSpace: 'pre-wrap',
	},
	feedbackcon: {
		height: '350px',
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
	const receipes = useSelector((state) => state.receipe.receipes);

	const userInfo = useSelector((state) => state.user.userInfo);
	const con = useRef(null);
	const [info, setInfo] = useState(
		receipes.find((ele) => ele._id === match.params.id)
	);

	// eslint-disable-next-line
	const [liked, setLiked] = useState(false);
	const [commented, setCommented] = useState(false);
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
		setInfo(receipes.find((ele) => ele._id === match.params.id));
		if (userInfo?._id) {
			setLiked(
				info?.likes.some(
					(like) => like.user.toString() === userInfo._id.toString()
				)
			);
			setCommented(
				info?.comments.some(
					(comment) => comment.user.toString() === userInfo._id.toString()
				)
			);
		}
		setLikes(info?.likes.length);
		setComments(info?.comments);

		//eslint-disable-next-line
	}, [receipes, info]);

	const handleLike = () => {
		if (userInfo?._id) {
			if (liked) {
				setLiked(false);
				setLikes(likes - 1);
			} else {
				setLiked(true);
				setLikes(likes + 1);
			}
			dispatch(likeReceipe(info?._id, userInfo.token));

			// eslint-disable-next-line
		} else {
			addToast(constants.auth.likeInfo, { appearance: 'error' });
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
				addToast(constants.auth.feedbackGiven, {
					appearance: 'info',
				});
			}
		} else {
			addToast(constants.auth.commentInfo, { appearance: 'info' });
		}
	};
	return (
		<div ref={con} className={classes.receipe_screen}>
			<Helmet>
				<title>{info?.title}</title>
			</Helmet>
			<h2>
				<ArrowBackIcon
					onClick={() => history.goBack()}
					className={classes.back_button}
				/>
				<p className={classes.p1}>{info?.title.toUpperCase()}</p>
			</h2>

			<img className={classes.img} src={info?.image} alt={info?.title} />
			<div className={classes.desc}>
				<p className={classes.p2}>
					<h4 className={classes.h4}>Time:</h4>
					{info?.time ? info.time : constants.recipe.no_time}
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
						<p style={{ textAlign: 'center' }}>{constants.auth.viewComment}</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default ReceipeScreen;
