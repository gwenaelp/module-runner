<template>
	<div>
		<div v-if="jobsList">
			<div v-for="j in jobsList" class="item" v-if="jobsList">
				<div class="flex">
					<div class="round semi-transparent-background">
						<i class="fas fa-check" v-if="j.status === 'done'"/>
						<i class="fas fa-cogs" v-if="j.status === 'running'"/>
					</div>
					<div class="list-text">
						<div class="title">
							{{j.name}}
						</div>
						<div class="subtitle">
							{{j.status}}
						</div>
					</div>
					<div class="actions">
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
      jobsList: state => state.jobsList,
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
	flex-grow: 1;
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