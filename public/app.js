// Obtener elementos
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesContainer = document.getElementById('messages');
const fileInput = document.getElementById('fileInput');

// Función para enviar un mensaje
function sendMessage() {
  const message = messageInput.value.trim();
  const file = fileInput.files[0];

  if (message || file) {
    // Crear un nuevo div para el mensaje
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');  // Añadir clase "sent"

    // Si el mensaje es de texto
    if (message) {
      messageElement.textContent = message;
    }

    // Si hay un archivo adjunto
    if (file) {
      const filePreview = document.createElement('div');
      if (file.type.startsWith('image')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.classList.add('file-preview');
        filePreview.appendChild(img);
      } else {
        filePreview.textContent = `Archivo: ${file.name}`;
      }
      messageElement.appendChild(filePreview);
    }

    // Añadir el mensaje a la interfaz
    messagesContainer.appendChild(messageElement);

    // Limpiar el campo de entrada
    messageInput.value = '';
    fileInput.value = '';

    // Hacer scroll hacia el último mensaje
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Simular mensaje recibido
    setTimeout(() => {
      receiveMessage("Este es un mensaje de ejemplo recibido.");
    }, 1000);
  }
}

// Función para recibir un mensaje
function receiveMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'received');  // Añadir clase "received"

  // Asignar el texto del mensaje
  messageElement.textContent = message;

  // Añadir el mensaje a la interfaz
  messagesContainer.appendChild(messageElement);

  // Hacer scroll hacia el último mensaje
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Event listener para el botón de enviar
sendMessageBtn.addEventListener('click', sendMessage);

// Event listener para presionar Enter para enviar
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});
