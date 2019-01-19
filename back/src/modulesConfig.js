const fs = require('fs');
const modulesManager = require('./modules');

const modulesConfig = {
	config: {},
	init() {
		try {
			this.config = JSON.parse(fs.readFileSync(`${process.env.MODULES_ROOT_PATH}/config.json`))
		} catch (e) {
			console.error(e);
		}
	},
	async setModuleConfig(moduleName, value) {
		const config = {...this.config};
		if(!value) {
			delete config[moduleName];
		}
		config[moduleName] = value;

    return new Promise((resolve, reject) => {
	    fs.writeFile(`${process.env.MODULES_ROOT_PATH}/config.json`, JSON.stringify(config), (err) => {
	    	if(err) {
	    		console.error('write config error', err);
	    		return;
	    	}
	    	console.log('config?', config);
	    	this.config = config;
	    	resolve();
	    });
	  });
	}
};

module.exports = modulesConfig;