<template>
	<div id="app">
		<!-- aku mau NavBar ini munculnya ketika bukan url : / -->
		<NavBar
			v-if="isNotHomeRoute"
			:isLoggedIn="isLoggedIn"
			:currentUsername="currentUsername"
		/>
		<router-view
			:isLoggedIn="isLoggedIn"
			:currentId="currentId"
			:currentUsername="currentUsername"
		/>
	</div>
</template>
<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';

export default {
	components: {
		NavBar,
	},
	computed: {
		isNotHomeRoute() {
			return this.$route.path !== '/';
		},
		isLoggedIn() {
			return localStorage.getItem('isLoggedIn') === 'true' || false;
		},
		currentId() {
			return parseInt(localStorage.getItem('currentId')) || 0;
		},
		currentUsername() {
			return localStorage.getItem('currentUsername') || '';
		},
	},
};
</script>
