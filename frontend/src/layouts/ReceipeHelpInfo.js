import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FastfoodIcon from '@material-ui/icons/Fastfood';
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	item: {
		boxShadow: '0 2px 2px rgba(0,0,0,.04)',
		width: '100%',
	},
}));

const ReceipeHelpInfo = ({ title, content: ingredients, desc, des }) => {
	const classes = useStyles();
	const getData = (des) => (des ? desc : ingredients);
	return (
		<div style={{ padding: '0 30px' }}>
			<h4>{title}</h4>
			<List className={classes.root}>
				{getData(des)?.map((ele, index) => (
					<ListItem className={classes.item} key={index + 1}>
						<ListItemAvatar>
							<Avatar>
								<FastfoodIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={des ? `Step:${index + 1}` : ele.title}
							secondary={des ? ele.step : ele.qty}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default ReceipeHelpInfo;
