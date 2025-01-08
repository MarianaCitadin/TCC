document.addEventListener('DOMContentLoaded', () => {
    fetch('/usuario/dados')
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar dados do usuário.');
            return response.json();
        })
        .then(data => {
            // Formatar a data de nascimento
            const birthdate = new Date(data.dataNascimento);
            const formattedBirthdate = `${birthdate.getDate().toString().padStart(2, '0')}/${(birthdate.getMonth() + 1).toString().padStart(2, '0')}/${birthdate.getFullYear()}`;
            
            // Atualiza os elementos da página com os dados do usuário
            document.getElementById('user-name').textContent = data.nome;
            document.getElementById('user-email').textContent = data.email;
            document.getElementById('user-birthdate').textContent = formattedBirthdate;
            document.getElementById('user-phone').textContent = data.telefone;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao carregar dados do usuário.');
        });
});
