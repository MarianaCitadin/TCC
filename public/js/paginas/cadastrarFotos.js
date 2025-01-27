document.addEventListener("DOMContentLoaded", function () {
    // Selecionando o formulário e os campos
    const form = document.querySelector(".foto-form");
    const descricaoInput = document.getElementById("descricao");
    const fotoInput = document.getElementById("foto");
    const DataRegistroInput = document.getElementById("DataRegistro");
    const projetoSelect = document.getElementById("projeto");
    const submitBtn = document.querySelector(".submit-btn");

    // Container para pré-visualização
    let previewContainer = document.createElement("div");
    previewContainer.classList.add("preview-container");
    form.appendChild(previewContainer);

    // Função para carregar os projetos do backend
    async function carregarProjetos() {
        try {
            const response = await fetch('/listarProjetos');
            console.log("Status da resposta:", response.status); // Verifica o status da resposta
            if (!response.ok) {
                throw new Error(`Erro ao carregar projetos: ${response.statusText}`);
            }
    
            const projetos = await response.json();
            console.log("Projetos recebidos:", projetos); // Verifica os projetos recebidos
            preencherSelectProjetos(projetos);
        } catch (error) {
            console.log("Erro ao carregar projetos:", error);
            alert("Não foi possível carregar os projetos.");
        }
    }
    

    // Função para preencher o <select> com os projetos
    function preencherSelectProjetos(projetos) {
        try {
            console.log("Dados recebidos para preencher o select:", projetos);
    
            // Valida se os dados são uma lista válida
            if (!projetos || !Array.isArray(projetos)) {
                throw new Error("Os dados de projetos não estão no formato esperado.");
            }
    
            // Limpa o select e adiciona a opção padrão
            projetoSelect.innerHTML = '<option value="" disabled selected>Selecione um projeto</option>';
    
            // Itera pelos projetos e adiciona as opções
            projetos.forEach(projeto => {
                if (!projeto.ProjetoID || !projeto.NomeProjeto) {
                    console.warn("Projeto com dados incompletos ignorado:", projeto);
                    return;
                }
    
                const option = document.createElement('option');
                option.value = projeto.ProjetoID;
                option.textContent = projeto.NomeProjeto;
                projetoSelect.appendChild(option);
            });
    
            console.log("Select preenchido com sucesso.");
        } catch (error) {
            console.error("Erro ao preencher o select de projetos:", error);
            alert("Erro ao carregar projetos no formulário.");
        }
    }
    

    // Função para exibir a prévia da foto
    fotoInput.addEventListener("change", function (event) {
        const file = event.target.files[0];

        // Limpar prévia anterior
        previewContainer.innerHTML = "";

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
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

    // Função para validar e enviar o formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previne o envio do formulário

        const descricao = descricaoInput.value.trim();
        const foto = fotoInput.files[0];
        const DataRegistro = DataRegistroInput.value.trim();
        const projetoId = projetoSelect.value;

        if (!descricao || !foto || !DataRegistro || !projetoId) {
            alert("Por favor, preencha todos os campos, selecione um projeto e uma foto.");
            return;
        }

        // Criação de um FormData para enviar os dados via POST
        const formData = new FormData();
        formData.append("descricao", descricao);
        formData.append("foto", foto);
        formData.append("DataRegistro", DataRegistro);
        formData.append("projetoId", projetoId);

        // Enviar os dados para o servidor usando fetch
        fetch("/cadastrarFotos", {
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
                    previewContainer.innerHTML = ""; // Limpar a prévia
                    carregarFotos(); // Atualizar a lista de fotos cadastradas
                } else {
                    alert(data.message || "Erro ao adicionar foto. Tente novamente.");
                }
            })
        
    });

    // Chamar a função para carregar os projetos ao carregar a página
    carregarProjetos();
});
