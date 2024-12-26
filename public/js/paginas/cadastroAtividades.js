document.addEventListener("DOMContentLoaded", function() {
    // Selecionando o formulário e os campos
    const form = document.querySelector(".activity-form");
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const dateInput = document.getElementById("date");
    const pdfInput = document.getElementById("pdf-upload");
    const submitBtn = document.querySelector(".submit-btn");

    // Função para validar e enviar o formulário
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Coleta os dados dos campos do formulário
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const date = dateInput.value;
        const pdfFile = pdfInput.files[0];

        // Valida se todos os campos foram preenchidos
        if (!title || !description || !date || !pdfFile) {
            alert("Por favor, preencha todos os campos e selecione um arquivo PDF.");
            return;
        }

        // Valida se o arquivo selecionado é um PDF
        if (pdfFile && pdfFile.type !== "application/pdf") {
            alert("O arquivo selecionado não é um PDF. Por favor, selecione um arquivo PDF.");
            return;
        }

        // Simulação de envio bem-sucedido (pode ser substituída por um envio real para o servidor)
        alert("Atividade cadastrada com sucesso!");

        // Limpar os campos após o envio (opcional)
        form.reset();
    });
});
