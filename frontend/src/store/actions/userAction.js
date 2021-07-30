import axios from 'axios';
import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_FAIL,
	SET_LOADING,
	CLEAR_ERROR,
} from '../constants/types';
export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'/api/user/login',
			{ email, password },
			config
		);

		dispatch({ type: LOGIN_USER_REQUEST, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: LOGIN_USER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
		alert(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		);
	} finally {
		dispatch(setLoading(false));
	}
};
export const register = (name, email, password) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'/api/user',
			{ name, email, password },
			config
		);

		dispatch({ type: LOGIN_USER_REQUEST, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: LOGIN_USER_FAIL,
			payload: 'Cant Register',
		});
		alert(
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		);
	} finally {
		dispatch(setLoading(false));
	}
};

export const getUserData = () => async (dispatch) => {
	const userInfoFromStorage = localStorage.getItem('userInfo')
		? JSON.parse(localStorage.getItem('userInfo'))
		: {};
	if (userInfoFromStorage) {
		dispatch({ type: LOGIN_USER_REQUEST, payload: userInfoFromStorage });
	}
};

const setLoading = (load) => async (dispatch) => {
	dispatch({ type: SET_LOADING, payload: load });
};
export const clearError = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERROR, payload: null });
};
