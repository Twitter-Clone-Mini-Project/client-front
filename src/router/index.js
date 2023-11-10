import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MyTweetView from '../views/MyTweetView.vue';
import AllTweetView from '../views/AllTweetView.vue';

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
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
