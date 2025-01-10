// Função para carregar as informações da turma dinamicamente
function carregarTurma(turma) {
    document.getElementById("nome-turma").textContent = turma.nome;
    document.getElementById("horario-turma").textContent = turma.horario;
    document.getElementById("local-turma").textContent = turma.local;

    // Carregar participantes dinamicamente
    const listaParticipantes = document.getElementById("listar-usuarios");
    turma.participantes.forEach(participante => {
        const li = document.createElement("li");
        li.textContent = participante;
        li.addEventListener("click", () => alert(`Você clicou em ${participante}`)); // Exemplo de ação
        listaParticipantes.appendChild(li);
    });
}

// Função para buscar e exibir os dados dos usuários
async function listarUsuarios() {
    try {
        // Fazendo a requisição para a API
        const response = await fetch('/listar-usuarios');
        const usuarios = await response.json();

        if (usuarios.length === 0) {
            alert('Nenhum usuário encontrado.');
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

// Chama a função para listar os usuários quando a página carregar
document.addEventListener('DOMContentLoaded', listarUsuarios);

// Chama a função para carregar as informações assim que a página carregar
window.onload = carregarTurma;