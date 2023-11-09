<template>
	<div class="flex justify-center bg-white h-screen px-5">
		<div class="content px-5 py-5 bg-white h-full overflow-y-auto">
			<MyTweet />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import MyTweet from '@/components/MyTweet.vue';

export default {
	components: {
		MyTweet,
	},
};
</script>
