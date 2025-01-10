
// Função para buscar e exibir os dados dos usuários da categoria 1
async function listarUsuarios() {
    try {
        // Fazendo a requisição para a API que agora filtra pela categoria 1
        const response = await fetch('/listar-usuarios');
        const usuarios = await response.json();

        if (usuarios.length === 0) {
            alert('Nenhum usuário encontrado na categoria 1.');
            return;
        }

        // Preenchendo a lista com os nomes dos usuários
        const listaUsuarios = document.querySelector('#listar-usuarios');
        listaUsuarios.innerHTML = ''; // Limpa o conteúdo atual da lista

        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.textContent = usuario.Nome; // Exibe apenas o nome
            listaUsuarios.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        alert('Erro ao buscar os dados dos usuários');
    }
}

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


// Chama a função para listar os usuários quando a página carregar
document.addEventListener('DOMContentLoaded', listarUsuarios);
// Garantir que o DOM esteja carregado antes de manipular
document.addEventListener('DOMContentLoaded', () => {
    carregarTurma();
});