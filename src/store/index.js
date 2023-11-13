import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'https://gnqpdlmd-3030.asse.devtunnels.ms';

export default new Vuex.Store({
	state: {},
	mutations: {
		setCurrentId(state, id) {
			localStorage.setItem('currentId', id);
		},
		setCurrentUsername(state, username) {
			localStorage.setItem('currentUsername', username);
		},
		setIsLoggedIn(state, status) {
			localStorage.setItem('isLoggedIn', status);
		},
	},
	actions: {
		async getAllTweet() {
			return await axios.get(`${BASE_URL}/tweets`).catch((error) => {
				return error;
			});
		},
		async login({ commit }, data) {
			try {
				const response = await axios.post(`${BASE_URL}/sign`, data);
				commit('setIsLoggedIn', true);
				commit('setCurrentUsername', response.data.username);
				commit('setCurrentId', response.data.id);
				return response;
			} catch (error) {
				return error;
			}
		},
		// eslint-disable-next-line no-unused-vars
		async addMyTweet({ commit }, data) {
			try {
				const response = await axios.post(`${BASE_URL}/tweets/${data.id}`, {
					content: data.content,
				});
				return response;
			} catch (error) {
				return error;
			}
		},
		// eslint-disable-next-line no-unused-vars
		async getMyTweet({ commit }, id) {
			try {
				const response = await axios.get(`${BASE_URL}/tweets/${id}`);
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	modules: {},
});
