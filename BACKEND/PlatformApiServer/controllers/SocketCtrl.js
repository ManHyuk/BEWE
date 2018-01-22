'use strict';

var socketIO = require('socket.io');
var io = null;

exports.io = () => {
  return io;
}

exports.initialize = (server) => {
  io = socketIO(server);

  io.on('connection', (socket) => { // 웹 소켓 연결
    console.log('Socket 연결이 시작되었습니다!');
  });
}