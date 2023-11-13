<template>
	<div class="rounded px-5 py-3 my-2 border border-inherit">
		<div v-if="isLoggedIn">
			<div class="flex gap-5">
				<img
					src="@/assets/devcode-logo.png"
					alt="profile"
					class="rounded-full w-14 h-14"
				/>
				<div class="w-full">
					<div class="flex justify-between w-full">
						<p>
							<span class="font-black">{{ username }}</span>
							<span class="text-gray-400"
								>@{{ username.replace(/\s/g, '') }}{{ id }}</span
							>
						</p>
					</div>
					<textarea
						v-model="tweet"
						class="w-full mt-2 p-2 border border-gray-300 rounded-md resize-none block"
						placeholder="What's happening?"
						rows="3"
						cols="100"
					></textarea>
					<div class="flex justify-between items-center mt-2">
						<button
							:disabled="tweet.length > 280 || tweet.trim() === ''"
							:class="{
								'bg-blue-500': tweet.trim() !== '',
								'bg-gray-300 cursor-not-allowed':
									tweet.trim() === '' || tweet.length > 280,
							}"
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
						>
							Tweet
						</button>
						<span
							:class="{ 'text-red-500': tweet.length > 280 }"
							class="text-gray-500"
						>
							{{ remainingCharacters }} characters remaining
						</span>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h1 class="text-2xl">Anda belum login.</h1>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		isLoggedIn: Boolean,
		id: Number,
		username: String,
	},
	data() {
		return {
			tweet: '',
		};
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
