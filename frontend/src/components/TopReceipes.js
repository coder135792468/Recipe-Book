import React from 'react';
import '../styles/slider.scss';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { makeStyles } from '@material-ui/core';
import RecipeCard from './ReceipeCard';
const useStyles = makeStyles({
	con: {
		padding: '0 30px',
	},
});
const TopReceipes = ({ receipes }) => {
	const classes = useStyles();
	return (
		<>
			<h1 className={classes.con}>Top Receipes for you</h1>
			<Slide indicators={true} easing='ease'>
				{receipes?.map((receipe) => (
					<div className='each-slide'>
						<RecipeCard receipe={receipe} />
					</div>
				))}
			</Slide>
		</>
	);
};

export default TopReceipes;
