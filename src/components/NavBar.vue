<template>
	<nav class="fixed sticky top-0 z-40 bg-white shadow-lg">
		<div class="flex justify-between px-10 py-3 items-center">
			<div class="profile">
				<img
					src="@/assets/deffault.png"
					class="mx-auto rounded-full"
					alt="Vite logo"
					width="50"
				/>
			</div>
			<div class="logo">
				<img
					src="@/assets/twitter.svg"
					class="mx-auto"
					alt="Vite logo"
					width="50"
				/>
			</div>
			<div class="login">
				<router-link
					to="/login"
					class="bg-blue-500 px-6 py-3 text-white rounded hover:bg-blue-400"
					>Login</router-link
				>
			</div>
		</div>
		<hr />
		<div class="flex justify-center gap-20 py-2">
			<router-link
				to="/mytweet"
				:class="{
					'underline decoration-blue-600 underline-offset-4 decoration-4':
						$route.path === '/mytweet' || $route.path === '/',
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
