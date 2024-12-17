document.addEventListener("DOMContentLoaded", function() {
    // Selecionando o formulário e os campos
    const form = document.querySelector(".foto-form");
    const tituloInput = document.getElementById("titulo");
    const descricaoInput = document.getElementById("descricao");
    const fotoInput = document.getElementById("foto");
    const submitBtn = document.querySelector(".submit-btn");

    // Função para exibir a prévia da foto
    fotoInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        const preview = document.createElement("img");
        const previewContainer = document.querySelector(".preview-container");
        
        // Limpar prévia anterior, se existir
        if (previewContainer) {
            previewContainer.innerHTML = '';
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.maxWidth = "200px"; // Definindo o tamanho da prévia
                preview.style.marginTop = "20px";
                preview.alt = "Prévia da foto";
                
                // Adicionar a prévia ao container
                if (!previewContainer) {
                    const newPreviewContainer = document.createElement("div");
                    newPreviewContainer.classList.add("preview-container");
                    newPreviewContainer.appendChild(preview);
                    form.appendChild(newPreviewContainer);
                } else {
                    previewContainer.appendChild(preview);
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Função para validar o formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio do formulário para validação

        const titulo = tituloInput.value.trim();
        const descricao = descricaoInput.value.trim();
        const foto = fotoInput.files[0];

        if (!titulo || !descricao || !foto) {
            alert("Por favor, preencha todos os campos e selecione uma foto.");
            return;
        }

        // Simulação de envio do formulário
        alert("Foto adicionada com sucesso!");
        
        // Limpar os campos após envio (opcional)
        form.reset();

        // Limpar a prévia da imagem
        const previewContainer = document.querySelector(".preview-container");
        if (previewContainer) {
            previewContainer.remove();
        }
    });
});
