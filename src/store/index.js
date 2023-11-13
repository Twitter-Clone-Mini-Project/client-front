import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'https://gnqpdlmd-3030.asse.devtunnels.ms';

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		currentId: '',
		currentUsername: '',
	},
	mutations: {
		setCurrentId(state, id) {
			state.currentId = id;
		},
		setCurrentUsername(state, username) {
			state.currentUsername = username;
		},
		setIsLoggedIn(state, status) {
			state.isLoggedIn = status;
		},
	},
	actions: {
		async getAllTweet() {
			return await axios.get(`${BASE_URL}/tweets`).catch((error) => {
				return error;
			});
		},
		async login({ commit }, credentials) {
			try {
				const response = await axios.post(`${BASE_URL}/sign`, credentials);
				commit('setCurrentUsername', response.data.username);
				commit('setCurrentId', response.data.id);
				commit('setIsLoggedIn', true);
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	modules: {},
});
