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
    const { nome, email, telefone } = req.body;

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

// Rota para participantes
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

// Rota para exibir o formulário de cadastro de atividade
app.get('/cadastroAtividades', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastroAtividades.html'));
});

// Rota para cadastrar a atividade
app.post('/cadastrar-atividade', upload.single('pdf-upload'), (req, res) => {
    console.log('Corpo da requisição:', req.body);
    console.log('Arquivo enviado:', req.file);

    const { title, description, date } = req.body;
    const pdfFile = req.file;

    // Verifica se todos os campos foram preenchidos
    if (!title || !description || !date || !pdfFile) {
        return res.status(400).json({
            success: false,
            message: 'Todos os campos são obrigatórios',
            errors: { title, description, date, pdfFile }
        });
    }

    const query = `
        INSERT INTO TbAudiovisuais (NomeArquivo, TipoArquivo, Descricao, DataRegistro, ProjetoID)
        VALUES (?, ?, ?, ?, ?)
    `;

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

// Rota para materiais
app.get('/materiais', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'materiais.html'));
});

// Rota para obter os materiais (dados da tabela tbaudiovisuais)
app.get('/materiais', (req, res) => {
    const query = 'SELECT * FROM tbaudiovisuais';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return res.status(500).json({ success: false, message: 'Erro ao buscar dados' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Nenhum dado encontrado' });
        }

        res.status(200).json({ success: true, data: results });
    });
});

// Rota para exibir a página de adicionar eventos
app.get('/adicionarEventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adicionarEventos.html'));
});

// Rota para obter eventos
app.get('/eventos', (req, res) => {
    const query = 'SELECT * FROM TbEventos';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).json({ error: 'Erro ao buscar eventos' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum evento encontrado' });
        }

        res.json(results);
    });
});

// Rota para adicionar um evento
app.post('/adicionarEvento', (req, res) => {
    const { NomeEvento, DataEvento, LocalEvento, ProjetoID } = req.body;

    if (!NomeEvento || !DataEvento || !LocalEvento) {
        return res.status(400).json({ error: 'Nome, data e local do evento são obrigatórios.' });
    }

    const query = `
        INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, ProjetoID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [NomeEvento, DataEvento, LocalEvento, ProjetoID || null];

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

// Rota para exibir a página turmas
app.get('/turma', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'turma.html'));
});



// Rota para exibir a página turmas
app.get('/listagemturma', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'listagemturma.html'));
});




// Rota para buscar os dados do usuário pelo ID
app.get('/usuario/:id', (req, res) => {
  const usuarioId = req.params.id;

  const query = `
    SELECT * FROM TbUsuario WHERE UsuarioID = ?
  `;
  
  db.query(query, [usuarioId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar dados do usuário' });
    }
    if (results.length > 0) {
      res.json(results[0]); // Envia os dados do usuário
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  });
});

// Servir o frontend
app.use(express.static('public'));



// Rota para exibir a página turmas
app.get('/cadastrarFotos', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarFotos.html'));
});

// Rota para exibir a página turmas
app.get('/projeto', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'projeto.html'));
});

// Rota para exibir a página turmas
app.get('/cadastrarTurmas', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarTurmas.html'));
});

// Rota para exibir a página turmas
app.get('/recuperarsenha', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recuperarsenha.html'));
});

app.post('/api/recuperar-senha', async (req, res) => {
    const { email, novaSenha } = req.body;

    // Verifica se email ou senha estão ausentes
    if (!email || !novaSenha) {
        return res.status(400).json({ message: 'E-mail e nova senha são obrigatórios.' });
    }

    // Atualiza a senha no banco de dados sem hash
    const sql = 'UPDATE tbusuario SET senha = ? WHERE email = ?';
    db.query(sql, [novaSenha, email], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar senha:', err);
            return res.status(500).json({ message: 'Erro ao atualizar a senha.' });
        }

        // Verifica se o e-mail foi encontrado e a senha foi alterada
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'E-mail não encontrado.' });
        }

        res.status(200).json({ message: 'Senha alterada com sucesso!' });
    });
});



// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
