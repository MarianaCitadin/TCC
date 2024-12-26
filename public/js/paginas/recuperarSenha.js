document.addEventListener('DOMContentLoaded', function () {
    
    // Variáveis para os campos de senha e ícones de exibição
    const togglePassword1 = document.querySelectorAll('.toggle-password')[0];
    const togglePassword2 = document.querySelectorAll('.toggle-password')[1];
    const senhaField = document.getElementById('senha');
    const confirmarSenhaField = document.getElementById('confirmar-senha');
    const form = document.querySelector('form');
    
    // Função para alternar a visibilidade da senha
    function togglePasswordVisibility(inputField, toggleIcon) {
        toggleIcon.addEventListener('click', function () {
            // Verifica o tipo do campo e altera entre "password" e "text"
            const type = inputField.type === "password" ? "text" : "password";
            inputField.type = type;
            
            // Altera a imagem do ícone de olho (ocultar/exibir)
            toggleIcon.style.backgroundImage = type === "password" 
                ? "url('eye-icon.png')" 
                : "url('eye-slash-icon.png')";
        });
    }

    // Chamando a função de alternância de visibilidade de senha para ambos os campos
    togglePasswordVisibility(senhaField, togglePassword1);
    togglePasswordVisibility(confirmarSenhaField, togglePassword2);

    // Função para validar o formulário antes de submeter
    form.addEventListener('submit', function(event) {
        // Impede o envio do formulário se as senhas não coincidirem
        if (senhaField.value !== confirmarSenhaField.value) {
            event.preventDefault();
            alert("As senhas não coincidem. Tente novamente.");
        } else {
            alert("Senha alterada com sucesso!");
        }
    });
});
