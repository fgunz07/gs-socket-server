const io = require('socket.io')(3000);
let connections = 0;

const socket =  io.on('connection', socket => {
    countConnections(true);
    console.log(socket.id);

    socket.on('subscribe', function subscribe({room_id}) {
        socket.join(room_id);
        console.log(room_id);
    });

    socket.on('update_location', function updateLocation(payload) {
        console.log(payload);
        io.in(payload.room_id).emit('new_location', payload.payload);
    });

    socket.on('disconnect', () => {
        countConnections(false)
    });

    return socket;
});

function countConnections(con)
{
    if(con) {
        connections++;
    } else {
        connections--;
     }
    console.log(`Active connections: ${connections}`);
}