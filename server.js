const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Envía el mensaje a todos
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Iniciar el servidor
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
