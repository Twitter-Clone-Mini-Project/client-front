<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<AllTweet
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:id="tweet.id"
				:currentId="currentId"
				:userId="tweet.userId"
				:username="tweet.username"
				:content="tweet.content"
				:createdAt="tweet.createdAt"
			/>
		</div>
	</div>
</template>

<script>
import AllTweet from '@/components/AllTweet.vue';

export default {
	components: {
		AllTweet,
	},
	data() {
		return {
			tweetsData: [],
			currentId: parseInt(localStorage.getItem('currentId')) || 0,
		};
	},
	mounted() {
		this.getTweet();
	},
	methods: {
		async getTweet() {
			const response = await this.$store.dispatch('getTweet');
			this.tweetsData = response.data.data;
		},
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		},
	},
};
</script>
