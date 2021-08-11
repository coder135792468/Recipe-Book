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

const bubbleSort = (receipes) => {
	for (let i = 0; i < receipes.length - 1; i++) {
		for (let j = 0; j < receipes.length - i - 1; j++) {
			if (receipes[j].likes.length > receipes[i].likes.length) {
				let newData = receipes[i];
				receipes[i] = receipes[j];
				receipes[j] = newData;
			}
		}
	}
	return receipes;
};

export { shuffleArray, findEmptyCon, gameOver, bubbleSort };
