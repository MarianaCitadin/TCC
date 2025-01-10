document.addEventListener("DOMContentLoaded", function() {


    const form = document.querySelector(".activity-form");
    const projetoSelect = document.getElementById("projeto");
    
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Coleta os dados dos campos do formulário
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const date = document.getElementById("date").value;
        const pdfFile = document.getElementById("pdf-upload").files[0]; // Pega o arquivo PDF
        const projetoId = projetoSelect.value;

        // Valida se todos os campos foram preenchidos
        if (!title || !description || !date || !pdfFile) {
            alert("Por favor, preencha todos os campos e selecione um arquivo PDF.");
            return;
        }

        // Cria um FormData para enviar o arquivo junto com os outros dados
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("projetoId", projetoId);

        // Renomeia o arquivo para o título inserido pelo usuário
        const newFileName = title + ".pdf"; // Definindo o novo nome com a extensão .pdf
        const renamedFile = new File([pdfFile], newFileName, { type: pdfFile.type });

        // Adiciona o arquivo renomeado ao FormData
        formData.append("pdf-upload", renamedFile);

        // Envia os dados para o servidor via AJAX
        fetch('/cadastrar-atividade', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json()) // Resposta como JSON
        .then(data => {
            if (data.success) {
                alert("Atividade cadastrada com sucesso!");
                form.reset(); // Limpar os campos após o envio
            } else {
                alert("Erro ao cadastrar a atividade. Tente novamente.");
            }
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
            alert("Erro ao enviar os dados. Tente novamente.");
        });
    });


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

carregarProjetos();
});

