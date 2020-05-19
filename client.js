const io = require('socket.io-client');

const GSocket = function(url) {
    const socket = io(url);

    function connection(cb) {
        socket.on('connect', function() {
            cb(socket);
        });
    }

    function reconnect() {
        socket.on('disconnect', function() {
            socket.open();
        });
    }

    return {
        socket,
        connection,
        reconnect
    };
}

module.exports = GSocket;
