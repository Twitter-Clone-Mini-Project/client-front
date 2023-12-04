<template>
	<div class="rounded p-5 my-2 border border-inherit">
		<div class="flex gap-5 pb-5">
			<img
				src="@/assets/devcode-logo.png"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between w-full">
					<p>
						<span class="font-black">{{ username }}</span>
						<span class="text-gray-400"
							>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
						>
					</p>
					<div class="flex gap-3 justify-between">
						<button
							:disabled="tweet.trim() === '' || loading"
							v-if="editMode"
							@click="updateTweet"
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-75"
						>
							{{ loading ? 'Loading...' : 'Save' }}
						</button>
						<button
							@click="toggleEditMode"
							:class="{
								'text-white px-4 py-2 rounded hover:opacity-75': true,
								'bg-green-500': !editMode,
								'bg-red-500': editMode,
							}"
						>
							{{ editMode ? 'Cancel' : 'Edit' }}
						</button>
						<button
							v-if="!editMode"
							@click="deleteTweet"
							class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
						>
							Delete
						</button>
					</div>
				</div>
				<p v-if="!editMode">{{ content }}</p>
				<form v-if="editMode" @submit="updateTweet">
					<textarea
						v-model="tweet"
						class="w-full mt-2 p-2 border border-gray-300 rounded-md resize-none block"
						placeholder="What's happening?"
						rows="3"
						cols="100"
					></textarea>
					<div class="flex justify-end items-center mt-2">
						<span
							:class="{ 'text-red-500': tweet.length > 280 }"
							class="text-gray-500"
						>
							{{ remainingCharacters }} characters remaining
						</span>
					</div>
				</form>
			</div>
		</div>
		<div class="flex justify-between">
			<p class="text-gray-500">{{ formatCreatedAt(createdAt) }}</p>
			<div class="action flex justify-end gap-5">
				<a href="#" class="hover:text-gray-500">
					<font-awesome-icon icon="far fa-comment" /> Comment (0)
				</a>
				<a href="#" class="hover:text-gray-500"
					><font-awesome-icon icon="far fa-heart" /> Love (0)
				</a>
			</div>
		</div>
	</div>
</template>

<script>
// NOTE: date-fns ini untuk menggunakan fungsi format tanggal agar seperti (10 November 2023)
import { format } from 'date-fns';

export default {
	props: {
		id: Number,
		userId: Number,
		username: String,
		content: String,
		createdAt: String,
	},
	data() {
		return {
			editMode: false,
			tweet: '',
			loading: false,
		};
	},
	methods: {
		// TODO: Buat codingan mengenai fungsi waktu time ago post
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

		// TODO: Buat fungsi format dari createdAt menjadi (dd MMMM yyyy)
		formatCreatedAt(dateTime) {
			return format(new Date(dateTime), 'dd MMMM yyyy');
		},

		async deleteTweet() {
			const confirmation = confirm(
				'Are you sure you want to delete this tweet?'
			);
			if (confirmation) {
				await this.$store.dispatch('deleteTweet', this.id);
				this.$parent.getTweet();
			}
		},

		toggleEditMode() {
			this.editMode = !this.editMode;
			if (this.editMode) {
				this.tweet = this.content;
			}
		},

		async updateTweet(event) {
			event.preventDefault();
			this.loading = true; // Set loading state
			try {
				const payload = {
					id: this.id,
					content: this.tweet,
				};
				await this.$store.dispatch('updateTweet', payload);
			} finally {
				this.loading = false;
				this.toggleEditMode();
				this.$parent.getTweet();
			}
		},
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
