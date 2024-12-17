document.addEventListener("DOMContentLoaded", function() {
    // Adicionar evento
    const addEventBtn = document.querySelector(".add-event");
    addEventBtn.addEventListener("click", function() {
        const title = prompt("Digite o título do evento:");
        const date = prompt("Digite a data e hora do evento (dd/mm/aaaa hh:mm):");
        const location = prompt("Digite o local do evento:");

        if (title && date && location) {
            const tableBody = document.querySelector("table tbody");
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

            // Adicionar evento de edição
            newRow.querySelector(".edit-btn").addEventListener("click", function() {
                const newTitle = prompt("Digite o novo título do evento:", title);
                const newDate = prompt("Digite a nova data e hora do evento:", date);
                const newLocation = prompt("Digite o novo local do evento:", location);

                if (newTitle && newDate && newLocation) {
                    newRow.querySelector("td:nth-child(1)").textContent = newTitle;
                    newRow.querySelector("td:nth-child(2)").textContent = newDate;
                    newRow.querySelector("td:nth-child(3)").textContent = newLocation;
                }
            });

            // Adicionar evento de exclusão
            newRow.querySelector(".delete-btn").addEventListener("click", function() {
                if (confirm("Tem certeza de que deseja excluir este evento?")) {
                    tableBody.removeChild(newRow);
                }
            });

            // Adicionar a nova linha na tabela
            tableBody.appendChild(newRow);
        } else {
            alert("Todos os campos são obrigatórios!");
        }
    });

    // Eventos de edição e exclusão nos eventos existentes
    const existingEvents = document.querySelectorAll("table tbody tr");
    existingEvents.forEach(function(row) {
        // Edição
        row.querySelector(".edit-btn").addEventListener("click", function() {
            const title = row.querySelector("td:nth-child(1)").textContent;
            const date = row.querySelector("td:nth-child(2)").textContent;
            const location = row.querySelector("td:nth-child(3)").textContent;

            const newTitle = prompt("Digite o novo título do evento:", title);
            const newDate = prompt("Digite a nova data e hora do evento:", date);
            const newLocation = prompt("Digite o novo local do evento:", location);

            if (newTitle && newDate && newLocation) {
                row.querySelector("td:nth-child(1)").textContent = newTitle;
                row.querySelector("td:nth-child(2)").textContent = newDate;
                row.querySelector("td:nth-child(3)").textContent = newLocation;
            }
        });

        // Exclusão
        row.querySelector(".delete-btn").addEventListener("click", function() {
            if (confirm("Tem certeza de que deseja excluir este evento?")) {
                row.remove();
            }
        });
    });
});
