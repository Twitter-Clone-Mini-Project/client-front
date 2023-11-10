import Vue from 'vue';
import VueRouter from 'vue-router';
import MyTweetView from '../views/MyTweetView.vue';
import AllTweetView from '../views/AllTweetView.vue';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import store from '../store';
// TODO: Uncomment baris kode dibawah ini untuk meng-import Halaman Hello ke dalam router

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},

	// TODO: Uncomment baris kode dibawah ini untuk menambahkan routing baru ke Halaman Hello
	{
		path: '/mytweet',
		name: 'mytweet',
		component: MyTweetView,
	},
	{
		path: '/alltweet',
		name: 'alltweet',
		component: AllTweetView,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		beforeEnter: (to, from, next) => {
			if (store.state.isLoggedIn) {
				next('/');
			} else {
				next();
			}
		},
	},
	// {
	// 	path: '/signup',
	// 	name: 'signup',
	// 	component: SignupView,
	// },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
