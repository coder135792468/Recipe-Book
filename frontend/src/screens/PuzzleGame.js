import React, { useRef, useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../styles/game_screen.scss';
import { IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Time } from '../components';
import { InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { constants, shuffleArray, findEmptyCon, gameOver } from '../helpers';
import { useToasts } from 'react-toast-notifications';

const PuzzleGame = ({ history }) => {
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
		<div className='game_screen'>
			<Helmet>
				<title>Puzzle Game</title>
			</Helmet>
			<nav>
				<IconButton onClick={() => history.push('/')}>
					<ArrowBackIcon />
				</IconButton>
				<strong>Puzzle Game</strong>
				<IconButton onClick={() => alert(constants.game.helperText)}>
					<InfoOutlined />
				</IconButton>
			</nav>
			<main>
				{start && <Time />}
				<Button
					onClick={startGame}
					className='start_button'
					variant='contained'
					color='primary'
				>
					{!start ? 'Start' : 'Restart'}
				</Button>
				<div ref={con} className='container'>
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
				<div className='result'>
					<h4>You need to create: </h4>
					<img src={url} alt='Couldnt Load' />
				</div>
			</main>
		</div>
	);
};

export default PuzzleGame;
