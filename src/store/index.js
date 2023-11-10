import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);

// const BASE_URL = 'http://localhost:8080';

export default new Vuex.Store({
	state: {
		isLoggedIn: false,
		users: [],
	},
	getters: {
		currentUser: (state) =>
			state.users.find((user) => user.id === state.currentUserId),
	},
	mutations: {
		setIsLoggedIn(state, status) {
			state.isLoggedIn = status;
		},
		addUser(state, user) {
			state.users.push(user); // Mutasi untuk menambahkan pengguna baru
		},
	},
	actions: {
		async getAllTweet() {
			// return await axios.get(`${BASE_URL}/tweets`).catch((error) => {
			// 	return error;
			// });
			return new Promise((resolve) => {
				const responseData = [
					{
						id: 1,
						content:
							'Jangan pernah membicarakan kejelekan yang dimiliki oleh orang lain. Karena sesungguhnya orang yang membicarakan itulah yang menjadi orang jelek.',
						likes: 0,
						user_id: 1,
						created_at: '2023-10-03T02:12:40.000Z',
						updated_at: '2023-10-03T02:12:40.000Z',
						username: 'tengkurizki',
					},
					{
						id: 2,
						content:
							'Beberapa orang masuk ke kehidupan kita dan meninggalkan jejak di hati. Sementara yang lain, masuk ke kehidupan kita dan membuat kita ingin meninggalkan jejak di muka mereka.',
						likes: 0,
						user_id: 2,
						created_at: '2023-11-08T02:12:40.000Z',
						updated_at: '2023-11-08T02:12:40.000Z',
						username: 'jamaluddin',
					},
					{
						id: 3,
						content:
							'Agar silahturahmi terjalin dengan lancar, apakah aku boleh minjam seratus?',
						likes: 8,
						user_id: 1,
						created_at: '2023-11-08T02:12:40.000Z',
						updated_at: '2023-11-08T02:12:40.000Z',
						username: 'tengkurizki',
					},
				];
				resolve(responseData);
			});
		},
	},
	modules: {},
});
