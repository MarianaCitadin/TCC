const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const loginRoutes = require('./routes/loginRoutes');
const app = express();

// Serve arquivos estáticos das pastas 'css', 'js' e 'imagens'
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'imagens')));

// Configurações básicas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'sua_chave_secreta',
        resave: false,
        saveUninitialized: true,
    })
);

// Middleware de autenticação
function ensureAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
}

// Rotas
app.use('/login', loginRoutes);

// Rota para o login (corrigido para servir o arquivo index.html corretamente)
app.get('/', (req, res) => {
    res.redirect('/login'); // Redireciona para o login
});

// Rota protegida
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'dashboard.html')); // Envia o arquivo HTML da dashboard
});

// Erro 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
