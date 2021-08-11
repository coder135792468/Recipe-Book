import React from 'react';
import {
	DialogActions,
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
	List,
	ListItemText,
	ListItem,
	ListItemAvatar,
	Avatar,
	makeStyles,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import { blue } from '@material-ui/core/colors';
const useStyles = makeStyles({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600],
	},
});

const DialogBox = ({
	open,
	setOpen,
	ing,
	deleteIng,
	des,
	deleteDes,
	isDes,
}) => {
	const classes = useStyles();
	const deleteList = (id) => {
		if (!isDes) {
			deleteIng(id);
		} else {
			deleteDes(id);
		}
	};
	const getData = (isDes) => (isDes ? des : ing);
	return (
		<div>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
				<DialogTitle id='form-dialog-title'>
					{isDes ? 'Steps' : 'Ingredients'}
				</DialogTitle>
				<DialogContent>
					<List>
						{getData(isDes)?.map((ele, index) => (
							<ListItem button key={index + 1}>
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<EmojiFoodBeverageIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={isDes ? ele.step : ele.ingredient} />
								<Button
									onClick={() =>
										deleteList(isDes ? ele.step_id : ele.ingredient_id)
									}
									variant='contained'
									color='secondary'
								>
									<DeleteOutlineIcon />
								</Button>
							</ListItem>
						))}
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default DialogBox;
