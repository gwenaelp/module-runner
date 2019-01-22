<template>
	<div>
		<h1>
			Jobs list
		</h1>
		<JobsList />
	</div>
</template>
<script>
import JobsList from '../JobsList';

export default {
	name: 'JobsListPage',
	components: {
		JobsList,
	},
};
</script>