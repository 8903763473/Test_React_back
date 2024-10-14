const socketIo = require('socket.io');
let io;

module.exports = {
    init: (server) => {
        io = socketIo(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"],
                transports: ['websocket', 'polling']
            }
        });

        io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);
            socket.on('joinRoom', (userId) => {
                socket.join(userId);
                console.log(`User ${socket.id} joined room ${userId}`);
            });
        });

        return io;
    },
    getIo: () => {
        if (!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    }
};
