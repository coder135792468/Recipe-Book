import React, { useEffect, useState } from 'react';
import {
	Paper,
	InputBase,
	Divider,
	IconButton,
	makeStyles,
} from '@material-ui/core';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_SEARCH } from '../store/constants/types';
import { searchText } from '../store/actions/receipeAction';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';
import { Link, useHistory, useLocation } from 'react-router-dom';
import '../styles/header.scss';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		boxShadow: 'none',
		position: 'sticky',
		top: '0',
		zIndex: '5',
	},
	input: {
		flex: 0.7,
		margin: '0 auto',
		background: 'rgba(0,0,0,0.1)',
		padding: '3px 20px',
		borderRadius: '40px',
	},
	iconButton: {
		padding: 10,
	},
	divider: {
		height: 28,
		margin: 4,
	},
	image: {
		width: '30px',
		height: ' 30px',
		borderRadius: '50%',
		boxSizing: 'border-box',
		border: '2px solid green',
	},
}));

const Header = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const { userInfo } = user;
	const path = useLocation().pathname;
	const history = useHistory();
	const [text, setText] = useState('');
	useEffect(() => {
		if (!text) {
			dispatch({
				type: CLEAR_SEARCH,
			});
		}
		// eslint-disable-next-line
	}, [text]);
	const onChange = (e) => {
		setText(e.target.value);
		dispatch(searchText(text));
	};
	return (
		<Paper
			style={{ positon: 'sticky', top: '0' }}
			component='form'
			className={classes.root}
		>
			<Link style={{ margin: '0 6px' }} to='/'>
				<HomeIcon />
			</Link>
			<Divider className={classes.divider} orientation='vertical' />
			{path === '/' && userInfo?._id && (
				<IconButton onClick={() => history.push('/profile')}>
					{userInfo?.id && userInfo?.avatar ? (
						<img src={userInfo.avatar} alt={userInfo.title} />
					) : (
						<FaceIcon />
					)}
				</IconButton>
			)}

			<InputBase
				className={classes.input}
				value={text}
				onChange={onChange}
				placeholder='Search Receipe...'
			/>
			<p>
				<IconButton
					className={classes.iconButton}
					aria-label='search'
					onClick={() => history.push('/game')}
				>
					<SportsEsportsIcon />
				</IconButton>
			</p>

			<Divider className={classes.divider} orientation='vertical' />
			<IconButton
				color='primary'
				className={classes.iconButton}
				aria-label='directions'
			>
				{}

				{!userInfo?._id && (
					<PersonIcon onClick={() => history.push('/login')} />
				)}

				{userInfo?._id && <AddIcon onClick={() => history.push('/add')} />}
			</IconButton>
		</Paper>
	);
};

export default Header;
