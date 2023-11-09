import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'https://gnqpdlmd-3030.asse.devtunnels.ms';

export default new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {
		async getAllTweet() {
			return await axios.get(`${BASE_URL}/tweets`).catch((error) => {
				return error;
			});
		},
	},
	modules: {},
});
