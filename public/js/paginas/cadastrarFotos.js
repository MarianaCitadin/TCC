document.addEventListener("DOMContentLoaded", function() {
    // Selecionando o formulário e os campos
    const form = document.querySelector(".foto-form");
    const descricaoInput = document.getElementById("descricao");
    const fotoInput = document.getElementById("foto");
    const DataRegistroInput = document.getElementById("DataRegistro");
    const submitBtn = document.querySelector(".submit-btn");

    // Container para pré-visualização
    let previewContainer = document.createElement("div");
    previewContainer.classList.add("preview-container");
    form.appendChild(previewContainer);

    // Função para exibir a prévia da foto
    fotoInput.addEventListener("change", function(event) {
        const file = event.target.files[0];

        // Limpar prévia anterior
        previewContainer.innerHTML = '';

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.createElement("img");
                preview.src = e.target.result;
                preview.style.maxWidth = "200px"; // Tamanho da prévia
                preview.style.marginTop = "20px";
                preview.alt = "Prévia da foto";

                // Adicionar a prévia ao container
                previewContainer.appendChild(preview);
            };
            reader.readAsDataURL(file);
        }
    });

    // Função para validar o formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const descricao = descricaoInput.value.trim();
        const foto = fotoInput.files[0];
        const DataRegistro = DataRegistroInput.value.trim();

        if (!descricao || !foto || !DataRegistro) {
            alert("Por favor, preencha todos os campos e selecione uma foto.");
            return;
        }

        // Criação de um FormData para enviar os dados via POST
        const formData = new FormData();
        formData.append("descricao", descricao);
        formData.append("foto", foto);
        formData.append("DataRegistro", DataRegistro);

        // Enviar os dados para o servidor usando fetch
        fetch("http://localhost:3000/cadastrarFotos", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json(); // Certifique-se de que o servidor retorna JSON
        })
        .then(data => {
            if (data.success) {
                alert(data.message || "Foto adicionada com sucesso!");
                form.reset();
                previewContainer.innerHTML = ''; // Limpar a prévia
            } else {
                alert(data.message || "Erro ao adicionar foto. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro de rede:", error);
            alert("Erro ao enviar os dados. Tente novamente.");
        });
    });
});
