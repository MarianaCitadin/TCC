// Script para rolagem suave ao clicar nos links para as seções
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Impede o comportamento padrão de navegação do link
            const targetId = link.getAttribute("href").substring(1); // Obtém o ID do destino
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Desce a página para o topo da seção
                    behavior: "smooth" // Rolagem suave
                });
            }
        });
    });
});
