document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".activity-form");
    const NomeArquivoInput = document.getElementById("nomeArquivo");
    const TipoArquivoInput = document.getElementById("tipoArquivo");
    const DataRegistroInput = document.getElementById("dataRegistro");
    const DescricaoInput = document.getElementById("descricao");
   

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Coleta os dados dos campos do formulário
        const nomeArquivo = NomeArquivoInput.value.trim();
        const tipoArquivo = TipoArquivoInput.value.trim();
        const dataRegistro = DataRegistroInput.value;
        const descricao = DescricaoInput.value;
    

        // Valida se todos os campos foram preenchidos
        if (!nomeArquivo || !tipoArquivo || !dataRegistro || !descricao) {
            alert("Por favor, preencha todos os campos e selecione um arquivo PDF.");
            return;
        }

        // Cria um FormData para enviar o arquivo junto com os outros dados
        const formData = new FormData();
        formData.append("nomeArquivo", nomeArquivo);
        formData.append("tipoArquivo", tipoArquivo);
        formData.append("dataRegistro", dataRegistro);
        formData.append("descricao", descricao);
      

        // Envia os dados para o servidor via AJAX
        fetch('/cadastrar-atividade', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
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
