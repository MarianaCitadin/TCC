const Login = require('../models/loginModel');

const loginController = {
    renderLoginForm: (req, res) => {
        res.sendFile('views/login.html', { root: '.' }); // Envia o arquivo HTML do formulário de login
    },

    processLogin: (req, res) => {
        const { username, password } = req.body;

        Login.authenticate(username, password, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!user) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            req.session.user = user; // Exemplo de uso de sessão
            res.redirect('/dashboard');
        });
    },

    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/login');
        });
    },

    renderRecoverForm: (req, res) => {
        res.sendFile('views/login/recover.html', { root: '.' }); // Envia o arquivo HTML do formulário de recuperação
    },

    processRecover: (req, res) => {
        const { email } = req.body;

        Login.recoverPassword(email, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            res.json({ message: 'Instruções para recuperação enviadas ao email informado' });
        });
    },
};

module.exports = loginController;
