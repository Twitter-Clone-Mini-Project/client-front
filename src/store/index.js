import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'https://gnqpdlmd-3030.asse.devtunnels.ms';

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {
		setJwt(state, jwt) {
			localStorage.setItem('jwt', jwt);
		},
	},
	actions: {
		// eslint-disable-next-line no-unused-vars
		async signup({ commit }, data) {
			try {
				const response = await axios.post(`${BASE_URL}/users`, data);
				return response;
			} catch (error) {
				return error;
			}
		},
		// eslint-disable-next-line no-unused-vars
		async login({ commit }, data) {
			try {
				const response = await axios.post(`${BASE_URL}/authentication`, data);
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	modules: {},
});
