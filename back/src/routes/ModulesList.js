const modulesManager = require('../modules');

module.exports = (req, res) => {
	res.send(modulesManager.modules);
};