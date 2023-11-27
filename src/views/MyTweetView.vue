<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div
			v-if="isLoggedIn"
			class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto"
		>
			<FormTweet :id="currentId" :username="currentUsername" />
			<MyTweet
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:id="tweet.id"
				:userId="tweet.user_id"
				:username="tweet.username"
				:content="tweet.content"
				:likes="tweet.likes"
				:createdAt="tweet.created_at"
			/>
		</div>
		<div v-else class="rounded px-5 py-3 my-5 border border-inherit h-fit">
			<h1 class="text-2xl">Anda belum login.</h1>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import FormTweet from '@/components/FormAddTweet.vue';
import MyTweet from '@/components/MyTweet.vue';

export default {
	props: {
		isLoggedIn: Boolean,
		currentId: Number,
		currentUsername: String,
	},
	data() {
		return {
			tweetsData: [
				{
					id: 1,
					user_id: 4817982784,
					username: 'jamjam',
					content: 'Hallo lu semuaaa!!!!',
					likes: 10,
					created_at: '2021-10-20',
				},
			],
		};
	},
	mounted() {
		this.getMyTweet();
	},
	methods: {
		async getMyTweet() {
			if (this.currentId) {
				const response = await this.$store.dispatch(
					'getMyTweet',
					this.currentId
				);
				this.tweetsData = response.data;
			}
		},
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		},
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
	components: {
		MyTweet,
		FormTweet,
	},
};
</script>
