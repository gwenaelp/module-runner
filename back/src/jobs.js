let currentId = 0;
const jobsManager = {
  jobs: [],
  socketManager: undefined,

  addJobToList(name) {
  	currentId++;
  	this.jobs.push({ id: currentId, name, status: 'running' });
  	this.broadcastJobsList();
  	return currentId;
  },

  finishJob(id) {
  	for (var i = 0; i < this.jobs.length; i++) {
  		if(this.jobs[i].id === id) {
  			//this.jobs.splice(i, 1);
  			this.jobs[i].status = 'done';
  		}
  	}
  	this.broadcastJobsList();
  },

  broadcastJobsList() {
  	console.log('jobs', this.jobs);
    this.socketManager.io.emit('setJobsList', this.jobs);
  }
};

module.exports = jobsManager;