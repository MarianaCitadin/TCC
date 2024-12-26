// Simulando dados da turma (poderiam vir de uma API ou backend)
const turma = {
    nome: "Turma de Informática",
    horario: "Segundas e Quartas, 14:00 - 16:00",
    professor: "Maria Oliveira",
    local: "Sala 101 - Bloco A",
    participantes: [
        "João Silva",
        "Ana Souza",
        "Pedro Lima",
        "Carla Santos",
        "Marcos Pereira"
    ]
};

// Função para carregar as informações da turma dinamicamente
function carregarTurma() {
    document.getElementById("nome-turma").textContent = turma.nome;
    document.getElementById("horario-turma").textContent = turma.horario;
    document.getElementById("professor-turma").textContent = turma.professor;
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
