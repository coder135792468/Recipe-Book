import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	loader_screen: {
		zIndex: ' 45',
		position: ' fixed',
		width: ' 100vw',
		height: ' 100vh',
		top: ' 0',
		left: ' 0',
		display: ' flex',
		justifyContent: ' center',
		alignItems: ' center',
		backgroundColor: ' rgba(0, 0, 0, 0.4)',
	},
	/* loader */
	sk_chase: {
		width: '40px',
		height: '40px',
		position: 'relative',
		animation: 'sk-chase 2.5s infinite linear both',
		overflow: 'hidden',
		'& .sk-chase-dot': {
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: '0',
			top: '0',
			animation: 'sk-chase-dot 2s infinite ease-in-out both',

			'&:before': {
				content: "''",
				display: 'block',
				width: '25%',
				height: '25%',
				backgroundColor: '#fff',
				borderRadius: '100%',
				animation: 'sk-chase-dot-before 2s infinite ease-in-out both',
			},

			'&:nth-child(1)': {
				animationDelay: '-1.1s',
			},
			'&:nth-child(2)': {
				animationDelay: '-1s',
			},
			'&:nth-child(3)': {
				animationDelay: '-0.9s',
			},
			'&:nth-child(4)': {
				animationDelay: '-0.8s',
			},
			'&:nth-child(5)': {
				animationDelay: '-0.7s',
			},
			'&:nth-child(6)': {
				animationDelay: '-0.6s',
			},
			'&:nth-child(1):before': {
				animationDelay: '-1.1s',
			},
			'&:nth-child(2):before': {
				animationDelay: '-1s',
			},
			'&:nth-child(3):before': {
				animationDelay: '-0.9s',
			},
			'&:nth-child(4):before': {
				animationDelay: '-0.8s',
			},
			'&:nth-child(5):before': {
				animationDelay: '-0.7s',
			},
			'&:nth-child(6):before': {
				animationDelay: '-0.6s',
			},
		},
	},
}));
const Loader = () => {
	const classes = useStyles();

	return (
		<div className={classes.loader_screen}>
			<div className={classes.sk_chase}>
				<div className='sk-chase-dot'></div>
				<div className='sk-chase-dot'></div>
				<div className='sk-chase-dot'></div>
				<div className='sk-chase-dot'></div>
				<div className='sk-chase-dot'></div>
				<div className='sk-chase-dot'></div>
			</div>
		</div>
	);
};

export default Loader;
