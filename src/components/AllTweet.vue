<template>
	<div class="rounded p-5 my-2 border border-inherit">
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
				<div class="flex justify-between w-full">
					<p>
						<span class="font-black">{{ username }}</span>
						<span class="text-gray-400"
							>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
						>
					</p>
					<span class="text-gray-500">{{ formatTimeAgo(createdAt) }}</span>
				</div>
				<p>{{ content }}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<p class="text-gray-500">{{ formatCreatedAt(createdAt) }}</p>
			<div class="action flex justify-end gap-5">
				<a href="#" class="hover:text-gray-500">
					<font-awesome-icon icon="far fa-comment" /> Comment (0)</a
				>
				<a href="#" class="hover:text-gray-500"
					><font-awesome-icon icon="far fa-heart" /> Love ({{ likes }})
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
		currentId: Number,
		userId: Number,
		username: String,
		content: String,
		likes: Number,
		createdAt: String,
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
	},
};
</script>
