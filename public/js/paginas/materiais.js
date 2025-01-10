
// Função para carregar materiais do backend
function loadMaterials() {
    fetch('/api/materiais') // Corrigido nome da rota
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar materiais');
            }
            return response.json();
        })
        .then(materials => {
            console.log(materials); // Exibe os materiais carregados no console

            const tableBody = document.getElementById('materials-table-body');
            tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos materiais

            if (materials.length > 0) {
                materials.forEach(material => {
                    addMaterialToTable(
                        material.NomeArquivo,
                        material.Descricao,
                        material.DataRegistro,
                        material.AudiovisualID
                    );
                });
            } else {
                console.log('Nenhum material encontrado');
                document.getElementById('message').textContent = 'Nenhum material encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro ao carregar materiais:', error);
        });
}

// Função para adicionar cada material à tabela
function addMaterialToTable(nomeArquivo, descricao, dataRegistro, id) {
    const tableBody = document.getElementById('materials-table-body'); // Certifique-se de que este ID existe no HTML
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${nomeArquivo}</td>
        <td>${descricao}</td>
        <td>${new Date(dataRegistro).toLocaleDateString()}</td>
        <td><a href="/uploads/${nomeArquivo}" target="_blank">Baixar</a></td>
    `;

    tableBody.appendChild(row);
}

// Função para filtrar materiais
function filterMaterials(event) {
    const query = event.target.value.toLowerCase(); // Obtém o valor do input e transforma em minúsculas
    const rows = document.querySelectorAll('#materials-table-body tr'); // Todas as linhas da tabela

    rows.forEach(row => {
        const titleCell = row.querySelector('td:first-child'); // A primeira célula da linha (Título)
        const title = titleCell ? titleCell.textContent.toLowerCase() : ''; // Obtém o título e converte para minúsculas

        // Verifica se o título contém a consulta
        if (title.includes(query)) {
            row.style.display = ''; // Exibe a linha
        } else {
            row.style.display = 'none'; // Esconde a linha
        }
    });
}

// Carregar materiais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadMaterials();
    // Adiciona o evento de filtro ao campo de pesquisa
    document.getElementById('filter-input').addEventListener('input', filterMaterials);
});
