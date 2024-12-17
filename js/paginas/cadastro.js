document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const senha = document.getElementById("senha");
    const confirmarSenha = document.getElementById("confirmar_senha");
    const cpf = document.getElementById("documento");
    const email = document.getElementById("email");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Validações
        if (!validarCamposObrigatorios()) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (!validarEmail(email.value)) {
            alert("Por favor, insira um email válido.");
            email.focus();
            return;
        }

        if (!validarCPF(cpf.value)) {
            alert("CPF inválido. Verifique o número informado.");
            cpf.focus();
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            alert("As senhas não coincidem. Verifique os campos de senha.");
            confirmarSenha.focus();
            return;
        }

        // Caso todas as validações passem, envia o formulário
        alert("Cadastro realizado com sucesso!");
        form.submit();
    });

    function validarCamposObrigatorios() {
        const camposObrigatorios = form.querySelectorAll("input[required], select[required]");
        for (const campo of camposObrigatorios) {
            if (!campo.value.trim()) {
                campo.focus();
                return false;
            }
        }
        return true;
    }

    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0, resto;
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf[10]);
    }
});
