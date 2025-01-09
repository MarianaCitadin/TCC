window.onload = function() {
    // Função para buscar e exibir as fotos
    function carregarFotos() {
        fetch('/api/fotos')
        .then(response => response.json())
        .then(data => {
            const fotosContainer = document.getElementById('fotosContainer');
            if (fotosContainer) {
                data.forEach(foto => {
                    // Criação do contêiner para cada foto
                    const fotoDiv = document.createElement('div');
                    fotoDiv.classList.add('foto-item');

                    // Criação da imagem
                    const img = document.createElement('img');
                    img.src = '/uploads/' + foto.Foto;
                    img.alt = foto.Descricao;
                    fotoDiv.appendChild(img);

                    // Criação da descrição
                    const descricao = document.createElement('p');
                    descricao.textContent = foto.Descricao;
                    fotoDiv.appendChild(descricao);

                    // Adiciona o item ao contêiner principal
                    fotosContainer.appendChild(fotoDiv);

                    // Função para abrir o modal com a foto ampliada e dados
                    fotoDiv.onclick = function() {
                        abrirModal(foto);
                    };
                });
            } else {
                console.error('Elemento fotosContainer não encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar fotos:', error);
        });
    }

    // Função para formatar a data no formato dd/mm/yyyy
    function formatarData(dataStr) {
        const data = new Date(dataStr);
        const dia = ("0" + data.getDate()).slice(-2);
        const mes = ("0" + (data.getMonth() + 1)).slice(-2);
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para abrir o modal com a foto e seus dados
    function abrirModal(foto) {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modal-img');
        const modalDescricao = document.getElementById('modal-descricao');
        const modalDate = document.getElementById('modal-date');

        modal.style.display = "flex";
        modal.classList.add("show");

        modalImg.src = '/uploads/' + foto.Foto;
        modalDescricao.textContent = foto.Descricao;
        modalDate.textContent = "Data: " + formatarData(foto.DataRegistro);

        // Zoom na imagem ao clicar
        modalImg.onclick = function() {
            modalImg.style.transform = modalImg.style.transform === "scale(1.5)" ? "scale(1)" : "scale(1.5)";
            modalImg.style.transition = "transform 0.3s ease"; // Transição suave ao dar zoom
        };
    }

    // Função para fechar o modal
    function fecharModal() {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
        modal.classList.remove("show");
    }

    // Fechar o modal ao clicar fora da imagem
    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            fecharModal();
        }
    };

    // Fechar o modal ao clicar no botão de fechar
    document.getElementById('close').onclick = function() {
        fecharModal();
    };

    // Chamar a função para carregar as fotos
    carregarFotos();
};
