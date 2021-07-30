import {
	LOGIN_USER_FAIL,
	LOGIN_USER_REQUEST,
	SET_LOADING,
	CLEAR_ERROR,
} from '../constants/types';

const initalState = {
	loading: false,
	userInfo: null,
	error: null,
	login: false,
	isAdmin: false,
};

export const userReducer = (state = initalState, { payload, type }) => {
	switch (type) {
		case LOGIN_USER_REQUEST:
			return {
				...state,
				userInfo: payload,
				login: true,
				isAdmin: payload.isAdmin,
			};
		case LOGIN_USER_FAIL:
			return {
				...state,
				error: payload,
				login: false,
			};
		case SET_LOADING:
			return {
				...state,
				loading: payload,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};
