import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import Theme from './Theme/Theme';
ReactDOM.render(
	<Provider store={store}>
		<Theme>
			<App />
		</Theme>
	</Provider>,
	document.getElementById('root')
);
