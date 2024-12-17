// Script para confirmação de saída
document.addEventListener('DOMContentLoaded', function() {
    const sairButton = document.querySelector('nav ul li a[href="#"]'); // Seleciona o botão "Sair"

    if (sairButton) {
        sairButton.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação para a URL "#"
            const confirmacao = confirm("Você tem certeza que deseja sair?");
            
            if (confirmacao) {
                // Lógica para sair da sessão (por exemplo, redirecionamento para página de login)
                window.location.href = "login.html"; // Redireciona para a página de login (ajuste conforme necessário)
            }
        });
    }
});
