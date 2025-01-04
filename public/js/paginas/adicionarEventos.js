document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.querySelector('.add-event');
    const eventForm = document.getElementById('eventForm');
    const eventTable = document.querySelector('table tbody');
    const cancelFormButton = document.getElementById('cancelForm');

    // Função para adicionar um evento à tabela
    function addEventToTable(title, date, location) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${title}</td>
            <td>${date}</td>
            <td>${location}</td>
        `;
        eventTable.appendChild(newRow);
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

        // Enviar os dados ao backend
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
            addEventToTable(title, date, location);

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
});
