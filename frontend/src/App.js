import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	HomeScreen,
	ReceipeScreen,
	PuzzleGame,
	AddScreen,
	ProfileScreen,
	AdminScreen,
} from './screens';
import { Helmet } from 'react-helmet';
import { Login, Register, PrivateRoute } from './auth';
import { ToastProvider } from 'react-toast-notifications';

const App = () => {
	return (
		<ToastProvider>
			<Helmet
				encodeSpecialCharacters={true}
				titleTemplate='Receipe-share | %s'
				defaultTitle='Receipe-share'
			>
				<meta name='description' content='Share your receipes here' />
				<title itemProp='name' lang='en'>
					{`dynamic`} title
				</title>
			</Helmet>
			<Router>
				<Switch>
					<Route exact path='/' component={HomeScreen} />
					<PrivateRoute exact path='/add' admin={false} component={AddScreen} />
					<PrivateRoute
						exact
						path='/profile'
						admin={false}
						component={ProfileScreen}
					/>
					<PrivateRoute
						exact
						path='/admin'
						admin={true}
						component={AdminScreen}
					/>
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/game' component={PuzzleGame} />
					<Route path='/receipe/:id' admin={false} component={ReceipeScreen} />
				</Switch>
			</Router>
		</ToastProvider>
	);
};

export default App;
