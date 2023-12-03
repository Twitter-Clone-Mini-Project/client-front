<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="w-full lg:w-[55%] px-5 py-5 bg-white h-full overflow-y-auto">
			<FormAddComment
				v-if="Object.keys(tweet).length !== 0"
				:id="tweet.id"
				:currentId="currentId"
				:userId="tweet.userId"
				:username="tweet.username"
				:content="tweet.content"
				:createdAt="tweet.createdAt"
			/>
			<div class="mt-6">
				<h2 class="text-xl font-bold mb-4">
					All Comments ({{ commentsData.length }})
				</h2>
				<CommentTweet
					v-for="comment in sortedComment"
					:key="comment.id"
					:id="comment.id"
					:currentId="currentId"
					:userId="comment.userId"
					:username="comment.username"
					:content="comment.content"
					:createdAt="comment.createdAt"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import FormAddComment from '@/components/FormAddComment.vue';
import CommentTweet from '@/components/CommentTweet.vue';

export default {
	components: {
		FormAddComment,
		CommentTweet,
	},
	data() {
		return {
			currentId: parseInt(localStorage.getItem('currentId')) || 0,
			tweet: {},
			commentsData: [],
		};
	},
	mounted() {
		this.getTweetDetail();
		this.getComment();
	},
	methods: {
		async getTweetDetail() {
			const tweetId = this.$route.params.id;
			const response = await this.$store.dispatch('getTweetDetail', tweetId);
			this.tweet = response.data.data;
		},
		async getComment() {
			const tweetId = this.$route.params.id;
			const response = await this.$store.dispatch('getComment', tweetId);
			this.commentsData = response.data.data;
		},
	},
	computed: {
		sortedComment() {
			return this.commentsData
				.slice()
				.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		},
	},
};
</script>
