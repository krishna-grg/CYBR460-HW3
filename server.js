const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const logFile = 'output/chat_log.txt';

const outputDir = 'output';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}


io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // to handle room join
    //socket is an object: methods and properties hels interact
    socket.on('join room', (roomName) => {
        socket.join(roomName);
        console.log(`${socket.id} joined room: ${roomName}`);
        socket.emit('chat message', `You joined room: ${roomName}`);
    });

    // incoming chat messages
    socket.on('chat message', (messages, roomName) => {
        if (!roomName) {
            socket.emit('chat message', 'Join a room first!');
            return;
        }
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${socket.id} [${roomName}]: ${messages}\n`;

        io.to(roomName).emit('chat message', `${socket.id}: ${messages}`);

        // Log the message
        fs.appendFile(logFile, logEntry, (err) => {
            if (err) console.error('Error writing to log:', err);
        });
    });

    // disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});