<template>
	<div class="flex justify-center bg-blue-600 h-screen pt-10">
		<div class="w-96 p-6 shadow-lg bg-white rounded h-fit">
			<img
				src="../assets/twitter.svg"
				class="mx-auto"
				alt="Vite logo"
				width="50"
			/>
			<hr class="mt-3" />
			<h1 class="text-4xl font-semibold">Sign in to Twitter</h1>
			<div v-if="loginFailed" class="bg-red-500 text-white p-2 rounded my-3">
				{{ loginErrorMessage }}
			</div>
			<form @submit="login">
				<label for="username" class="block text-base my-2">Username</label>
				<input
					type="text"
					id="username"
					class="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Enter username"
					v-model="username"
				/>
				<label for="password" class="block text-base my-2">Password</label>
				<input
					type="password"
					id="password"
					class="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Enter password"
					v-model="password"
				/>
				<button
					type="submit"
					class="bg-black text-white w-full rounded my-3 py-2 disabled:opacity-50"
					:disabled="username.length <= 3 || password.length <= 3"
				>
					Sign in
				</button>
			</form>
			<p class="read-the-docs">
				Don't have an account?
				<a href="#" class="text-blue-600 hover:underline">Just sign in</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			loginFailed: false,
			loginErrorMessage: '',
		};
	},
	methods: {
		async login(event) {
			event.preventDefault();
			const credentials = {
				username: this.username,
				password: this.password,
			};
			const request = await this.$store.dispatch('login', credentials);

			if (request.status === 200) {
				this.$router.push('/mytweet');
			} else if (request.response.status === 400) {
				this.loginFailed = true;
				this.loginErrorMessage = request.response.data.message;
			}
		},
	},
};
</script>
