// Função para validar e enviar o formulário de cadastro de turmas
async function validarFormulario(event) {
    event.preventDefault();

    // Captura os valores dos campos do formulário
    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const projetoId = document.getElementById('projetoId').value.trim(); // Assuming an input for ProjetoID
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const limiteAlunos = document.getElementById('limiteAlunos').value.trim();

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nomeTurma || !dataInicio || !dataFim) {
        alert('Os campos Nome da Turma, Data Início e Data Fim são obrigatórios.');
        return;
    }

    try {
        // Faz a requisição para o backend
        const response = await fetch('/cadastrarTurmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeTurma,
                projetoId: projetoId || null, // Envia null se o campo estiver vazio
                horario,
                dataInicio,
                dataFim,
                limiteAlunos: limiteAlunos || 20, // Define 20 como padrão
            }),
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao cadastrar a turma.');
        }

        const result = await response.json();
        if (result.message) {
            alert(result.message); // Exibe mensagem de sucesso
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar a turma.');
    }
}

// Adiciona o evento ao formulário quando a página carregar
document.getElementById('formCadastroTurma').addEventListener('submit', validarFormulario);
