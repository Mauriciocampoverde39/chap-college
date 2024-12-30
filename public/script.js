const socket = io();

// Enviar mensaje
document.getElementById('send-btn').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    socket.emit('chatMessage', message); // Enviar el mensaje al servidor
    document.getElementById('message-input').value = ''; // Limpia el campo de texto
});

// Recibir mensaje
socket.on('chatMessage', (msg) => {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = msg;
    messagesDiv.appendChild(newMessage);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Desplázate al final
});
