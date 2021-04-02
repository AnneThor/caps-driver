'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

const driver = process.env.DRIVER_ID || 'driver';

socket.emit('join', driver);

socket.on('pickup', pickup);
socket.on('in-transit', intransit);

function pickup (payload) {
  setTimeout(() => {
    console.log(`picking up ${payload.orderID}`);
    socket.emit('in-transit', payload, driver);
  }, 1500);
}

function intransit (payload) {
  setTimeout(() => {
    console.log(`delivered ${payload.orderID}`);
    // let event = { event: 'delivered' }
    socket.emit('delivered', payload);
  }, 3000);
}

module.exports = {
  pickup: pickup,
  intransit: intransit,
  socket: socket
}
