document.addEventListener("DOMContentLoaded", function() {

    // Função para editar um usuário
    function editUser(event) {
        const row = event.target.closest('tr');
        const userName = row.querySelector('td:nth-child(1)').innerText;
        const userEmail = row.querySelector('td:nth-child(2)').innerText;
        const userPhone = row.querySelector('td:nth-child(3)').innerText;

        // Aqui você pode adicionar o código para abrir um modal de edição ou redirecionar para uma página de edição
        alert(`Editar Usuário: \nNome: ${userName} \nEmail: ${userEmail} \nTelefone: ${userPhone}`);
    }

    // Função para excluir um usuário
    function deleteUser(event) {
        const row = event.target.closest('tr');
        const userName = row.querySelector('td:nth-child(1)').innerText;

        const confirmation = confirm(`Tem certeza que deseja excluir o usuário: ${userName}?`);
        if (confirmation) {
            row.remove();
            alert(`Usuário ${userName} excluído com sucesso!`);
        }
    }

    // Adicionando eventos aos botões de editar e excluir
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', editUser);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteUser);
    });
});

        // Função para formatar a data no formato DD/MM/YYYY
        function formatarData(data) {
            const dateObj = new Date(data);
            const dia = String(dateObj.getDate()).padStart(2, '0');
            const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
            const ano = dateObj.getFullYear();

            return `${dia}/${mes}/${ano}`;
        }

        // Função para formatar a data e hora no formato DD/MM/YYYY HH:MM:SS
        function formatarDataHora(data) {
            const dateObj = new Date(data);
            return dateObj.toLocaleString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        }

        // Função para buscar os dados dos usuários agrupados por categoria via AJAX
        fetch('/usuarios')
            .then(response => response.json())
            .then(data => {
                const categoriasContainer = document.querySelector('#usuarios-categorias');
                
                // Iterar sobre cada categoria (id da categoria)
                Object.keys(data).forEach(categoriaId => {
                    const categoria = data[categoriaId];
                    
                      // Criar a seção de categoria
            const categoriaSection = document.createElement('section');
            categoriaSection.classList.add('categoria');
            
            // Alterar título de acordo com o id da categoria
            const categoriaTitle = categoriaId === '1' ? 'Alunos' : categoriaId === '2' ? 'Professores' : `Categoria ${categoriaId}`;
            
            categoriaSection.innerHTML = `<h2>${categoriaTitle}</h2>`; // Definir o título
                    
                    // Criar a tabela para essa categoria
                    const table = document.createElement('table');
                    table.innerHTML = `
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    `;
                    
                    // Adicionar os usuários dessa categoria
                    const tbody = table.querySelector('tbody');
                    categoria.forEach(usuario => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${usuario.Nome}</td>
                            <td>${usuario.Email}</td>
                            <td>${usuario.Telefone}</td>
                            <td><button class="btn-ver-dados" data-id="${usuario.UsuarioID}">Ver Dados</button></td>
                        `;
                        tbody.appendChild(row);
                    });

                    // Adicionar a tabela à seção da categoria
                    categoriaSection.appendChild(table);
                    categoriasContainer.appendChild(categoriaSection);
                });

                // Adicionar evento de clique nos botões "Ver Dados"
                document.querySelectorAll('.btn-ver-dados').forEach(button => {
                    button.addEventListener('click', function() {
                        const usuarioId = this.getAttribute('data-id');
                        buscarDetalhesUsuario(usuarioId);
                    });
                });

            })
            .catch(error => {
                console.error('Erro ao carregar os dados dos usuários:', error);
            });

        // Função para buscar os dados completos do usuário e exibir no modal
        function buscarDetalhesUsuario(usuarioId) {
            fetch(`/usuario/${usuarioId}`)
                .then(response => response.json())
                .then(usuario => {
                    // Preencher os dados no modal
                    document.getElementById('modal-nome').textContent = usuario.Nome;
                    document.getElementById('modal-nascimento').textContent = formatarData(usuario.DataNascimento);
                    document.getElementById('modal-documento').textContent = usuario.Documento;
                    document.getElementById('modal-genero').textContent = usuario.Genero;
                    document.getElementById('modal-telefone').textContent = usuario.Telefone;
                    document.getElementById('modal-email').textContent = usuario.Email;
                    document.getElementById('modal-endereco').textContent = `${usuario.Logradouro}, ${usuario.Numero}, ${usuario.Bairro}, ${usuario.Cidade}, ${usuario.Estado}, ${usuario.CEP}`;

                    // Exibir o modal
                    document.getElementById('modal').style.display = 'block';
                })
                .catch(error => {
                    console.error('Erro ao buscar os detalhes do usuário:', error);
                });
        }

        // Fechar o modal quando clicar no "X"
        document.getElementById('modal-close').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });

        // Fechar o modal quando clicar fora da caixa de conteúdo
        window.onclick = function(event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    