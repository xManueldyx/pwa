// Función para habilitar notificaciones y agregar imagen a la galería
document.getElementById('notifyButton').addEventListener('click', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => {
                    const dogImageUrl = data.message;
                    addImageToGallery(dogImageUrl); // Agregar imagen a la galería
                    navigator.serviceWorker.ready.then(swRegistration => {
                        swRegistration.showNotification('Nueva Imagen de Perro', {
                            body: 'Se ha agregado una nueva imagen a la galería!',
                            icon: 'icon.png',
                            image: dogImageUrl,
                        });
                    });
                })
                .catch(error => {
                    console.error('Hubo un error al obtener la imagen:', error);
                });
        } else {
            alert("No se aceptaron las notificaciones");
        }
    });
});