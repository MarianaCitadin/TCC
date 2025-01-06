async function validarFormulario(event) {
    event.preventDefault();

    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

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
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar a turma.');
        }

        const result = await response.text();
        alert(result);
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar a turma.');
    }
}
