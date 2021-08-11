import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { makeStyles } from '@material-ui/core';
import RecipeCard from './ReceipeCard';
import { constants } from '../helpers';

const useStyles = makeStyles({
	con: {
		padding: '0 30px',
	},
	each_slide: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundSize: 'cover',
		height: '350px',
		backgroundColor: '#efefef',
		margin: '5px auto',
		borderRadius: '10px',
		overflow: 'hidden',
	},
});

const TopReceipes = ({ receipes }) => {
	const classes = useStyles();

	const data = receipes.filter((receipe) => receipe.approved);
	return (
		<>
			<h1 className={classes.con}>{constants.recipe.top_receipes}</h1>
			<Slide className='slide' indicators={true} easing='ease'>
				{data?.map((receipe) => (
					<div className={classes.each_slide}>
						<RecipeCard receipe={receipe} />
					</div>
				))}
			</Slide>
		</>
	);
};

export default TopReceipes;
