<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<AllTweet
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:currentId="currentId"
				:userId="tweet.user_id"
				:username="tweet.username"
				:content="tweet.content"
				:likes="tweet.likes"
				:createdAt="tweet.created_at"
			/>
		</div>
	</div>
</template>

<script>
import AllTweet from '@/components/AllTweet.vue';

export default {
	props: {
		currentId: Number,
	},
	components: {
		AllTweet,
	},
	data() {
		return {
			tweetsData: [],
		};
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		},
	},
	beforeMount() {
		this.getAllTweet();
	},
	methods: {
		async getAllTweet() {
			const response = await this.$store.dispatch('getAllTweet');
			this.tweetsData = response.data;
		},
	},
};
</script>
