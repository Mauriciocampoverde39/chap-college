// Función para recibir mensajes
function recibirMensaje() {
    // Simulamos la recepción de un mensaje (puedes cambiarlo por AJAX o WebSockets)
    fetch('/recibir_mensaje')
        .then(response => response.json())
        .then(data => {
            let chatBox = document.getElementById('chat-box');
            let nuevoMensaje = document.createElement('div');
            nuevoMensaje.classList.add('message');
            if (data.mensaje) {
                nuevoMensaje.textContent = data.mensaje;
            } else if (data.archivo) {
                let archivoLink = document.createElement('a');
                archivoLink.href = data.archivo;
                archivoLink.textContent = 'Ver archivo';
                nuevoMensaje.appendChild(archivoLink);
            }
            chatBox.appendChild(nuevoMensaje);
            chatBox.scrollTop = chatBox.scrollHeight;  // Mantiene el scroll al final
        });
}

// Función para enviar mensaje
function enviarMensaje() {
    let mensaje = document.getElementById('mensaje-input').value;
    let archivo = document.getElementById('file-input').files[0];

    if (mensaje.trim() === '' && !archivo) return; // No enviar mensajes vacíos ni sin archivo

    let formData = new FormData();
    if (mensaje.trim() !== '') {
        formData.append('mensaje', mensaje);
    }
    if (archivo) {
        formData.append('archivo', archivo);
    }

    // Mostrar el mensaje enviado en la interfaz
    let chatBox = document.getElementById('chat-box');
    let nuevoMensaje = document.createElement('div');
    nuevoMensaje.classList.add('message', 'my-message');
    if (mensaje.trim() !== '') {
        nuevoMensaje.textContent = mensaje;
    } else {
        let archivoLink = document.createElement('a');
        archivoLink.href = URL.createObjectURL(archivo);
        archivoLink.textContent = 'Ver archivo';
        nuevoMensaje.appendChild(archivoLink);
    }
    chatBox.appendChild(nuevoMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;  // Mantiene el scroll al final

    // Limpiar el campo de texto y archivo
    document.getElementById('mensaje-input').value = '';
    document.getElementById('file-input').value = '';

    // Enviar el mensaje y archivo al servidor
    fetch('/enviar_mensaje', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.status);
    });
}

// Función para simular la recepción de mensajes cada 5 segundos
setInterval(recibirMensaje, 5000);  // Simula que cada 5 segundos se recibe un nuevo mensaje
