document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('password-reset-form');

    // Processar envio do formulário
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (!email || !senha || !confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Tente novamente.');
            return;
        }

        try {
            const response = await fetch('/api/recuperar-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, novaSenha: senha }),  // Garantir que a senha correta seja enviada
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                window.location.href = '/';
            } else {
                alert(data.message || 'Erro ao alterar senha.');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar ao servidor.');
        }
    });
});
