document.addEventListener('DOMContentLoaded', () => {
    const formInicial = document.getElementById('form-inicial');
    
    formInicial.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obter valores dos campos do formulário
        const anoEdicao = document.getElementById('anoEdicao').value;
        const nomeProjeto = document.getElementById('nomeProjeto').value;
        const local = document.getElementById('local').value;

        // Validação básica com expressões regulares
        if (!/^\d{4}$/.test(anoEdicao)) {
            alert('Por favor, insira um ano válido (ex: 2025).');
            return;
        }

        if (nomeProjeto.length < 3 || local.length < 3) {
            alert('Por favor, insira um nome e local válidos com pelo menos 3 caracteres.');
            return;
        }

        // Simular envio ou redirecionar para a próxima etapa
        alert(`Projeto "${nomeProjeto}" no local "${local}" do ano "${anoEdicao}" cadastrado com sucesso!`);

        // Simulação de redirecionamento
        window.location.href = 'cadastrarTurmas'; // Substitua pela URL correta
    });
});

