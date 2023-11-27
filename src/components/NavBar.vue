<template>
	<nav class="fixed sticky top-0 z-40 bg-white shadow-lg">
		<div class="flex justify-between px-10 py-3 items-center">
			<div class="flex items-center gap-3">
				<img
					v-if="isLoggedIn"
					src="@/assets/devcode-logo.png"
					class="mx-auto rounded-full"
					alt="Vite logo"
					width="50"
					height="50"
				/>
				<img
					v-else
					src="@/assets/deffault.png"
					class="mx-auto rounded-full"
					alt="Vite logo"
					width="50"
					height="50"
				/>
			</div>
			<div>
				<img
					src="@/assets/twitter.svg"
					class="mx-auto"
					alt="Vite logo"
					width="50"
				/>
			</div>
			<div>
				<button
					v-if="isLoggedIn"
					@click="logout"
					class="bg-red-500 px-3 py-2 text-white rounded hover:bg-red-400"
				>
					Logout
				</button>
				<router-link
					v-else
					to="/login"
					class="bg-blue-500 px-5 py-3 text-white rounded hover:bg-blue-400"
					>Log in
				</router-link>
			</div>
		</div>
		<hr />
		<div class="flex justify-center gap-20 py-2">
			<router-link
				to="/mytweet"
				:class="{
					'underline decoration-blue-600 underline-offset-4 decoration-4':
						$route.path === '/mytweet',
				}"
				>MY TWEET</router-link
			>
			<router-link
				to="/alltweet"
				:class="{
					'underline decoration-blue-600 underline-offset-4 decoration-4':
						$route.path === '/alltweet',
				}"
				>ALL TWEET</router-link
			>
		</div>
	</nav>
</template>

<script>
export default {
	props: {
		isLoggedIn: Boolean,
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push('/login').then(() => {
				window.location.reload();
			});
		},
	},
};
</script>
