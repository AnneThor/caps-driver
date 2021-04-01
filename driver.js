'use strict';

require('dotenv').config();
const io = require('socket.io-client');

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}/caps`;
const socket = io.connect(host);

const driver = 'driver';

socket.emit('join', driver);

socket.on('pickup', pickup);
socket.on('in-transit', intransit);

function pickup (payload, event) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    let event = { event: 'in-transit' };
    socket.emit('in-transit', payload, event);
  }, 1500);
}

function intransit (payload, event) {
  setTimeout(() => {
    console.log(`DRIVER: delivered order ${payload.orderID}`);
    let event = { event: 'delivered' }
    socket.emit('delivered', payload, event);
  }, 3000);
}

module.exports = {
  pickup: pickup,
  intransit: intransit
}
