// Função para carregar as informações da turma dinamicamente
function carregarTurma() {
    document.getElementById("nome-turma").textContent = turma.nome;
    document.getElementById("horario-turma").textContent = turma.horario;
    document.getElementById("local-turma").textContent = turma.local;

    // Carregar participantes dinamicamente
    const listaParticipantes = document.getElementById("participantes-lista");
    turma.participantes.forEach(participante => {
        const li = document.createElement("li");
        li.textContent = participante;
        li.addEventListener("click", () => alert(`Você clicou em ${participante}`)); // Exemplo de ação
        listaParticipantes.appendChild(li);
    });
}

// Chama a função para carregar as informações assim que a página carregar
window.onload = carregarTurma;
