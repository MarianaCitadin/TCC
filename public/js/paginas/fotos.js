document.addEventListener("DOMContentLoaded", function() {
    const fotoContainer = document.getElementById("foto-container");

    fetch("http://localhost:3000/listarFotos")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fotoContainer.innerHTML = ""; // Limpa o texto "Carregando registros..."

            if (data.length === 0) {
                fotoContainer.innerHTML = "<p>Nenhum registro encontrado.</p>";
                return;
            }

            data.forEach(registro => {
                const registroItem = document.createElement("div");
                registroItem.classList.add("foto-item");

                registroItem.innerHTML = `
                    <h2>Usuário ID: ${registro.UsuarioID} - Projeto ID: ${registro.ProjetoID}</h2>
                    <img src="${registro.Foto}" alt="${registro.Descricao}">
                    <p>${registro.Descricao}</p>
                    <p><small>Data: ${registro.DataRegistro}</small></p>
                `;

                fotoContainer.appendChild(registroItem);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os registros:", error);
            fotoContainer.innerHTML = "<p>Erro ao carregar os registros. Tente novamente mais tarde.</p>";
        });
});

// Função para carregar as fotos do backend
function carregarFotos() {
    fetch('http://localhost:3000/api/fotos')// Verifique se esse é o endpoint correto para a sua API
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = ''; // Limpa o conteúdo existente

            if (data && data.length > 0) {
                data.forEach(foto => {
                    // Cria os elementos HTML para cada foto
                    const photoDiv = document.createElement('div');
                    photoDiv.classList.add('photo');

                    const img = document.createElement('img');
                    img.src = foto.Foto; // Caminho da foto no servidor
                    img.alt = foto.Descricao || 'Foto sem descrição';

                    const caption = document.createElement('p');
                    caption.textContent = foto.Descricao || 'Sem descrição';

                    // Adiciona os elementos ao container
                    photoDiv.appendChild(img);
                    photoDiv.appendChild(caption);
                    gallery.appendChild(photoDiv);
                });
            } else {
                gallery.innerHTML = '<p>Nenhuma foto encontrada.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
            const gallery = document.getElementById('gallery');
            gallery.innerHTML = '<p>Erro ao carregar as fotos. Tente novamente mais tarde.</p>';
        });
}

// Carrega as fotos ao carregar a página
window.onload = carregarFotos;
