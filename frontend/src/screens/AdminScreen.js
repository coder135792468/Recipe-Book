import React, { useEffect, useState } from 'react';
import { Loader } from '../layouts';
import { useSelector } from 'react-redux';
import { ReceipeCard } from '../components';
import { Helmet } from 'react-helmet';
import { constants } from '../helpers';
import { Header } from '../layouts';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { makeStyles, Grid, IconButton } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	header_con: {
		height: '50px',
		background: '#dfdfdf',
		display: 'grid',
		gridTemplateColumns: '0.5fr 1.5fr',
		placeItems: 'center',
	},
	go_back: {
		width: '40px',
		height: '40px',
		background: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '50%',
	},
}));

const AdminScreen = ({ history }) => {
	const classes = useStyles();
	const receipe = useSelector((state) => state.receipe);
	const { receipes: data, filter, loading } = receipe;
	const [receipes, setReceipes] = useState(data);

	const getData = (txt) => (txt?.length === 0 ? receipes : txt);
	useEffect(() => {
		setReceipes(data);
		// eslint-disable-next-line
	}, [data]);
	return (
		<>
			<Helmet>
				<title>Admin Page</title>
				<meta name='description' content='Admin Page for manage recipes' />
			</Helmet>
			<Header />
			<div>
				{loading && <Loader />}
				<div className={classes.header_con}>
					<IconButton onClick={() => history.goBack()}>
						<ArrowBackIcon />
					</IconButton>
					<strong style={{ margin: '0 auto' }}>Receipes</strong>
				</div>

				<Grid className={classes.root} container>
					{receipes?.length !== 0 ? (
						getData(filter)?.map((receipe) => (
							<ReceipeCard key={receipe.id} review={true} receipe={receipe} />
						))
					) : (
						<h6 className={classes.empty}>{constants.recipe.no_recipe}</h6>
					)}
				</Grid>
			</div>
		</>
	);
};

export default AdminScreen;
