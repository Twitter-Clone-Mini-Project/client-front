<template>
	<div class="rounded p-5 my-2 border border-inherit w-full">
		<div class="flex gap-5 pb-5">
			<img
				src="@/assets/devcode-logo.png"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between items-center">
					<div>
						<p class="font-black">{{ username }}</p>
						<p class="text-gray-400">
							@{{ username.replace(/\s/g, '') }}{{ userId }}
						</p>
					</div>
					<span class="text-gray-500">{{ formatTimeAgo(createdAt) }}</span>
				</div>
				<p>{{ content }}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<p class="text-gray-500">{{ formatCreatedAt(createdAt) }}</p>
			<div class="action flex justify-end gap-5">
				<a href="#" class="hover:text-gray-500">
					<font-awesome-icon icon="far fa-heart" /> Love ({{ likes }})
				</a>
			</div>
		</div>
		<form @submit.prevent="postComment">
			<textarea
				v-model="newComment"
				class="w-full p-2 border border-gray-300 rounded-md resize-none block mb-2 mt-4"
				placeholder="Write your comment..."
				rows="2"
			></textarea>
			<div class="flex justify-between items-center">
				<button
					:disabled="
						newComment.length > 280 || newComment.trim() === '' || loading
					"
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-75"
				>
					{{ loading ? 'Loading...' : 'Reply' }}
				</button>
				<span
					:class="{ 'text-red-500': newComment.length > 280 }"
					class="text-gray-500"
				>
					{{ remainingCharacters }} characters remaining
				</span>
			</div>
		</form>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	props: {
		currentId: Number,
		userId: Number,
		username: String,
		content: String,
		likes: Number,
		createdAt: String,
	},
	data() {
		return {
			newComment: '',
			loading: false,
		};
	},
	mounted() {
		this.getCommentTweet();
	},
	methods: {
		formatTimeAgo(dateTime) {
			const createdDate = new Date(dateTime);
			const currentDate = new Date();
			const timeDifference = currentDate - createdDate;
			const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

			if (hoursAgo === 0) {
				return 'Just now';
			} else if (hoursAgo === 1) {
				return '1h ago';
			} else if (hoursAgo < 24) {
				return hoursAgo + 'h ago';
			} else {
				const daysAgo = Math.floor(hoursAgo / 24);
				return daysAgo + 'd ago';
			}
		},

		formatCreatedAt(dateTime) {
			return format(new Date(dateTime), 'dd MMMM yyyy');
		},

		async getCommentTweet() {
			if (this.currentId) {
				this.loading = true;
				try {
					const response = await this.$store.dispatch(
						'getCommentTweet',
						this.currentId
					);
					this.tweetsData = response.data;
				} finally {
					this.loading = false;
				}
			}
		},

		async postComment() {
			if (
				this.newComment.trim() === '' ||
				this.newComment.length > 280 ||
				this.loading
			) {
				return;
			}

			const commentData = {
				id: this.sortedTweets[0].id,
				userId: this.sortedTweets[0].user_id,
				content: this.newComment,
			};

			this.loading = true;
			try {
				await this.$store.dispatch('postComment', commentData);
				this.newComment = '';
			} finally {
				this.loading = false;
			}
		},
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.newComment.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
