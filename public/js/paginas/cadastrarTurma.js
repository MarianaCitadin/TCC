async function validarFormulario(event) {
    event.preventDefault();

    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const limiteAlunos = document.getElementById('limiteAlunos').value.trim();  // Assuming an input for LimiteAlunos
    
 
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
        limiteAlunos
    }),
            });


        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao cadastrar a turma.');
        }

        // A resposta deve ser um JSON
        const result = await response.json();

        if (result.message) {
            alert(result.message);  // Exibe a mensagem de sucesso
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar a turma.');
    }
}
