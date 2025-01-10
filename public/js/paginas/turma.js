// Função para carregar os dados da turma associada ao usuário
async function carregarTurma() {
    try {
        const response = await fetch('/listarTurmas'); // Nova rota para listar turmas do usuário
        const turmas = await response.json();

        if (Array.isArray(turmas) && turmas.length > 0) {
            // Supondo que o usuário tenha acesso a apenas uma turma
            const turma = turmas[0];

            // Preenche os dados da turma no HTML
            document.getElementById('nome-turma').textContent = turma.NomeTurma || 'Nome não disponível';
            document.getElementById('horario-turma').textContent = turma.horario || 'Nome não disponível';
            document.getElementById('local-turma').textContent = turma.local || 'Nome não disponível';
        } else {
            console.error('Nenhuma turma encontrada.');
            document.getElementById('nome-turma').textContent = 'Nenhuma turma disponível.';
        }
    } catch (error) {
        console.error('Erro ao carregar turma:', error);
        document.getElementById('nome-turma').textContent = 'Erro ao carregar turma.';
    }
}

// Função para carregar os participantes de uma turma específica
async function carregarParticipantes(turmaId) {
    try {
        const response = await fetch(`/turma/${turmaId}/participantes`); // Nova rota para participantes
        if (!response.ok) {
            throw new Error(`Erro ao buscar participantes: ${response.statusText}`);
        }

        const participantes = await response.json();

        if (Array.isArray(participantes) && participantes.length > 0) {
            const participantesLista = document.getElementById('participantes-lista');
            participantesLista.innerHTML = ''; // Limpa antes de preencher

            // Cria uma lista com os participantes
            participantes.forEach(participante => {
                const li = document.createElement('li');
                li.textContent = participante.Nome;
                participantesLista.appendChild(li);
            });
        } else {
            console.error('Nenhum participante encontrado.');
            document.getElementById('participantes-lista').innerHTML = '<li>Nenhum participante encontrado.</li>';
        }
    } catch (error) {
        console.error('Erro ao carregar participantes:', error);
        document.getElementById('participantes-lista').innerHTML = '<li>Erro ao carregar participantes.</li>';
    }
}

// Garantir que o DOM esteja carregado antes de manipular
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Carregar dados da turma
        const response = await fetch('/listarTurmas');
        const turmas = await response.json();

        if (Array.isArray(turmas) && turmas.length > 0) {
            const turmaId = turmas[0].TurmaID; // Assume que o usuário está associado à primeira turma retornada
            carregarTurma();
            carregarParticipantes(turmaId);
        } else {
            console.error('Nenhuma turma disponível para o usuário.');
            document.getElementById('nome-turma').textContent = 'Nenhuma turma disponível.';
        }
    } catch (error) {
        console.error('Erro ao inicializar página de turma:', error);
    }
});
