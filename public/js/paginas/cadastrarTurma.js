document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('turmaForm');
    if (form) {
        form.addEventListener('submit', validarFormulario);
    } else {
        console.error('Formulário não encontrado!');
    }
});

async function validarFormulario(event) {
    event.preventDefault();  // Evita que o formulário seja enviado automaticamente

    // Obtém os valores dos campos
    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    let limiteAlunos = document.getElementById('limiteAlunos').value.trim();
    
    // Converte para número e define 20 como valor padrão se estiver vazio
    limiteAlunos = limiteAlunos ? parseInt(limiteAlunos, 10) : 20;

    // Verificar se os campos estão preenchidos
    if (!nomeTurma || !horario || !dataInicio || !dataFim) {
        alert("Todos os campos são obrigatórios.");
        return;
    }

    // Verificar se limiteAlunos é um número válido
    if (isNaN(limiteAlunos) || limiteAlunos <= 0) {
        alert("O limite de alunos deve ser um número válido e maior que zero.");
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
            const errorResponse = await response.text();  // Pega a resposta de erro como texto
            console.error('Erro na requisição:', errorResponse);
            alert(`Erro ao cadastrar a turma: ${errorResponse}`);
            throw new Error(`Erro ao cadastrar a turma: ${errorResponse}`);
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
