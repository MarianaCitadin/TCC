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
// Realizando a requisição para obter os materiais (dados)
fetch('/materiais')
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK, lança um erro
            throw new Error('Erro ao carregar os materiais');
        }
        return response.json(); // Converte a resposta em JSON
    })
    .then(data => {
        console.log('Materiais:', data);
        // Aqui você pode manipular os dados recebidos, por exemplo, exibindo-os na página
        if (data.success) {
            const materiaisList = document.getElementById('materiais-list');
            data.data.forEach(materiais => {
                const li = document.createElement('li');
                li.textContent = `Nome do arquivo: ${materiais.NomeArquivo}, Tipo: ${materiais.TipoArquivo}`;
                materiaisList.appendChild(li);
            });
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao carregar materiais');
    });