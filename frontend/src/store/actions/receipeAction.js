import axios from 'axios';
import {
	GET_RECEIPES,
	CLEAR_SEARCH,
	SEARCH,
	RECEIPE_ERROR,
	SET_LOADING,
	GET_RECENT_RECEIPES,
	GET_POPULAR_RECEIPES,
} from '../constants/types';

export const getRecipes = () => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		dispatch(getRecentRecipes());
		dispatch(getPopularRecipes());
		const { data } = await axios.get('/api/receipe/');
		dispatch({ type: GET_RECEIPES, payload: data });
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	} finally {
		dispatch(setLoading(false));
	}
};
const getRecentRecipes = () => async (dispatch) => {
	const { data } = await axios.get('/api/receipe/recent');
	dispatch({ type: GET_RECENT_RECEIPES, payload: data });
};
const getPopularRecipes = () => async (dispatch) => {
	const { data } = await axios.get('/api/receipe/popular');
	dispatch({ type: GET_POPULAR_RECEIPES, payload: data });
};

export const likeReceipe = (id) => async (dispatch, getState) => {
	//like reciepe
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await fetch(`/api/receipe/like/${id}`, config);
		// await axios.put(`/api/receipe/like/${id}`, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const unlikeReceipe = (id) => async (dispatch, getState) => {
	//unlike reciepe
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await fetch(`/api/receipe/unlike/${id}`, config);
		// await axios.put(`/api/receipe/like/${id}`, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const commentReceipe = (id, text) => async (dispatch, getState) => {
	//comment on reciepe
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		// await fetch(`/api/receipe/comment/${id}`, config);
		await axios.put(`/api/receipe/comment/${id}`, { text }, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteCommentReceipe =
	(id, commentID) => async (dispatch, getState) => {
		//delete comment on reciepe
		dispatch(setLoading(true));
		try {
			const {
				user: {
					userInfo: { token },
				},
			} = getState();
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			// await fetch(`/api/receipe/comment/${id}`, config);
			await axios.delete(`/api/receipe/comment/${id}/${commentID}`, config);
		} catch (error) {
			dispatch({
				type: RECEIPE_ERROR,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		} finally {
			dispatch(setLoading(false));
		}
	};

export const addReceipe = (data) => async (dispatch, getState) => {
	//add a reciepe
	dispatch(setLoading(true));
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		// await fetch(`/api/receipe/comment/${id}`, config);
		await axios.post(`/api/receipe`, data, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	} finally {
		dispatch(setLoading(false));
	}
};

export const approveReceipe = (id, data) => async (dispatch, getState) => {
	//approve receipe
	dispatch(setLoading(true));
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		// await fetch(`/api/receipe/comment/${id}`, config);
		await axios.put(`/api/receipe/${id}`, data, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	} finally {
		dispatch(setLoading(false));
	}
};

export const deleteReceipe = (id) => async (dispatch, getState) => {
	//approve receipe
	dispatch(setLoading(true));
	try {
		const {
			user: {
				userInfo: { token },
			},
		} = getState();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		// await fetch(`/api/receipe/comment/${id}`, config);
		await axios.delete(`/api/receipe/${id}`, config);
	} catch (error) {
		dispatch({
			type: RECEIPE_ERROR,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	} finally {
		dispatch(setLoading(false));
	}
};

//serach receipe
export const searchText = (text) => async (dispatch) => {
	dispatch({
		type: CLEAR_SEARCH,
	});
	if (!text) return;
	dispatch({
		type: SEARCH,
		payload: text,
	});
};

const setLoading = (loading) => async (dispatch) => {
	dispatch({ type: SET_LOADING, payload: loading });
};
