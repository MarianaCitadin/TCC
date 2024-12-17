// Selecionar os elementos do formulário
const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Função para validar o telefone
function validatePhone(phone) {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
}

// Função para validar o formulário antes de enviar
function validateForm(event) {
    event.preventDefault(); // Previne o envio do formulário

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();

    // Verifica se todos os campos estão preenchidos
    if (!username || !email || !phone) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verifica se o e-mail é válido
    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    // Verifica se o telefone é válido
    if (!validatePhone(phone)) {
        alert('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.');
        return;
    }

    // Exibe uma mensagem de sucesso e envia o formulário
    alert('Informações salvas com sucesso!');
    form.submit();
}

// Adicionar evento de envio ao formulário
form.addEventListener('submit', validateForm);
