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

    // Busca o nome do usuário no backend e exibe na página
    function loadUserName() {
        fetch('/usuario/dados')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados do usuário.');
                }
                return response.json();
            })
            .then(data => {
                const userGreeting = document.querySelector(".user-greeting");
                if (userGreeting) {
                    userGreeting.textContent = `Olá, ${data.nome || 'Usuário'}!`;
                }
            })
            .catch(error => {
                console.error('Erro ao carregar o nome do usuário:', error);
            });
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
    });

    // Carrega o nome do usuário dinamicamente
    loadUserName();
});
