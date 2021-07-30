import React from 'react';

import { makeStyles, Card, CardContent, Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '500px',
		margin: '20px auto',
		boxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.2)',
	},
}));
const Comments = ({ comment: { name, text: comment } }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color='textSecondary'
					gutterBottom
				>
					{name}
				</Typography>
				<Typography variant='body2' component='p'>
					{comment}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Comments;
