// Função para carregar os dados da turma
async function carregarTurma() {
    try {
        const response = await fetch('/listar-turmas');
        const turmas = await response.json();
        
        if (Array.isArray(turmas) && turmas.length > 0) {
            // Supondo que você tenha uma única turma, pegue os dados da primeira
            const turma = turmas[0];

            // Preenche os dados da turma no HTML
            document.getElementById('nome-turma').textContent = turma.NomeTurma || 'Nome não disponível';
            document.getElementById('horario-turma').textContent = turma.Horario || 'Horário não disponível';
            document.getElementById('local-turma').textContent = turma.Local || 'Local não disponível';
        } else {
            console.error('Nenhuma turma encontrada.');
        }
    } catch (error) {
        console.error('Erro ao carregar turma:', error);
    }
}

// Função para carregar os participantes da turma
async function carregarParticipantes() {
    try {
        const response = await fetch('/listar-usuarios');
        const usuarios = await response.json();

        // Filtra os usuários da categoria 1
        const participantes = usuarios.filter(usuario => usuario.CategoriaID === 1);

        if (Array.isArray(participantes) && participantes.length > 0) {
            const participantesLista = document.getElementById('participantes-lista');
            participantesLista.innerHTML = ''; // Limpa antes de preencher

            // Cria uma lista com os participantes
            participantes.forEach(participante => {
                const li = document.createElement('li');
                li.textContent = `${participante.Nome}`;
                participantesLista.appendChild(li);
            });
        } else {
            console.error('Nenhum participante encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar participantes:', error);
    }
}

// Garantir que o DOM esteja carregado antes de manipular
document.addEventListener('DOMContentLoaded', () => {
    carregarTurma();
    carregarParticipantes();
});
