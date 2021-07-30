const shuffleArray = (arr) => {
	const copy = [...arr];
	for (let i = 0; i < copy.length; i++) {
		let j = parseInt(Math.random() * copy.length);
		let temp = copy[i];
		copy[i] = copy[j];
		copy[j] = temp;
	}
	return copy;
};
const findEmptyCon = (con) => {
	for (let i = 0; i < con.children.length; i++) {
		if (con.children[i].className === 'empty') {
			return con.children[i].id;
		}
	}
	return 'NOT FOUND';
};
const gameOver = (arr, con) => {
	let count = 0;
	for (let j = 0; j < con.children.length; j++) {
		if (arr[j] === con.children[j].className) {
			++count;
		}
	}
	if (count === arr.length) {
		return true;
	} else {
		return false;
	}
};

export { shuffleArray, findEmptyCon, gameOver };
