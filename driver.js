'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

const driver = process.env.DRIVER_ID || 'driver';

socket.emit('join', driver);
socket.emit('getAll', {client: driver, event: 'pickup' });

socket.on('pickup', pickup);

function pickup (payload) {
  setTimeout(() => {
    console.log(`picking up ${payload.orderID}`);
    socket.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    socket.emit('delivered', payload);
  }, 3000);
}


module.exports = {
  pickup: pickup,
  socket: socket
}
