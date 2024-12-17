// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {

    // Animação de fade-in para a página
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');

    // Função para aplicar fade-in
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

        // Função para alertar quando o botão é clicado (caso necessário)
        button.addEventListener('click', function () {
            alert(`Você está indo para a página: ${button.innerText}`);
        });
    });
});
