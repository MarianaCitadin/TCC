document.addEventListener("DOMContentLoaded", function() {

    // Função para validar o login
    function validateLogin(event) {
        event.preventDefault(); // Impede o envio do formulário para validação manual

        // Obter os valores dos campos
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;

        // Mensagens de erro
        const usernameError = document.querySelector("#username-error");
        const passwordError = document.querySelector("#password-error");

        // Resetando mensagens de erro
        usernameError.textContent = "";
        passwordError.textContent = "";

        let isValid = true;

        // Validação para o campo de usuário
        if (username === "") {
            usernameError.textContent = "O campo Usuário é obrigatório.";
            isValid = false;
        }

        // Validação para o campo de senha
        if (password === "") {
            passwordError.textContent = "O campo Senha é obrigatório.";
            isValid = false;
        }

        // Caso a validação seja bem-sucedida, pode-se proceder com o login (neste exemplo, é apenas um alert)
        if (isValid) {
            alert(`Login bem-sucedido!\nUsuário: ${username}`);
            // Aqui você pode implementar a lógica para realizar a autenticação no servidor
            // Como por exemplo, fazer uma requisição AJAX ou redirecionar para outra página
            // window.location.href = 'dashboard.html'; // Exemplo de redirecionamento
        }
    }

    // Adicionar evento de submit ao formulário de login
    const form = document.querySelector('form');
    form.addEventListener('submit', validateLogin);
});
