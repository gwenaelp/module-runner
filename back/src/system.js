const fs = require('fs');

const systemManager = {
	actions: {
		restart() {
			console.log('restart system');
			fs.writeFileSync('./.shutdownCount', Math.random().toString());
		},
	},
};

module.exports = systemManager;