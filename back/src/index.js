const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 31414;
const { exec } = require('child_process');
require('dotenv').config();
const api = require('./api.json');
const socket = require('./socket').init(io);
const mkdirp = require('mkdirp');

mkdirp.sync(`${process.env.MODULES_ROOT_PATH}/env`);



require('./modulesConfig').init();
require('./modules').init();

app.use(bodyParser.json());
app.use(cors());

for (let i = 0; i < api.length; i += 1) {
  let routeCallback = require(`./routes/${api[i].file}`);
  app[api[i].method](api[i].url, routeCallback);
}


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
