document.addEventListener("DOMContentLoaded", function () {
    // Função para formatar a data
    function formatarData(data) {
        if (!data) return "Data não informada";
        const dateObj = new Date(data);
        const dia = String(dateObj.getDate()).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
        const ano = dateObj.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para buscar os dados completos do usuário e exibir no modal
    function buscarDetalhesUsuario(usuarioId) {
        fetch(`/usuario/${usuarioId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao buscar usuário: ${response.statusText}`);
                }
                return response.json();
            })
            .then(usuario => {
                // Preencher os dados no modal
                document.getElementById("modal-nome").textContent = usuario.Nome || "Não informado";
                document.getElementById("modal-nascimento").textContent = formatarData(usuario.DataNascimento) || "Não informado";
                document.getElementById("modal-documento").textContent = usuario.Documento || "Não informado";
                document.getElementById("modal-genero").textContent = usuario.Genero || "Não informado";
                document.getElementById("modal-telefone").textContent = usuario.Telefone || "Não informado";
                document.getElementById("modal-email").textContent = usuario.Email || "Não informado";
                document.getElementById("modal-endereco").textContent = usuario.Logradouro
                    ? `${usuario.Logradouro}, ${usuario.Numero || "S/N"}, ${usuario.Bairro || ""}, ${usuario.Cidade || ""}, ${usuario.Estado || ""}, ${usuario.CEP || ""}`
                    : "Endereço não informado";

                // Exibir o modal
                document.getElementById("modal").style.display = "block";
            })
            .catch(error => {
                console.error("Erro ao buscar os detalhes do usuário:", error);
                alert("Erro ao carregar os detalhes do usuário. Tente novamente.");
            });
    }

    // Fechar o modal ao clicar no "X"
    document.getElementById("modal-close").addEventListener("click", () => {
        document.getElementById("modal").style.display = "none";
    });

    // Fechar o modal ao clicar fora do conteúdo
    window.addEventListener("click", function (event) {
        const modal = document.getElementById("modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Carregar usuários agrupados por categoria
    fetch("/usuarios")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar usuários: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const categoriasContainer = document.querySelector("#usuarios-categorias");

            Object.keys(data).forEach(categoriaId => {
                const categoria = data[categoriaId];

                // Criar a seção de categoria
                const categoriaSection = document.createElement("section");
                categoriaSection.classList.add("categoria");

                const categoriaTitle = categoriaId === "1" ? "Alunos" : categoriaId === "2" ? "Professores" : `Categoria ${categoriaId}`;
                categoriaSection.innerHTML = `<h2>${categoriaTitle}</h2>`;

                // Criar a tabela para a categoria
                const table = document.createElement("table");
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

                // Adicionar usuários na tabela
                const tbody = table.querySelector("tbody");
                categoria.forEach(usuario => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${usuario.Nome || "Não informado"}</td>
                        <td>${usuario.Email || "Não informado"}</td>
                        <td>${usuario.Telefone || "Não informado"}</td>
                        <td><button class="btn-ver-dados" data-id="${usuario.UsuarioID}">Ver Dados</button></td>
                    `;
                    tbody.appendChild(row);
                });

                // Adicionar tabela à categoria
                categoriaSection.appendChild(table);
                categoriasContainer.appendChild(categoriaSection);
            });

            // Associar eventos aos botões "Ver Dados"
            document.querySelectorAll(".btn-ver-dados").forEach(button => {
                button.addEventListener("click", function () {
                    const usuarioId = this.getAttribute("data-id");
                    buscarDetalhesUsuario(usuarioId);
                });
            });
        })
        .catch(error => {
            console.error("Erro ao carregar os dados dos usuários:", error);
            alert("Erro ao carregar os usuários. Tente novamente mais tarde.");
        });
});
