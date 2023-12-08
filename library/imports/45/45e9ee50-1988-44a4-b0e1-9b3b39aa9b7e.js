"use strict";
cc._RF.push(module, '45e9e5QGYhEpLDhmzs5qpt+', 'Test');
// Script/ChatForm/Test.js

'use strict';

var io = require('socket.io-client');
var socket = void 0;
function createSoketIo() {
    socket = io('https://serverchat-om1r.onrender.com');
    return socket;
}
module.exports = {
    createSoketIo: createSoketIo
};

cc._RF.pop();