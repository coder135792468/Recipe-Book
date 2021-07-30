import React, { useEffect } from 'react';
import { Receipe } from '../components';
import { getUserData } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../layouts';
import { Helmet } from 'react-helmet';
import { Header } from '../layouts';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
	title: {
		margin: '20px',
		fontSize: '1.4rem',
		fontWeight: '200',
	},
	spancon: {
		marginLeft: '10px',
	},
});
const HomeScreen = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const receipe = useSelector((state) => state.receipe);
	const { loading } = receipe;
	useEffect(() => {
		if (!user?.userInfo?._id) {
			dispatch(getUserData());
		}
		// eslint-disable-next-line
	}, []);

	return (
		<main>
			<Helmet>
				<title>Home</title>
				<meta name='description' content='Share your receipes here' />
			</Helmet>
			<Header />

			{loading && <Loader />}
			<h3 className={classes.title}>
				Our Receipes for you{' '}
				<span
					style={{ marginLeft: '10px' }}
					className='fa fa-arrow-right'
				></span>
			</h3>
			<Receipe />
		</main>
	);
};
export default HomeScreen;
