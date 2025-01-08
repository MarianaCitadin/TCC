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

        // Criar um objeto com os dados para envio
        const formData = new FormData();
        formData.append('AnoEdicao', anoEdicao);
        formData.append('NomeProjeto', nomeProjeto);
        formData.append('Local', local);

        // Enviar os dados para o backend usando fetch
       
        fetch('/projeto/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                AnoEdicao: anoEdicao,
                NomeProjeto: nomeProjeto,
                Local: local
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar o projeto.');
            }
            alert(`Projeto "${nomeProjeto}" cadastrado com sucesso!`);
            window.location.href = '/cadastrarTurmas';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao cadastrar o projeto. Tente novamente.');
        });
        
    });
});
