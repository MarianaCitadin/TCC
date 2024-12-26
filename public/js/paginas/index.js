// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {

    // Animação de boas-vindas com a imagem e o título
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    // Função para adicionar a animação de fade-in nos elementos
    function fadeIn() {
        leftSide.style.opacity = '0';
        rightSide.style.opacity = '0';
        setTimeout(() => {
            leftSide.style.transition = 'opacity 1s ease';
            rightSide.style.transition = 'opacity 1s ease';
            leftSide.style.opacity = '1';
            rightSide.style.opacity = '1';
        }, 200);
    }

    
    document.addEventListener("DOMContentLoaded", () => {
        const userName = "João"; // Pode vir de um backend ou banco de dados
        const userGreeting = document.querySelector(".user-greeting");
        userGreeting.textContent = `Olá, ${userName}!`;
    });
    

    // Chama a animação de fade-in assim que a página for carregada
    fadeIn();

    // Efeito de animação de hover para os botões
    const menuButtons = document.querySelectorAll('.menu-btn');

    menuButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s';
        });

        button.addEventListener('mouseleave', function () {
            button.style.transform = 'scale(1)';
        });
    });

});
