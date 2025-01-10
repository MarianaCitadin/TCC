document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".activity-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Coleta os dados dos campos do formulário
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const date = document.getElementById("date").value;
        const pdfFile = document.getElementById("pdf-upload").files[0]; // Pega o arquivo PDF

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
});
