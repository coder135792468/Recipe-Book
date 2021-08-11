import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton, makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Time } from '../components';
import { InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { constants, shuffleArray, findEmptyCon, gameOver } from '../helpers';
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
	game_screen: {
		position: ' absolute',
		width: ' 100vw',
		height: ' 100vh',
	},
	nav: {
		height: ' 50px',
		width: ' 100%',
		margin: ' auto',
		backgroundColor: ' #efefefef',
		display: ' flex',
		alignItems: ' center',
		justifyContent: ' space-around',
		color: ' rgb(44, 42, 42)',
	},
	main: {
		height: 'calc(100vh - 50px)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},

	result: {
		display: ' flex',
		alignItems: ' center',
		marginTop: ' 5px',
		'& img': {
			width: ' 100px',
			height: ' 100px',
			borderRadius: ' 20px',
		},
		'& h4': {
			marginRight: '10px',
		},
	},
	start_button: {
		marginBottom: '20px',
	},
	container: {
		display: ' grid',
		gridTemplateColumns: ' 1fr 1fr 1fr',
		width: ' 250px',
		height: ' 250px',
		border: ' 4px solid #456990',
		'& div': {
			background: ' #456990',
			width: ' calc(250px / 3)',
			height: ' calc(250px / 3)',
			fontSize: ' 2rem',
			boxSizing: ' border-box',
			border: ' 1px solid whitesmoke',
			backgroundSize: ' 250px 250px',
		},
		'& .blue': {
			backgroundColor: ' blue',
			backgroundPosition: ' top left',
		},
		'& .green': {
			backgroundColor: ' green',
			backgroundPosition: ' top center',
		},
		'& .pink': {
			backgroundColor: ' pink',
			backgroundPosition: ' top right',
		},
		'& .yellow ': {
			backgroundColor: ' yellow',
			backgroundPosition: ' center left',
		},
		'& .black': {
			backgroundColor: ' black',
			backgroundPosition: ' center center',
		},
		'& .purple': {
			backgroundColor: ' purple',
			backgroundPosition: ' center right',
		},
		'& .skyblue': {
			backgroundColor: ' skyblue',
			backgroundPosition: ' bottom left',
		},
		'& .grey': {
			backgroundColor: ' grey',
			backgroundPosition: ' bottom center',
		},
		'& .empty': {
			background: ' #49445a',
			backgroundPosition: ' bottom right',
			filter: ' blur(109px)',
			backdropFilter: ' blur(50px)',
		},
	},
}));

const PuzzleGame = ({ history }) => {
	const classes = useStyles();

	const { addToast } = useToasts();
	const receipe = useSelector((state) => state.receipe);
	const images = receipe.receipes?.map((ele) => ele.image);

	//declaring varivales

	const [letters] = useState([
		'blue',
		'green',
		'pink',
		'yellow',
		'black',
		'purple',
		'skyblue',
		'grey',
		'empty',
	]);
	const shuffled = shuffleArray(letters);
	const [url] = useState(images[Math.floor(Math.random() * images.length)]);

	const con = useRef(null);
	const [start, setStart] = useState(false);

	const handleChange = (e) => {
		if (!start) {
			addToast('Click on start button!!!', { appearance: 'info' });
			return;
		}
		let emptyCon = parseInt(findEmptyCon(con.current));
		let myclickId = parseInt(e.target.id);

		if (
			myclickId + 1 === emptyCon ||
			myclickId + 3 === emptyCon ||
			myclickId - 1 === emptyCon ||
			myclickId - 3 === emptyCon
		) {
			let myclickHtml = con.current.childNodes[myclickId].className;
			con.current.childNodes[myclickId].className = 'empty';
			con.current.childNodes[emptyCon].className = myclickHtml;
		}
		if (gameOver(letters, con.current)) {
			setTimeout(() => {
				alert('You won!!!!!');
				history.push('/');
			}, 1000);
		}
	};
	const startGame = () => {
		setStart(!start);
	};
	return (
		<div className={classes.game_screen}>
			<Helmet>
				<title>Puzzle Game</title>
			</Helmet>
			<nav className={classes.nav}>
				<IconButton onClick={() => history.push('/')}>
					<ArrowBackIcon />
				</IconButton>
				<strong>Puzzle Game</strong>
				<IconButton onClick={() => alert(constants.game.helperText)}>
					<InfoOutlined />
				</IconButton>
			</nav>
			<main className={classes.main}>
				{start && <Time />}
				<Button
					onClick={startGame}
					className={classes.start_button}
					variant='contained'
					color='primary'
				>
					{!start ? 'Start' : 'Restart'}
				</Button>
				<div ref={con} className={classes.container}>
					{shuffled.map((ele, index) => (
						<div
							id={index.toString()}
							onClick={handleChange}
							className={ele}
							style={{
								backgroundImage: `url(${url})`,
							}}
						></div>
					))}
				</div>
				<div className={classes.result}>
					<h4>You need to create: </h4>
					<img src={url} alt='Couldnt Load' />
				</div>
			</main>
		</div>
	);
};

export default PuzzleGame;
