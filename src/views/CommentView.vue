<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<div v-for="tweet in sortedTweets" :key="tweet.id">
				<FormAddComment
					:id="tweet.id"
					:userId="tweet.user_id"
					:username="tweet.username"
					:content="tweet.content"
					:likes="tweet.likes"
					:createdAt="tweet.created_at"
				/>
			</div>
			<div class="comment-form mt-6">
				<h2 class="text-xl font-bold mb-4">All Comments (1)</h2>
				<div v-for="tweet in sortedTweets" :key="tweet.id">
					<CommentTweet
						:id="tweet.id"
						:userId="tweet.user_id"
						:username="tweet.username"
						:content="tweet.content"
						:likes="tweet.likes"
						:createdAt="tweet.created_at"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FormAddComment from '@/components/FormAddComment.vue';
import CommentTweet from '@/components/CommentTweet.vue';

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
			newComment: '',
		};
	},
	mounted() {
		this.getCommentTweet();
	},
	methods: {
		async getCommentTweet() {
			if (this.currentId) {
				const response = await this.$store.dispatch(
					'getCommentTweet',
					this.currentId
				);
				this.tweetsData = response.data;
			}
		},
		postComment() {
			// Implement logic to post the new comment
			const commentData = {
				id: this.sortedTweets[0].id, // Example ID, replace with actual ID logic
				userId: this.sortedTweets[0].user_id,
				content: this.newComment,
				// Add other necessary data for the comment
			};
			this.$store.dispatch('postComment', commentData);
			this.newComment = ''; // Clear the comment input
		},
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		},
	},
	components: {
		FormAddComment,
		CommentTweet,
	},
};
</script>
