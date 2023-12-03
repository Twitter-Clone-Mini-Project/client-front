<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<div class="mb-4">
				<input
					v-model="searchQuery"
					type="text"
					class="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
					placeholder="Search tweets..."
				/>
			</div>
			<AllTweet
				v-for="tweet in filteredTweets"
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
			searchQuery: '',
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
		filteredTweets() {
			const query = this.searchQuery.toLowerCase();
			return this.tweetsData.filter((tweet) =>
				tweet.content.toLowerCase().includes(query)
			);
		},
		sortedTweets() {
			return this.filteredTweets
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		},
	},
};
</script>
