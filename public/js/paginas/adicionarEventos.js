document.addEventListener("DOMContentLoaded", function() {
    const addEventBtn = document.querySelector(".add-event");
    const eventForm = document.createElement('form');
    eventForm.innerHTML = `
        <label for="title">Título do Evento:</label>
        <input type="text" id="title" required><br>
        <label for="date">Data e Hora:</label>
        <input type="text" id="date" required><br>
        <label for="location">Local:</label>
        <input type="text" id="location" required><br>
        <button type="submit">Adicionar</button>
        <button type="button" class="cancel">Cancelar</button>
    `;
    eventForm.style.display = 'none'; // Inicialmente escondido
    document.body.appendChild(eventForm);

    let editingRow = null; // Variável para armazenar a linha sendo editada

    // Exibir formulário ao clicar no botão "Adicionar Evento"
    addEventBtn.addEventListener("click", function() {
        eventForm.style.display = 'block'; // Exibir o formulário
        editingRow = null; // Garantir que não há linha sendo editada ao adicionar evento
        eventForm.reset(); // Limpar o formulário
    });

    // Cancelar adição ou edição do evento
    eventForm.querySelector('.cancel').addEventListener("click", function() {
        eventForm.style.display = 'none'; // Esconder o formulário
        editingRow = null; // Garantir que a edição seja cancelada
    });

    // Adicionar evento ao submeter o formulário
    eventForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.querySelector("#title").value;
        const date = document.querySelector("#date").value;
        const location = document.querySelector("#location").value;

        if (title && date && location) {
            const tableBody = document.querySelector("table tbody");

            if (editingRow) {
                // Se estiver editando, atualiza os valores na tabela
                editingRow.querySelector("td:nth-child(1)").textContent = title;
                editingRow.querySelector("td:nth-child(2)").textContent = date;
                editingRow.querySelector("td:nth-child(3)").textContent = location;
                editingRow = null; // Limpa a referência após a edição
            } else {
                // Se não estiver editando, adiciona um novo evento
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <td>${title}</td>
                    <td>${date}</td>
                    <td>${location}</td>
                    <td>
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Excluir</button>
                    </td>
                `;

                // Adicionar eventos de edição e exclusão
                newRow.querySelector(".edit-btn").addEventListener("click", function() {
                    openEditForm(newRow);
                });

                newRow.querySelector(".delete-btn").addEventListener("click", function() {
                    if (confirm("Tem certeza de que deseja excluir este evento?")) {
                        tableBody.removeChild(newRow);
                    }
                });

                tableBody.appendChild(newRow);
            }

            eventForm.style.display = 'none'; // Esconder o formulário
            eventForm.reset(); // Limpar o formulário
        } else {
            alert("Todos os campos são obrigatórios!");
        }
    });

    // Função para abrir o formulário de edição com os dados já preenchidos
    function openEditForm(row) {
        const title = row.querySelector("td:nth-child(1)").textContent;
        const date = row.querySelector("td:nth-child(2)").textContent;
        const location = row.querySelector("td:nth-child(3)").textContent;

        // Preenche os campos do formulário com os dados do evento
        document.querySelector("#title").value = title;
        document.querySelector("#date").value = date;
        document.querySelector("#location").value = location;

        // Define a linha que está sendo editada
        editingRow = row;

        // Exibe o formulário
        eventForm.style.display = 'block';
    }

    // Inicializar eventos de edição e exclusão nos eventos existentes
    const existingEvents = document.querySelectorAll("table tbody tr");
    existingEvents.forEach(function(row) {
        row.querySelector(".edit-btn").addEventListener("click", function() {
            openEditForm(row); // Abre o formulário com os dados preenchidos
        });

        row.querySelector(".delete-btn").addEventListener("click", function() {
            if (confirm("Tem certeza de que deseja excluir este evento?")) {
                row.remove();
            }
        });
    });
});
