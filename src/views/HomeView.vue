<template>
	<div class="h-screen flex flex-col items-center justify-center bg-gray-100">
		<div class="flex items-center mb-8">
			<img
				src="@/assets/twitter.svg"
				alt="Twitter logo"
				class="mr-4"
				width="100"
			/>
			<img
				src="@/assets/devcode-logo.png"
				alt="DevCode logo"
				width="100"
				height="100"
			/>
		</div>
		<h1 class="text-4xl font-bold mb-4">Selamat datang di sesi Marathon</h1>
		<p class="text-gray-600 mb-8">Mulai challengenya sekarang!</p>
		<router-link
			to="/mytweet"
			class="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-400 transition duration-300"
		>
			Mulai Challenge
		</router-link>
	</div>
</template>
