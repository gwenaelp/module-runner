<template>
	<div>
		<h1>
			Install Module
		</h1>
		<input type="text" name="moduleAlias" v-model="moduleAlias" />
		<div>
			<a class="button" @click="installModule">
				Install
			</a>
		</div>
	</div>
</template>
<script>
export default {
	name: 'InstallModulePage',

	components: {},

	data() {
		return {
			moduleAlias: '',
		};
	},

	methods: {
		installModule() {
			if(this.moduleAlias && this.moduleAlias.length) {
				this.$socket.emit('action', { action: 'installModule', name: this.moduleAlias });
				this.moduleAlias = '';
			}
		}
	}
};
</script>
<style scoped>
a {
	cursor: pointer;
}
</style>