import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../store/actions/receipeAction';
import { getUserData } from '../store/actions/userAction';
import { ReceipeCard } from '../components';
import { Helmet } from 'react-helmet';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { makeStyles, Grid, IconButton, Card } from '@material-ui/core';
import { constants } from '../helpers';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	con: {
		height: '100vh',
		overflow: 'scroll',
	},
	header_con: {
		height: ' 250px',
		background: theme.palette.primary.main,
		textAlign: 'center',
		color: '#fff',
		borderRadius: '0 0 40px 40px',
	},
	header: {
		height: '40px',
		backgroundColor: theme.palette.secondary.main,
		zIndex: ' 5',

		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		overflow: 'hidden',
		position: 'sticky',
		top: 0,
	},
	image: {
		width: '80px',
		height: '80px',
		marginTop: '50px',
		borderRadius: '50%',
		padding: 3,
		border: '3px solid #4488ff',
	},
	empty: {
		textAlign: 'center',
		width: '100%',
		marginTop: '20vh',
	},
}));

const ProfileScreen = ({ history }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const receipe = useSelector((state) => state.receipe);
	const { receipes, filter } = receipe;
	const user = useSelector((state) => state.user);
	const { userInfo } = user;
	let myReceipe = null;
	if (userInfo?._id) {
		// eslint-disable-next-line
		myReceipe = receipes.filter(
			(receipe) => receipe.user.toString() === userInfo._id.toString()
		);
	}
	useEffect(() => {
		if (!userInfo?._id) {
			dispatch(getUserData());
		}
		if (receipes?.length === 0) {
			dispatch(getRecipes());
		}
		// eslint-disable-next-line
	}, []);

	const getData = () => (filter.length !== 0 ? filter : myReceipe);
	return (
		<div className={classes.con}>
			<Helmet>
				<title>Profile</title>
				<meta name='description' content='Share your receipes here' />
			</Helmet>
			<Card className={classes.header_con}>
				<div className={classes.header}>
					<IconButton onClick={() => history.goBack()}>
						<ArrowBackIcon />
					</IconButton>
					<code margin={{ margin: '0 40px' }}>{userInfo?.name}</code>
					{userInfo?.isAdmin && (
						<IconButton onClick={() => history.push('/admin')}>
							<DashboardIcon />
						</IconButton>
					)}
				</div>
				{userInfo?._id && userInfo?.avatar ? (
					<img
						className={classes.image}
						src={userInfo.avatar}
						alt={userInfo.name}
					/>
				) : (
					<span
						style={{
							fontSize: '2rem',
							margin: '30px auto',
							padding: '30px',
						}}
						className='fa fa-user'
					></span>
				)}
				<p>{userInfo?.bio ? userInfo.bio : 'No bio'}</p>
			</Card>

			<Grid className={classes.root} container>
				{myReceipe?.length !== 0 ? (
					getData().map((receipe) => (
						<ReceipeCard key={receipe.id} receipe={receipe} />
					))
				) : (
					<h2 className={classes.empty}>
						{constants.recipe.no_recipe} Approved
					</h2>
				)}
			</Grid>
		</div>
	);
};

export default ProfileScreen;
