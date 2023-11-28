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
			searchQuery: '',
		};
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
