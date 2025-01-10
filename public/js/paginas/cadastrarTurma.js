async function validarFormulario(event) {
    event.preventDefault();  // Evita que o formulário seja enviado automaticamente

    // Obtém os valores dos campos
    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const limiteAlunos = parseInt(document.getElementById('limiteAlunos').value.trim(), 10);  // Converte para número

    // Depuração: Mostra os valores no console
    console.log("Nome Turma:", nomeTurma);
    console.log("Horário:", horario);
    console.log("Data Início:", dataInicio);
    console.log("Data Fim:", dataFim);
    console.log("Limite Alunos:", limiteAlunos);

    // Verificar se os campos estão preenchidos
    if (!nomeTurma || !horario || !dataInicio || !dataFim || isNaN(limiteAlunos)) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Envia os dados para o backend
    try {
        const response = await fetch('/cadastrarTurmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nomeTurma,
                horario,
                dataInicio,
                dataFim,
                limiteAlunos,
            }),
        });

        // Verifique se a resposta é bem-sucedida
        if (!response.ok) {
            const errorResponse = await response.json();  // Pega a resposta de erro em formato JSON
            console.error('Erro na requisição:', errorResponse);
            throw new Error(`Erro ao cadastrar a turma: ${errorResponse.message}`);
        }

        const result = await response.json();

        if (result.message) {
            alert(result.message);  // Exibe a mensagem de sucesso
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar a turma.');
    }
}

// Evite o envio automático do formulário
document.querySelector('form').addEventListener('submit', validarFormulario);
