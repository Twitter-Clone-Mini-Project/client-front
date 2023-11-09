import Vue from 'vue';
import VueRouter from 'vue-router';
import MyTweetView from '../views/MyTweetView.vue';
import AllTweetView from '../views/AllTweetView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';

// TODO: Uncomment baris kode dibawah ini untuk meng-import Halaman Hello ke dalam router

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: MyTweetView,
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
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignupView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
