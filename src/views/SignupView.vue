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
			<h1 class="text-4xl font-semibold">Join Twitter today</h1>
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
				<label for="confirmPassword" class="block text-base my-2"
					>Confirm Password</label
				>
				<input
					type="password"
					id="confirmPassword"
					class="border rounded border-gray-600 w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-blue-600"
					placeholder="Enter confirm password"
				/>
				<button
					type="submit"
					class="bg-black text-white w-full rounded my-3 py-1"
				>
					Sign up
				</button>
			</form>
			<p class="read-the-docs">
				Have an account already?
				<router-link to="/login" class="text-blue-600 hover:underline"
					>Log in</router-link
				>
			</p>
		</div>
	</div>
</template>
