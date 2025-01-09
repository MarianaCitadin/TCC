document.addEventListener('DOMContentLoaded', () => {
    const formInicial = document.getElementById('form-inicial');

    formInicial.addEventListener('submit', (event) => {
        event.preventDefault();

        // Obter valores dos campos do formulário
        const anoEdicao = document.getElementById('anoEdicao').value.trim();
        const nomeProjeto = document.getElementById('nomeProjeto').value.trim();
        const local = document.getElementById('local').value.trim();

        // Adicionar log para verificar os dados antes de enviar
        console.log({
            NomeProjeto: nomeProjeto,
            AnoEdicao: anoEdicao,
            Local: local
        });

        // Validação
        if (!/^\d{4}$/.test(anoEdicao)) {
            alert('Por favor, insira um ano válido (ex: 2025).');
            return;
        }

        if (nomeProjeto.length < 3) {
            alert('O nome do projeto deve ter pelo menos 3 caracteres.');
            return;
        }

        if (local.length < 3) {
            alert('O local deve ter pelo menos 3 caracteres.');
            return;
        }

        // Dados para envio
        const payload = {
            NomeProjeto: nomeProjeto,
            AnoEdicao: anoEdicao,
            Local: local
        };

        // Enviar requisição
        fetch('/projeto/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errMsg => {
                    throw new Error(errMsg || 'Erro ao cadastrar o projeto.');
                });
            }
            alert(`Projeto "${nomeProjeto}" cadastrado com sucesso!`);
            window.location.href = '/cadastrarTurmas';
        })
        .catch(error => {
            console.error('Erro ao cadastrar o projeto:', error.message);
            alert('Ocorreu um erro ao cadastrar o projeto. Tente novamente.');
        });
    });
});
