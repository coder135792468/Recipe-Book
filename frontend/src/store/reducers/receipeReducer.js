import {
	GET_RECEIPES,
	SEARCH,
	CLEAR_SEARCH,
	RECEIPE_ERROR,
	SET_LOADING,
	GET_RECENT_RECEIPES,
	GET_POPULAR_RECEIPES,
	DELETE_RECEIPE,
} from '../constants/types';

const initalState = {
	receipes: [],
	filter: [],
	error: null,
	loading: false,
	recentReceipes: [],
	popularReceipes: [],
};

export const receipeReducer = (state = initalState, { payload, type }) => {
	switch (type) {
		case GET_RECEIPES:
			return {
				...state,
				receipes: payload,
			};
		case GET_RECENT_RECEIPES:
			return {
				...state,
				recentReceipes: payload,
			};
		case GET_POPULAR_RECEIPES:
			return {
				...state,
				popularReceipes: payload,
			};
		case SEARCH:
			return {
				...state,
				filter: state.receipes.filter((receipe) =>
					receipe.title.match(new RegExp(`${payload}`, 'gi'))
				),
			};
		case DELETE_RECEIPE:
			return {
				...state,
				receipes: state.receipes.filter((receipe) => receipe._id !== payload),
				popularReceipes: state.popularReceipes.filter(
					(receipe) => receipe._id !== payload
				),
				recentReceipes: state.recentReceipes.filter(
					(receipe) => receipe._id !== payload
				),
			};
		case CLEAR_SEARCH:
			return {
				...state,
				filter: null,
			};
		case RECEIPE_ERROR:
			return {
				...state,
				error: payload,
			};
		case SET_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return state;
	}
};
