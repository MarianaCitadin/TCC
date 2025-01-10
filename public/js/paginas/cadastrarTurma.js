document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('turmaForm');

    // Preenche o projetoId automaticamente usando a rota /getProjetoId
    preencherProjetoId();

    if (form) {
        form.addEventListener('submit', validarFormulario);
    } else {
        console.error('Formulário não encontrado!');
    }
});

// Função para preencher o projetoId no campo oculto
async function preencherProjetoId() {
    try {
        const response = await fetch('/getProjetoId');
        if (!response.ok) {
            throw new Error('Erro ao buscar o Projeto ID.');
        }

        const data = await response.json();
        const projetoId = data.projetoId;

        if (projetoId) {
            const projetoIdField = document.getElementById('projetoId');
            if (projetoIdField) {
                projetoIdField.value = projetoId;
                console.log('Projeto ID preenchido no formulário:', projetoId);
            } else {
                console.error('Campo oculto para Projeto ID não encontrado!');
            }
        } else {
            console.error('Projeto ID não retornado pela rota /getProjetoId.');
        }
    } catch (error) {
        console.error('Erro ao preencher o Projeto ID:', error);
        alert('Não foi possível obter o Projeto ID. Tente novamente.');
    }
}

// Função para validar o formulário e enviar os dados
async function validarFormulario(event) {
    event.preventDefault(); // Evita que o formulário seja enviado automaticamente

    // Obtém os valores dos campos
    const nomeTurma = document.getElementById('nomeTurma').value.trim();
    const horario = document.getElementById('horario').value.trim();
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;
    const projetoId = document.getElementById('projetoId')?.value;

    let limiteAlunos = document.getElementById('limiteAlunos').value.trim();
    limiteAlunos = limiteAlunos ? parseInt(limiteAlunos, 10) : 20; // Define 20 como valor padrão

    // Verificar se os campos estão preenchidos
    if (!nomeTurma || !horario || !dataInicio || !dataFim || !projetoId) {
        alert("Todos os campos são obrigatórios, incluindo o Projeto ID.");
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
                projetoId,
            }),
        });

        // Verifique se a resposta é bem-sucedida
        if (!response.ok) {
            const errorResponse = await response.text(); // Pega a resposta de erro como texto
            console.error('Erro na requisição:', errorResponse);
            alert(`Erro ao cadastrar a turma: ${errorResponse}`);
            throw new Error(`Erro ao cadastrar a turma: ${errorResponse}`);
        }

        const result = await response.json();

        if (result.message) {
            alert(result.message); // Exibe a mensagem de sucesso
            
        }
    } catch (error) {
        console.error('Erro:', error);
       
    }
}
