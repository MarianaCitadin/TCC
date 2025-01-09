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

// Carregar materiais ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadMaterials();
});
