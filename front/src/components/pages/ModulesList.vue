<template>
	<div>
		<h1>
			Modules list
		</h1>
		<ModulesList />
	</div>
</template>
<script>
import ModulesList from '../ModulesList';

export default {
	name: 'ModulesListPage',
	components: {
		ModulesList,
	},
};
</script>