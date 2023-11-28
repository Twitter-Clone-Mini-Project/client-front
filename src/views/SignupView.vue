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
			<h1 class="text-4xl font-semibold">Create your account</h1>
			<div v-if="loginFailed" class="bg-red-500 text-white p-2 rounded my-3">
				{{ loginErrorMessage }}
			</div>
			<form @submit="signup">
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
				<label for="confirmPassword" class="block text-base my-2"
					>Confirm Password</label
				>
				<input
					type="password"
					id="confirmPassword"
					class="border rounded w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Confirm password"
					v-model="confirmPassword"
				/>
				<p v-if="password !== confirmPassword" class="text-red-500 my-1">
					Passwords do not match.
				</p>
				<button
					type="submit"
					class="bg-black text-white w-full rounded my-3 py-2 disabled:opacity-50"
					:disabled="
						username.length <= 3 ||
						password.length <= 3 ||
						password !== confirmPassword ||
						loading
					"
				>
					{{ loading ? 'Loading...' : 'Sign up' }}
				</button>
			</form>
			<p class="read-the-docs">
				Already have an account?
				<router-link to="/login" class="text-blue-600 hover:underline"
					>Log in</router-link
				>
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
			confirmPassword: '',
			loginFailed: false,
			loginErrorMessage: '',
			loading: false,
		};
	},
	methods: {
		async signup(event) {
			event.preventDefault();

			this.loading = true;
			const data = {
				username: this.username,
				password: this.password,
				confirmPassword: this.confirmPassword,
			};
			try {
				const request = await this.$store.dispatch('signup', data);
				if (request.status === 201) {
					this.$router.push('/login');
				} else if (
					request.response.status === 401 ||
					request.response.status === 400
				) {
					this.loginFailed = true;
					this.loginErrorMessage = request.response.data.message;
				}
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
