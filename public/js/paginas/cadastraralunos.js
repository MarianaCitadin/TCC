async function carregarDados() {
    try {
        // Carregar lista de alunos (categoria 1)
        const responseAlunos = await fetch('/listar-usuarios?categoriaID=1'); // Filtra alunos da categoria 1
        const alunos = await responseAlunos.json();

        const usuariosLista = document.getElementById('usuarios-lista');
        usuariosLista.innerHTML = ''; // Limpa a lista de alunos

        if (Array.isArray(alunos) && alunos.length > 0) {
            alunos.forEach(aluno => {
                const divAluno = document.createElement('div');
                divAluno.classList.add('aluno-item');
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `aluno-${aluno.UsuarioID}`;
                checkbox.value = aluno.UsuarioID;

                const label = document.createElement('label');
                label.setAttribute('for', checkbox.id);
                label.textContent = aluno.Nome;

                divAluno.appendChild(checkbox);
                divAluno.appendChild(label);
                usuariosLista.appendChild(divAluno);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = 'Nenhum aluno encontrado para a categoria 1';
            usuariosLista.appendChild(p);
        }

        // Carregar lista de turmas
        const responseTurmas = await fetch('/listar-turmas');
        const turmas = await responseTurmas.json();

        const selectTurma = document.getElementById('turma');
        selectTurma.innerHTML = ''; // Limpa o seletor

        if (Array.isArray(turmas) && turmas.length > 0) {
            turmas.forEach(turma => {
                const option = document.createElement('option');
                option.value = turma.TurmaID;
                option.textContent = turma.NomeTurma;
                selectTurma.appendChild(option);
            });
        } else {
            const option = document.createElement('option');
            option.textContent = 'Nenhuma turma encontrada';
            selectTurma.appendChild(option);
        }
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

document.getElementById('form-associar-aluno').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuarioIDs = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const turmaID = document.getElementById('turma').value;
    const messageDiv = document.getElementById('message');

    if (usuarioIDs.length === 0 || !turmaID) {
        messageDiv.textContent = 'Por favor, selecione ao menos um aluno e uma turma.';
        messageDiv.className = 'message error';
        return;
    }

    try {
        const response = await fetch('/associar-aluno-turma', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuarioIDs, turmaID })
        });

        const data = await response.json();

        if (data.success) {
            messageDiv.textContent = 'Alunos associados à turma com sucesso!';
            messageDiv.className = 'message success';
        } else {
            messageDiv.textContent = data.error || 'Erro ao associar alunos à turma.';
            messageDiv.className = 'message error';
        }
    } catch (error) {
        console.error('Erro ao associar aluno(s):', error);
        messageDiv.textContent = 'Erro ao associar aluno(s).';
        messageDiv.className = 'message error';
    }
});

// Carrega os dados ao carregar a página
carregarDados();
