document.addEventListener('DOMContentLoaded', () => {
    const eventTable = document.querySelector('table tbody');

    // Função para formatar a data de ISO para dd/mm/yyyy
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`; // Retorna no formato dd/mm/yyyy
    }

    // Função para adicionar um evento à tabela
    function addEventToTable(title, date, location, eventId) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${formatDate(date)}</td>
            <td>${location}</td>
            <td><button class="delete-btn" data-event-id="${eventId}">Deletar</button></td>
        `;
        eventTable.appendChild(newRow);

        // Adicionando evento de deletação ao botão
        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            deleteEvent(eventId);
        });
    }

    // Função para carregar eventos do backend
    function loadEvents() {
        fetch('/api/eventos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar eventos');
            }
            return response.json();
        })
        .then(events => {
            console.log(events); // Aqui você pode ver os eventos carregados
            if (events.length > 0) {
                events.forEach(event => {
                    addEventToTable(event.NomeEvento, event.DataEvento, event.LocalEvento, event.EventoID);
                });
            } else {
                console.log('Nenhum evento encontrado');
            }
        })
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
        });
    
    }

    // Carregar os eventos ao abrir a página
    loadEvents();
});
