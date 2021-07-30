import React, { useEffect, useState } from 'react';

const Time = () => {
	const [min, setMin] = useState('');
	const [sec, setSec] = useState('');
	const [time, setTime] = useState(0);
	useEffect(() => {
		setTimeout(() => {
			setTime(time + 1);
			setMin(parseInt((time / 60) % 60));
			setSec(parseInt(time % 60));
		}, 1000);
	}, [time]);
	return (
		<h2>
			Time:{min}:{sec}
		</h2>
	);
};

export default Time;
