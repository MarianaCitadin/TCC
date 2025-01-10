document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.querySelector('.add-event');
    const eventForm = document.getElementById('eventForm');
    const eventTable = document.querySelector('table tbody');
    const cancelFormButton = document.getElementById('cancelForm');
    const turmaSelect = document.getElementById('turma'); // Campo para selecionar a turma

    // Função para formatar a data de ISO para dd/mm/yyyy
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para adicionar um evento à tabela
    function addEventToTable(title, date, location, turma, eventId) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${formatDate(date)}</td>
            <td>${location}</td>
            <td>${turma}</td>
            <td><button class="delete-btn" data-event-id="${eventId}">Deletar</button></td>
        `;
        eventTable.appendChild(newRow);
    }

    // Função para carregar as turmas do backend
    async function loadTurmas() {
        try {
            const response = await fetch('/listarTurmas');
            if (!response.ok) {
                throw new Error('Erro ao carregar turmas.');
            }

            const turmas = await response.json();
            turmaSelect.innerHTML = '<option value="" disabled selected>Selecione uma turma</option>';
            turmas.forEach(turma => {
                const option = document.createElement('option');
                option.value = turma.TurmaID; // Substitua 'id' pelo nome correto da chave retornada pelo backend
                option.textContent = turma.NomeTurma; // Substitua 'nome' pelo nome correto da chave retornada pelo backend
                turmaSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
            alert('Não foi possível carregar as turmas.');
        }
    }

    // Função para carregar eventos do backend
    async function loadEvents() {
        try {
            const response = await fetch('/listar-eventos');
            if (!response.ok) {
                throw new Error('Erro ao carregar eventos.');
            }

            const events = await response.json();
            eventTable.innerHTML = ''; // Limpa a tabela antes de carregar os eventos
            events.forEach(event => {
                addEventToTable(event.NomeEvento, event.DataEvento, event.LocalEvento, event.NomeTurma, event.EventoID);
            });
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
        }
    }

    // Exibir o formulário e esconder a tabela
    addEventButton.addEventListener('click', () => {
        eventForm.style.display = 'block'; // Exibe o formulário
        eventTable.parentElement.style.display = 'none'; // Esconde a tabela
    });

    // Cancelar o formulário e exibir a tabela novamente
    cancelFormButton.addEventListener('click', () => {
        eventForm.reset(); // Reseta os campos do formulário
        eventForm.style.display = 'none'; // Esconde o formulário
        eventTable.parentElement.style.display = 'block'; // Exibe a tabela
    });

    // Enviar o formulário para adicionar o evento
    eventForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value.trim();
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value.trim();
        const turmaId = turmaSelect.value;

        if (!turmaId) {
            alert('Por favor, selecione uma turma.');
            return;
        }

        try {
            const response = await fetch('/adicionarEvento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    NomeEvento: title,
                    DataEvento: date,
                    LocalEvento: location,
                    TurmaID: turmaId,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Erro na requisição:', errorResponse);
                alert(`Erro ao adicionar o evento: ${errorResponse}`);
                return;
            }

            const result = await response.json();
            alert(result.message || 'Evento adicionado com sucesso!');
            addEventToTable(title, date, location, turmaSelect.options[turmaSelect.selectedIndex].text, result.eventoId);
            eventForm.reset();
            eventForm.style.display = 'none';
            eventTable.parentElement.style.display = 'block';
        } catch (error) {
            console.error('Erro ao adicionar evento:', error);
            alert('Erro ao adicionar evento. Tente novamente.');
        }
    });

    // Evento delegado para os botões de deletar
    eventTable.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const eventId = e.target.getAttribute('data-event-id');
            if (eventId) {
                deleteEvent(eventId);
            } else {
                console.error('ID do evento não encontrado!');
            }
        }
    });

    // Função para deletar um evento
    async function deleteEvent(eventId) {
        try {
            const response = await fetch(`/excluirEvento/${eventId}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erro ao excluir o evento.');
            }

            const data = await response.json();
            alert(data.message || 'Evento excluído com sucesso.');
            const row = document.querySelector(`button[data-event-id="${eventId}"]`).closest('tr');
            if (row) row.remove();
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            alert('Erro ao excluir o evento. Tente novamente.');
        }
    }

    // Carregar turmas e eventos ao abrir a página
    loadTurmas();
    loadEvents();
});
