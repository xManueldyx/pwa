// Cargar imágenes de perros en la galería
function loadDogImages() {
    for (let i = 0; i < 5; i++) {
        fetch('https://dog.ceo/api/breeds/image/random')
            .then((response) => response.json())
            .then((data) => {
                const dogImageUrl = data.message;
                addImageToGallery(dogImageUrl); // Agregar imagen a la galería
            })
            .catch((error) => {
                console.error('Hubo un error al obtener la imagen:', error);
            });
    }
}

// Función para agregar una imagen a la galería
function addImageToGallery(imageUrl) {
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    document.getElementById('gallery').appendChild(imgElement);
}



// Cargar imágenes al iniciar
document.addEventListener('DOMContentLoaded', (event) => {
    loadDogImages();
});