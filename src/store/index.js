import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'https://d0hfdcdg-3030.asse.devtunnels.ms';

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
		async signup(context, payload) {
			try {
				const response = await axios.post(`${BASE_URL}/users`, payload);
				return response;
			} catch (error) {
				return error;
			}
		},
		async login(context, payload) {
			try {
				const response = await axios.post(
					`${BASE_URL}/authentication`,
					payload
				);

				localStorage.setItem('token', response.data.data.accessToken);
				localStorage.setItem('currentId', response.data.data.user.id);
				localStorage.setItem(
					'currentUsername',
					response.data.data.user.username
				);

				return response;
			} catch (error) {
				return error;
			}
		},
		async addTweet(context, payload) {
			try {
				const response = await axios.post(`${BASE_URL}/tweets`, payload, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				});
				return response;
			} catch (error) {
				return error;
			}
		},
		async getTweet() {
			try {
				const response = await axios.get(`${BASE_URL}/tweets`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				return response;
			} catch (error) {
				return error;
			}
		},
		async deleteTweet(context, id) {
			try {
				const response = await axios.delete(`${BASE_URL}/tweets/${id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				});
				return response;
			} catch (error) {
				console.error('Delete Tweet Error:', error.response || error);
				return error;
			}
		},
		async updateTweet(context, payload) {
			try {
				const response = await axios.patch(
					`${BASE_URL}/tweets/${payload.id}`,
					payload,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
							'Content-Type': 'application/json',
						},
					}
				);
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	modules: {},
});
