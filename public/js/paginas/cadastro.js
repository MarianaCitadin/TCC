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
        if (estado.length > 2) {
            return res.status(400).send('O campo "Estado" deve conter no máximo 2 caracteres.');
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



        // Máscaras de CPF e Telefone
        document.getElementById('documento').addEventListener('input', function(event) {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
            }
            event.target.value = value;
        });

        document.getElementById('fone').addEventListener('input', function(event) {
            let value = event.target.value.replace(/\D/g, '');
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            }
            event.target.value = value;
        });
    