<template>
	<div id="app">
		<NavBar v-if="isNotHomeRoute" />
		<router-view />
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
			return !(
				this.$route.path === '/' ||
				this.$route.path === '/login' ||
				this.$route.path === '/signup'
			);
		},
	},
};
</script>
