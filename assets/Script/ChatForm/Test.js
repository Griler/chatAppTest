const io = require('socket.io-client');
let socket
function createSoketIo(){
    socket  = io('https://serverchat-om1r.onrender.com');
    return socket;
}
module.exports = {
    createSoketIo,
};