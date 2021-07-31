import React, { useState } from 'react';
import {
	DialogActions,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Button,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
const DialogBox = ({
	open,
	setOpen,
	ing,
	addIng: add,
	addDes: addD,
	isDes = false,
}) => {
	const [ingredient, setIngredient] = useState('');
	const [qty, setQty] = useState('');
	const [step, setStep] = useState('');
	const addIng = () => {
		add({
			ingredient,
			qty,
			ingredient_id: uuidv4(),
		});
		setIngredient('');
		setQty('');
		setStep('');
		setOpen(false);
	};
	const addDes = () => {
		addD({
			step_id: uuidv4(),
			step,
		});
		setIngredient('');
		setQty('');
		setStep('');
		setOpen(false);
	};
	return (
		<div>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>
					{isDes ? 'Add Step' : 'Add Ingredient'}
				</DialogTitle>
				<DialogContent>
					{!isDes && (
						<TextField
							autoFocus
							label='Enter Ingredient'
							type='text'
							fullWidth
							autoComplete='off'
							value={ingredient}
							onChange={(e) => setIngredient(e.target.value)}
						/>
					)}
					{!isDes && (
						<TextField
							style={{ margin: '5px 0' }}
							label='Enter Quantity'
							type='text'
							fullWidth
							autoComplete='off'
							value={qty}
							onChange={(e) => setQty(e.target.value)}
						/>
					)}
					{isDes && (
						<TextField
							style={{ margin: '5px 0' }}
							label='Enter Step'
							type='text'
							fullWidth
							autoComplete='off'
							value={step}
							onChange={(e) => setStep(e.target.value)}
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color='primary'>
						Cancel
					</Button>
					{!isDes ? (
						<Button onClick={addIng} color='primary'>
							Add
						</Button>
					) : (
						<Button onClick={addDes} color='primary'>
							Add
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default DialogBox;
