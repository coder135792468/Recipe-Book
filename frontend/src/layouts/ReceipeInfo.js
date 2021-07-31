import React from 'react';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles((theme) => ({
	section: {
		backgroundColor: 'rgba(255,0,0,0.5)',
		padding: '10px 30px',
		margin: '10px auto',
		width: '70%',
		whiteSpace: 'text-wrap',
		borderRadius: '10px',
	},
	heading: {
		padding: '10px 30px',
	},
}));
const ReceipeInfo = ({ title, content, bg }) => {
	const classes = styles();
	return (
		<div>
			<h4 className={classes.heading}>{title}</h4>
			<p style={{ backgroundColor: bg && bg }} className={classes.section}>
				{content}
			</p>
		</div>
	);
};

export default ReceipeInfo;
