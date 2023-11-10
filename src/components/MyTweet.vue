<template>
	<div class="rounded p-5 my-2 border border-inherit text-center">
		<div v-if="isLoggedIn">
			<h1 class="text-2xl">Anda belum membuat tweet.</h1>
			<p>Nantikan di level 3 untuk membuat tweet</p>
		</div>
		<div v-else>
			<h1 class="text-2xl">Anda belum login.</h1>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		isLoggedIn: Boolean,
	},
};
</script>
