import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { receipeReducer } from './reducers/receipeReducer';
import { userReducer } from './reducers/userReducer';
const reducers = combineReducers({
	receipe: receipeReducer,
	user: userReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
