// Função para validar o formulário
function validarFormulario(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Pegando os valores dos campos
    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const professor = document.getElementById('professor').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    // Verificando se todos os campos estão preenchidos
    if (!nomeTurma || !professor || !horario || !dataInicio || !dataFim) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    // Verificando se a data de início é anterior à data de término
    if (new Date(dataInicio) > new Date(dataFim)) {
        alert('A data de início não pode ser posterior à data de término.');
        return;
    }

    // Se tudo estiver correto, mostra uma mensagem de sucesso
    alert('Turma cadastrada com sucesso!');
    
    // Opcional: após a validação, você pode enviar o formulário (aqui é apenas uma simulação)
    // document.querySelector('.turma-form').submit();
}

// Adicionando o evento de submit ao formulário
document.querySelector('.turma-form').addEventListener('submit', validarFormulario);
