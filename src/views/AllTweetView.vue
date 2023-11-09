<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="content px-5 py-5 bg-white h-full overflow-y-auto">
			<AllTweet
				v-for="tweet in tweetsData"
				:key="tweet.id"
				:id="tweet.user_id"
				:username="tweet.username"
				:content="tweet.content"
				:likes="tweet.likes"
				:created_at="tweet.created_at"
			/>
		</div>
	</div>
</template>

<script>
import AllTweet from '@/components/AllTweet.vue';

export default {
	name: 'AllTweetView',
	components: {
		AllTweet,
	},
	data() {
		return {
			tweetsData: [],
		};
	},
	async mounted() {
		await this.getAllTweet();
	},
	methods: {
		async getAllTweet() {
			const response = await this.$store.dispatch('getAllTweet');
			this.tweetsData = response;
		},
	},
};
</script>

<style>
.content {
	max-width: 920px;
}
</style>
