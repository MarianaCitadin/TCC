document.addEventListener("DOMContentLoaded", function() {
    
    // Exemplo de função para simular o download
    const downloadLinks = document.querySelectorAll('a[download]');

    // Adiciona evento para cada link de download
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const fileName = event.target.textContent; // Obtém o nome do arquivo clicado
            alert(`Iniciando o download de: ${fileName}`);
        });
    });

    // Função para aplicar um filtro por título
    const filterInput = document.querySelector("#filter-input");

    if (filterInput) {
        filterInput.addEventListener("input", function() {
            const filterValue = filterInput.value.toLowerCase();
            const rows = document.querySelectorAll("table tbody tr");

            rows.forEach(row => {
                const titleCell = row.cells[0]; // Título da atividade
                const titleText = titleCell.textContent || titleCell.innerText;

                // Se o título não corresponder ao filtro, esconde a linha
                if (titleText.toLowerCase().includes(filterValue)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }
});
