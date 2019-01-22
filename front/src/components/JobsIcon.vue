<template>
  <a href="#/jobs" class="jobs-icon-wrapper light-background">
    <i class="fas fa-cogs fa-2x" />
    <div class="counter-wrapper">
      <div class="counter light-background" v-if="jobsPending">
        {{jobsPending.length}}
      </div>
    </div>
  </a>
</template>
<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      jobsPending: state => state.jobsList.filter(job => job.status === 'running'),
    }),
  }
};
</script>
<style scoped>
.jobs-icon-wrapper {
  position: absolute;
  right: 0;
  top: 40px;
  width: 44px;
  padding: 10px;
  height: 34px;
  color: white;
  cursor: pointer;
}

.counter-wrapper {
  position: relative;
}

.counter {
  position: absolute;
  font-size: 80%;
  top: -15px;
  left: 24px;
  font-weight: bold;
  padding: 5px;
  border-radius: 100px;
}
</style>
