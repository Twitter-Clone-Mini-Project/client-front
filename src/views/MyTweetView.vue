<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<FormTweet :userId="currentId" :username="currentUsername" />
			<MyTweet
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:id="tweet.id"
				:userId="tweet.userId"
				:username="tweet.username"
				:content="tweet.content"
				:createdAt="tweet.createdAt"
			/>
		</div>
	</div>
</template>

<script>
import FormTweet from '@/components/FormAddTweet.vue';
import MyTweet from '@/components/MyTweet.vue';

export default {
	components: {
		MyTweet,
		FormTweet,
	},
	data() {
		return {
			currentId: parseInt(localStorage.getItem('currentId')),
			currentUsername: localStorage.getItem('currentUsername'),
			tweetsData: [],
		};
	},
	mounted() {
		this.getTweet();
	},
	methods: {
		async getTweet() {
			if (this.currentId) {
				const response = await this.$store.dispatch('getTweet');
				this.tweetsData = response.data.data.filter(
					(tweet) => tweet.userId === this.currentId
				);
			}
		},
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		},
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
