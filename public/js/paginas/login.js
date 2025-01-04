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


document.addEventListener("DOMContentLoaded", () => {
  let attempts = 0; // Contador de tentativas
  const maxAttempts = 3; // Número máximo de tentativas permitidas

  const loginButton = document.getElementById("login-button");
  const recoverButton = document.getElementById("recover-button");

  loginButton.addEventListener("click", () => {
    const password = document.getElementById("password").value;

    // Simulação de validação de senha (substitua conforme a lógica do seu sistema)
    const correctPassword = "12345"; // Exemplo de senha correta

    if (password === correctPassword) {
      alert("Login bem-sucedido!");
      attempts = 0; // Reinicia o contador de tentativas
    } else {
      attempts++;
      alert(`Senha incorreta! Você tem ${maxAttempts - attempts} tentativa(s) restante(s).`);

      if (attempts >= maxAttempts) {
        recoverButton.style.display = "block"; // Mostra o botão de "Recuperar Senha"
        loginButton.disabled = true; // Opcional: desabilita o botão "Entrar"
        alert("Você excedeu o número de tentativas. Clique em 'Recuperar Senha'.");
      }
    }
  });

  recoverButton.addEventListener("click", () => {
    alert("Inicie o processo de recuperação de senha.");
    // Aqui você pode redirecionar o usuário para uma página de recuperação de senha
  });
});
