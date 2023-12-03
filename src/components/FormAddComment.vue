<template>
	<div class="rounded p-5 my-2 border border-inherit w-full">
		<div class="flex gap-5 pb-5">
			<img
				v-if="currentId !== userId"
				:src="`https://source.unsplash.com/random/200x200?sig=${userId}`"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<img
				v-else
				src="@/assets/devcode-logo.png"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between items-center">
					<div>
						<p>
							<span class="font-black">{{ username }}</span>
							<span class="text-gray-400"
								>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
							>
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
				<button
					v-if="isLiked"
					type="button"
					@click="deleteLike"
					class="hover:text-gray-500"
				>
					<font-awesome-icon icon="fa-solid fa-heart" /> Love ({{
						likes.length
					}})
				</button>
				<button
					v-else
					type="button"
					@click="addLike"
					class="hover:text-gray-500"
				>
					<font-awesome-icon icon="far fa-heart" /> Love ({{ likes.length }})
				</button>
			</div>
		</div>
		<form @submit.prevent="addComment">
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
		id: Number,
		currentId: Number,
		userId: Number,
		username: String,
		content: String,
		createdAt: String,
	},
	data() {
		return {
			newComment: '',
			loading: false,
			likes: [],
			isLiked: false,
			currentLikeId: null,
		};
	},
	mounted() {
		this.getLike();
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

		async addComment() {
			const payload = {
				content: this.newComment,
			};

			this.loading = true;
			try {
				await this.$store.dispatch('addComment', { payload, id: this.id });
				this.newComment = '';
			} finally {
				this.loading = false;
				this.mewComment = '';
				this.$parent.getComment();
			}
		},
		async getLike() {
			const response = await this.$store.dispatch('getLike', this.id);
			this.likes = response.data.data;
			const foundLike = this.likes.find(
				(like) => like.userId === this.currentId && like.tweetId === this.id
			);

			if (foundLike) {
				this.isLiked = true;
				this.currentLikeId = foundLike.id;
			} else {
				this.isLiked = false;
				this.currentLikeId = null;
			}
		},
		async getComment() {
			const response = await this.$store.dispatch('getComment', this.id);
			this.comments = response.data.data;
		},
		async addLike() {
			await this.$store.dispatch('addLike', this.id);
			this.getLike();
		},
		async deleteLike() {
			const payload = {
				tweetId: this.id,
				likeId: this.currentLikeId,
			};
			await this.$store.dispatch('deleteLike', payload);
			this.getLike();
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
