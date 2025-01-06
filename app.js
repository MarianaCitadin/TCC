const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const app = express();
const multer = require('multer');
const fs = require('fs');


// Configuração de sessão
app.use(session({
    secret: 'sua_chave_secreta',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `true` em produção com HTTPS
}));

// Configuração do multer para salvar o arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Pasta onde as fotos serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renomeia o arquivo com a data
    }
});
const upload = multer({ storage: storage });

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

app.get('/editarUsuario', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'editarUsuario.html'));
});
app.post('/usuario/editarUsuario', (req, res) => {
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





app.get('/adicionarEventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/adicionarEventos.html'));
});
 
// Rota para adicionar um evento
app.post('/adicionarEvento', (req, res) => {
    console.log("aqui");
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


app.get('/ListaEventos', (req, res) => {
    const query = `SELECT NomeEvento, DataEvento, LocalEvento FROM TbEventos`;

    db.execute(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).json({ error: 'Erro ao buscar eventos.' });
        }

        res.json(results); // Retorna os eventos em formato JSON
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

//rota cadastrar Fotos 
app.get('/cadastrarFotos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarFotos.html'));
});

// Endpoint para receber os dados
app.post('/caminho/do/seu/servidor', upload.single('foto'), (req, res) => {
    const { titulo, descricao, DataRegistro } = req.body;
    const foto = req.file ? req.file.filename : null;

    // Verificar se todos os campos foram preenchidos
    if (!titulo || !descricao || !foto || !DataRegistro) {
        return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
    }

    // Ajustando a query para garantir que os valores sejam passados corretamente
    const query = 'INSERT INTO TbRegistros (titulo, descricao, foto, DataRegistro) VALUES (?, ?, ?, ?)';
    db.query(query, [titulo, descricao, foto, DataRegistro], (err, result) => {
        if (err) {
            console.error('Erro ao salvar no banco:', err);
            return res.status(500).json({ success: false, message: "Erro ao salvar a foto." });
        }
        res.status(200).json({ success: true, message: "Foto adicionada com sucesso!" });
    });
});





app.post('/cadastrar-atividade', upload.single('pdf'), (req, res) => {
    console.log('Corpo da requisição:', req.body);
    console.log('Arquivo enviado:', req.file);

    const { title, description, date } = req.body;
    const pdfFile = req.file;

    if ((!title || !description || !date || !pdfFile)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Todos os campos são obrigatórios',
            errors: { title, description, date, pdfFile }
        });
    }

    // Adicionando tratamento para o ProjetoID
    const query = `
        INSERT INTO TbAudiovisuais (NomeArquivo, TipoArquivo, Descricao, DataRegistro, ProjetoID)
        VALUES (?, ?, ?, ?, ?)
    `;

    // Caso o ProjetoID não seja enviado, passaremos NULL
    const values = [
        pdfFile.filename,
        pdfFile.mimetype,
        description,
        date,
        null // Aqui você pode passar o valor do ProjetoID se tiver
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao salvar atividade:', err);
            return res.status(500).json({ success: false, message: 'Erro ao salvar atividade' });
        }
        res.json({ success: true, message: 'Atividade cadastrada com sucesso' });
    });
});










//rota para participantes 
app.get('/listagemUsuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'listagemUsuarios.html'));
});

// Rota para obter usuários
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM tbusuario'; // Ajuste a tabela e os campos conforme seu banco de dados

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return res.status(500).send('Erro ao buscar dados');
        }

        // Agrupar usuários por CategoriaID
        const usuariosPorCategoria = results.reduce((acc, usuario) => {
            const categoria = usuario.CategoriaID;
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push(usuario);
            return acc;
        }, {});

        // Retornar os dados agrupados por categoria
        res.json(usuariosPorCategoria);
    });
});
    
// Servir os arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));


//rota para projeto
app.get('/turma', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'turma.html'));
});

//rota para cadastrar turma 
app.get('/cadastrarTurmas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarTurmas.html'));
});

// Rota para cadastrar turmas
app.post('/cadastrarTurmas', (req, res) => {
    const { nomeTurma, horario, dataInicio, dataFim } = req.body;

    // Verificando se todos os campos necessários foram preenchidos
    if (!nomeTurma || !horario || !dataInicio || !dataFim) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Construindo a query SQL para inserir a nova turma
    const query = `
        INSERT INTO TbTurma (nomeTurma, horario, dataInicio, dataFim)
        VALUES (?, ?, ?, ?)
    `;

    // Executando a query para salvar a turma no banco de dados
    db.query(query, [nomeTurma, horario, dataInicio, dataFim], (err, result) => {
        if (err) {
            console.error('Erro ao tentar cadastrar a turma:', err.message);
            return res.status(500).json({ error: "Erro ao cadastrar a turma. Tente novamente mais tarde." });
        }

        // Caso a turma seja cadastrada com sucesso
        res.status(201).json({ message: "Turma cadastrada com sucesso!" });
    });
});








//rota para eventos
app.get('/eventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'eventos.html'));
});

//rota para sobre nos 
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sobre.html'));
});

//rota para fotos 
app.get('/fotos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'fotos.html'));
});

//rota para materiais  
app.get('/materiais', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'materiais.html'));
});

//rota para Recuperar Senha 
app.get('/recuperarsenha', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recuperarSenha.html'));
});






// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});





