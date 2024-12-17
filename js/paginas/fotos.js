// Aguardar o carregamento da página
document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filterInput");
    const gallery = document.querySelector(".gallery");
    const photos = document.querySelectorAll(".photo");

    // Filtro de fotos
    filterInput.addEventListener("input", function (event) {
        const searchTerm = event.target.value.toLowerCase();
        
        // Filtra as fotos com base no texto fornecido
        photos.forEach(photo => {
            const caption = photo.querySelector("p").textContent.toLowerCase();
            if (caption.includes(searchTerm)) {
                photo.style.display = "block"; // Exibe a foto
            } else {
                photo.style.display = "none"; // Oculta a foto
            }
        });
    });

    // Função para adicionar nova foto (pode ser personalizada)
    function addNewPhoto(imgSrc, captionText) {
        const newPhoto = document.createElement("div");
        newPhoto.classList.add("photo");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = captionText;

        const caption = document.createElement("p");
        caption.textContent = captionText;

        newPhoto.appendChild(img);
        newPhoto.appendChild(caption);

        gallery.appendChild(newPhoto);
    }

    // Exemplo: adicionando uma nova foto ao carregar a página (opcional)
    addNewPhoto("/projeto/assets/imagens/paginas/fotos/foto4.jpg", "Evento C - 12/2024");
});
