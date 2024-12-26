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
