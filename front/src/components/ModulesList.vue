<template>
	<div>
		<div v-if="moduleList">
			<div v-for="m in moduleList" class="item" v-if="moduleList">
				<div class="flex">
					<div class="round semi-transparent-background">
						<i class="fas fa-cogs" />
					</div>
					<div class="list-text">
						<div class="title">
							{{m.manifest.name}}
						</div>
						<div class="subtitle">
							{{m.status}}
						</div>
					</div>
					<div class="actions">
						<div class="round light-background" v-if="m.status !== 'running'" @click="$socket.emit('action', { action: 'startModule', name: m.manifest.name })">
							<i class="fas fa-play" />
						</div>
						<div class="round light-background" v-if="m.status === 'running'" @click="$socket.emit('action', { action: 'stopModule', name:m.manifest.name })">
							<i class="fas fa-stop" />
						</div>
						<a class="round light-background" :href="`#/module-info/${m.manifest.name}`">
							<i class="fas fa-info" />
						</a>
						<div class="round light-background" @click="$socket.emit('action', { action: 'removeModule', name:m.manifest.name })">
							<i class="fas fa-trash" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      moduleList: state => state.moduleList,
    }),
  },
};
</script>
<style scoped>
.item {
	padding: 10px;
}
.item:hover {
	background: rgba(0.5, 0.5, 0.5, 0.1);
}

.flex {
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.round {
	width: 48px;
	height: 37px;
	border-radius: 48px;
	padding-top: 11px;
	color: white;
	font-size: 160%;
	margin-left: 20px;
	text-align: center;
	cursor: pointer;
}

.list-text {
	padding-left: 20px;
	padding-top: 6px;
}

.title {
	font-size: 120%;
	font-weight: bold;
}

.subtitle {
	color: #999;
}

.actions {
	float: right;
	display: flex;
}
</style>