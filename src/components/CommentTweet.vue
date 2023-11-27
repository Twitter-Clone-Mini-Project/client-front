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
			<div class="action flex justify-end">
				<a href="#" class="hover:text-gray-500">
					<font-awesome-icon icon="far fa-heart" /> Love ({{ likes }})
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
		likes: Number,
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

		async deleteMyTweet() {
			const confirmation = confirm(
				'Are you sure you want to delete this tweet?'
			);
			if (confirmation) {
				const data = {
					id: this.id,
					userId: this.userId,
				};
				await this.$store.dispatch('deleteMyTweet', data);
				this.$parent.getMyTweet();
			}
		},

		toggleEditMode() {
			this.editMode = !this.editMode;
			if (this.editMode) {
				this.tweet = this.content;
			}
		},

		async updateMyTweet(event) {
			event.preventDefault();
			this.loading = true; // Set loading state
			const data = {
				id: this.id,
				userId: this.userId,
				content: this.tweet,
			};
			try {
				await this.$store.dispatch('updateMyTweet', data);
			} finally {
				this.loading = false;
				this.toggleEditMode();
				this.$parent.getMyTweet();
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
