document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.querySelector('.add-event');
    const eventForm = document.getElementById('eventForm');
    const eventTable = document.querySelector('table tbody');
    const cancelFormButton = document.getElementById('cancelForm');

    // Função para formatar a data de ISO para dd/mm/yyyy hh:mm
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    // Função para adicionar um evento à tabela
    function addEventToTable(title, date, location, eventId) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${formatDate(date)}</td> <!-- Formatar a data aqui -->
            <td>${location}</td>
            <td><button class="delete-btn" data-event-id="${eventId}">Deletar</button></td>
        `;
        eventTable.appendChild(newRow);
    }

    // Função para carregar eventos do backend
    function loadEvents() {
        fetch('/eventos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar eventos.');
                }
                return response.json();
            })
            .then(events => {
                events.forEach(event => {
                    addEventToTable(event.NomeEvento, event.DataEvento, event.LocalEvento, event.EventoID);
                });
            })
            .catch(error => console.error('Erro ao carregar eventos:', error));
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

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;

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
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar o evento.');
            }

            const result = await response.json();
            console.log(result.message); // Loga a mensagem de sucesso do backend

            // Adiciona o evento à tabela
            addEventToTable(title, date, location, result.eventoId);

            // Limpar os campos do formulário
            eventForm.reset();

            // Esconder o formulário e exibir a tabela
            eventForm.style.display = 'none';
            eventTable.parentElement.style.display = 'block';

        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao salvar o evento. Tente novamente.');
        }
    });

    // Função para deletar um evento
    function deleteEvent(eventId) {
        fetch(`/excluirEvento/${eventId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    // Remover o evento da tabela
                    const row = document.querySelector(`button[data-event-id="${eventId}"]`).closest('tr');
                    row.remove();
                }
            })
            .catch(error => {
                console.error('Erro ao excluir evento:', error);
                alert('Erro ao excluir o evento. Tente novamente.');
            });
    }

    // Delegate event listener for delete buttons
    eventTable.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-btn')) {
            const eventId = e.target.getAttribute('data-event-id');
            deleteEvent(eventId);
        }
    });

    // Carregar os eventos ao abrir a página
    loadEvents();
});

document.addEventListener('DOMContentLoaded', () => {
    const showFormBtn = document.getElementById('showFormBtn');
    const eventForm = document.getElementById('eventForm');
    const cancelFormBtn = document.getElementById('cancelForm');

    // Mostrar o formulário quando clicar no botão "Adicionar Evento"
    showFormBtn.addEventListener('click', () => {
        eventForm.style.display = 'block';
        showFormBtn.style.display = 'none';
});
})
