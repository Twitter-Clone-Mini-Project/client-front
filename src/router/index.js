import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import MyTweetView from '../views/MyTweetView.vue';
import AllTweetView from '../views/AllTweetView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		meta: { requiresGuest: true },
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignupView,
		meta: { requiresGuest: true },
	},
	{
		path: '/mytweet',
		name: 'mytweet',
		component: MyTweetView,
		meta: { requiresAuth: true },
	},
	{
		path: '/alltweet',
		name: 'alltweet',
		component: AllTweetView,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = localStorage.getItem('token');

	if (to.matched.some((route) => route.meta.requiresAuth)) {
		if (!isAuthenticated) {
			next({ path: '/login' });
		} else {
			next();
		}
	} else if (to.matched.some((route) => route.meta.requiresGuest)) {
		if (isAuthenticated) {
			next({ path: '/mytweet' });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
