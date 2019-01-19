const modulesManager = require('./modules');

const socketManager = {
  openedSockets: {},
  io: undefined,
  init(io) {
    socketManager.io = io;

    io.on('connection', (socket) => {
      this.openedSockets[socket.id] = socket;
      modulesManager.broadcastModuleList();

      socket.on('action', (msg) => {
        console.log('I received an action request saying ', msg);
        if(msg.action) {
          if(modulesManager.actions[msg.action]) {
            modulesManager.actions[msg.action](msg);
          } else {
            console.error('no actions found : ', msg.action);
          }
        }
      });

      socket.on('disconnect', function () {
        io.emit('user disconnected');
      });
    });
  },
};

modulesManager.socketManager = socketManager;

module.exports = socketManager;