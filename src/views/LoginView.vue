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
			<form action="">
				<label for="username" class="block text-base my-2">Username</label>
				<input
					type="text"
					id="username"
					class="border rounded border-gray-600 w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Enter username"
				/>
				<label for="password" class="block text-base my-2">Password</label>
				<input
					type="password"
					id="password"
					class="border rounded border-gray-600 w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Enter password"
				/>
				<button
					type="submit"
					class="bg-black text-white w-full rounded my-3 py-1"
				>
					Sign in
				</button>
			</form>
			<p class="read-the-docs">
				Don't have an account?
				<a href="#" class="text-blue-600 hover:underline">Sign up</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		login(event) {
			event.preventDefault(); // Mencegah pengiriman formulir

			const username = this.$refs.username.value;
			const password = this.$refs.password.value;

			const user = this.$store.state.users.find((u) => u.username === username);

			if (user) {
				if (user.password === password) {
					// Password sesuai
					this.$router.push('/home'); // Alihkan ke halaman utama
				} else {
					// Password tidak sesuai
					alert('Password is incorrect.');
				}
			} else {
				// Buat pengguna baru
				this.$store.commit('addUser', { username, password });
				this.$router.push('/home'); // Alihkan ke halaman utama
			}
		},
	},
};
</script>
