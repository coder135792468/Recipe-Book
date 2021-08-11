import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../layouts';
import { getRecipes } from '../store/actions/receipeAction';
import ReceipeCard from './ReceipeCard';
import { constants } from '../helpers';
import { Helmet } from 'react-helmet';
import TopReceipes from './TopReceipes';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	heading: {
		padding: '0 30px',
	},
	empty: {
		margin: '0 auto',
	},
}));

const Recipe = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const receipe = useSelector((state) => state.receipe);
	const { filter, loading, recentReceipes, popularReceipes } = receipe;
	useEffect(() => {
		dispatch(getRecipes());
		// eslint-disable-next-line
	}, []);

	const getData = () => (filter.length !== 0 ? filter : popularReceipes);
	return (
		<>
			<Helmet>
				<title>Home</title>
			</Helmet>
			{!loading ? (
				<>
					<Grid className={classes.grid} container>
						{popularReceipes?.length !== 0 ? (
							getData().map((receipe) => (
								<ReceipeCard key={receipe.id} receipe={receipe} />
							))
						) : (
							<h6 className={classes.empty}>{constants.recipe.no_recipe}</h6>
						)}
					</Grid>
					<TopReceipes receipes={popularReceipes} />

					<h3 style={{ padding: '0 30px' }}>
						{constants.recipe.recent_receipes}
					</h3>
					<Grid className={classes.grid} container>
						{!filter?.length && recentReceipes?.length !== 0 ? (
							recentReceipes?.map((receipe) => (
								<ReceipeCard key={receipe.id} receipe={receipe} />
							))
						) : (
							<h6 className={classes.empty}>{constants.recipe.no_recipe}</h6>
						)}
					</Grid>
				</>
			) : (
				<Loader />
			)}
		</>
	);
};

export default Recipe;
