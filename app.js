const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const app = express();

// Configuração de sessão
app.use(session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `true` em produção com HTTPS
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M@riC2804',
    database: 'clicandonaterceiraidade'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

// Middleware de autenticação
function verificarAutenticacao(req, res, next) {
    if (req.session.usuario) {
        
        return next();
    }
    return res.redirect('/');
}

// Rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/index', verificarAutenticacao, (req, res) => {
    
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/index2', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index2.html'));
});

app.get('/usuario', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario.html'));
});



app.get('/usuario/dados', verificarAutenticacao, (req, res) => {
    const { id } = req.session.usuario;
    const query = `SELECT Nome, Email, DataNascimento, Telefone FROM tbusuario WHERE UsuarioId = ?`;
    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados do usuário:', err);
            return res.status(500).json({ error: 'Erro ao buscar dados do usuário.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const { Nome, Email, DataNascimento, Telefone } = results[0];
        res.json({ nome: Nome, email: Email, dataNascimento: DataNascimento, telefone: Telefone });
    });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = `SELECT categoriaID, Nome, UsuarioID FROM tbusuario WHERE Email = ? AND Senha = ?`;
    db.execute(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).send('Erro interno do servidor.');
        }

        if (results.length === 0) {
            return res.status(401).send('Credenciais inválidas.');
        }

        const { categoriaID, Nome, UsuarioID } = results[0];
        req.session.usuario = { nome: Nome, categoriaID, id: UsuarioID };

        if (categoriaID == '1') {
            res.redirect('/index');
        } else if (categoriaID == '2') {
            res.redirect('/index2');
        } else {
            res.status(400).send('Categoria inválida.');
        }
    });
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});


app.post('/submit_form', (req, res) => {
    const { nome, data_nascimento, documento, genero, fone, estado, cidade, bairro, rua, numero, categoria, email, senha } = req.body;
    const categoriaID = categoria === 'Aluno' ? 1 : 2;

    const query = `
        INSERT INTO tbusuario
        (Nome, DataNascimento, Documento, Genero, Telefone, Estado, Cidade, Bairro, Logradouro, Numero, CategoriaID, Email, Senha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [nome, data_nascimento, documento, genero, fone, estado, cidade, bairro, rua, numero, categoriaID, email, senha];

    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            return res.status(500).send('Erro ao salvar no banco de dados.');
        }
        console.log('Usuário cadastrado:', results);
        res.send('Cadastro realizado com sucesso!');
    });
});

app.get('/editarUsuario.html', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'editarUsuario.html'));
});
app.post('/usuario/editarUsuario.html', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { id } = req.session.usuario;
    const { nome, email,  telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const query = `
        UPDATE tbusuario
        SET Nome = ?, Email = ?, DataNascimento = ?, Telefone = ?
        WHERE UsuarioID = ?
    `;
    const values = [nome, email, telefone, id];

    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar os dados do usuário:', err);
            return res.status(500).json({ error: 'Erro ao atualizar os dados do usuário.' });
        }

        console.log('Usuário atualizado com sucesso:', results);
        res.json({ message: 'Dados atualizados com sucesso!' });
    });
});





app.get('/adicionarEventos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/adicionarEventos.html'));
});

// Rota para adicionar um evento
app.post('/adicionarEvento', (req, res) => {
    const { NomeEvento, DataEvento, LocalEvento, ProjetoID } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!NomeEvento || !DataEvento || !LocalEvento) {
        return res.status(400).json({ error: 'Nome, data e local do evento são obrigatórios.' });
    }

    // Query para inserir o evento
    const query = `
        INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, ProjetoID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [NomeEvento, DataEvento, LocalEvento, ProjetoID || null]; // Se ProjetoID não for fornecido, será NULL

    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao adicionar evento:', err);
            return res.status(500).json({ error: 'Erro ao adicionar evento.' });
        }

        res.status(201).json({ message: 'Evento adicionado com sucesso!' });
    });
});

// Rota para excluir um evento
app.delete('/excluirEvento/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM TbEventos WHERE EventoID = ?';

    db.execute(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao excluir evento:', err);
            return res.status(500).json({ error: 'Erro ao excluir evento.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }

        res.json({ message: 'Evento excluído com sucesso!' });
    });
});


app.get('/cadastrarFotos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarFotos.html'));
});

























// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});





