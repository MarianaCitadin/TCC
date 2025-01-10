const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const app = express();
const multer = require('multer');
const fs = require('fs');
const Projeto = require('./models/projetoModel'); // Verifique se o caminho está correto



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
app.use(express.static('public'));

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

app.get('/usuario2', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuario2.html'));
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

// Rota GET para carregar o formulário de edição de perfil
app.get('/editarUsuario', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'editarUsuario.html'));
});

// Rota POST para atualizar os dados do usuário
app.post('/usuario/editarUsuario', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { id } = req.session.usuario;
    const { nome, email, telefone } = req.body;

    // Validação dos dados
    if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^\(\d{2}\) \d{4,5}-\d{4}$/.test(phone);

    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'E-mail inválido.' });
    }

    if (!isValidPhone(telefone)) {
        return res.status(400).json({ error: 'Telefone inválido. Use o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.' });
    }

    const query = `
        UPDATE tbusuario
        SET Nome = ?, Email = ?, Telefone = ?
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

app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM tbusuario';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return res.status(500).send('Erro ao buscar dados');
        }

        console.log(results); // Verifique o que está sendo retornado

        const usuariosPorCategoria = results.reduce((acc, usuario) => {
            const categoria = usuario.CategoriaID;
            if (!acc[categoria]) {
                acc[categoria] = [];
            }
            acc[categoria].push(usuario);
            return acc;
        }, {});

        res.json(usuariosPorCategoria);
    });
});



// Rota para exibir a página turmas
app.get('/recuperarsenha', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'recuperarsenha.html'));
});

// Rota para exibir a página de adicionar eventos
app.get('/adicionarEventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'adicionarEventos.html'));
});

// Rota para adicionar um evento
app.post('/adicionarEvento', (req, res) => {
    const { NomeEvento, DataEvento, LocalEvento, ProjetoID, TurmaID } = req.body;

    if (!NomeEvento || !DataEvento || !LocalEvento || !TurmaID) {
        return res.status(400).json({ error: 'Nome, data e local do evento são obrigatórios.' });
    }

    const query = `
        INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, turmaID)
        VALUES (?, ?, ?, ?)
    `;
    const values = [NomeEvento, DataEvento, LocalEvento, TurmaID || null];

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
// Rota para obter eventos
app.get('/listar-eventos', (req, res) => {
    const usuarioId = req.session.usuario?.id; // Supondo que o ID do usuário logado está na sessão

    if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const queryCategoria = `
        SELECT CategoriaID 
        FROM TbUsuario 
        WHERE UsuarioID = ?
    `;

    db.query(queryCategoria, [usuarioId], (err, results) => {
        if (err) {
            console.error('Erro ao verificar categoria do usuário:', err);
            return res.status(500).json({ error: 'Erro ao verificar categoria do usuário.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const categoriaId = results[0].CategoriaID;

        // Se for aluno (categoria 1), busca eventos relacionados à turma do aluno
        if (categoriaId === 1) {
            const queryEventosAluno = `
                SELECT e.*
                FROM TbEventos e
                INNER JOIN TbParticipantes p ON p.TurmaID = e.TurmaID
                WHERE p.UsuarioID = ?
            `;

            db.query(queryEventosAluno, [usuarioId], (err, eventos) => {
                if (err) {
                    console.error('Erro ao buscar eventos para o aluno:', err);
                    return res.status(500).json({ error: 'Erro ao buscar eventos para o aluno.' });
                }

                res.json(eventos);
            });
        } else {
            // Se não for aluno, retorna todos os eventos
            const queryTodosEventos = `
                SELECT * 
                FROM TbEventos
            `;

            db.query(queryTodosEventos, (err, eventos) => {
                if (err) {
                    console.error('Erro ao buscar eventos:', err);
                    return res.status(500).json({ error: 'Erro ao buscar eventos.' });
                }

                res.json(eventos);
            });
        }
    });
});


app.get('/Eventos', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'eventos.html'));
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

// Rota para exibir o formulário de cadastro de atividade
app.get('/cadastroAtividades', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastroAtividades.html'));
});

app.post('/cadastrar-atividade', upload.single('pdf-upload'), (req, res) => {
    console.log('Corpo da requisição:', req.body);
    console.log('Arquivo enviado:', req.file);

    const { title, description, date, projetoId } = req.body;
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
        pdfFile.filename,   // Nome original do arquivo
        pdfFile.mimetype,   // Tipo do arquivo
        description,        // Descrição da atividade
        date,               // Data
        projetoId                // Substitua "null" pelo ID do projeto se necessário
    ];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao salvar atividade:', err);
            return res.status(500).json({ success: false, message: 'Erro ao salvar atividade', error: err });
        }
        res.json({ success: true, message: 'Atividade cadastrada com sucesso', id: results.insertId });
    });
});







// Rota para listar os materiais do banco
app.get('/api/materiais', (req, res) => {
    const usuarioId = req.session?.usuario?.id; // Supondo que o ID do usuário logado está na sessão

    if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Consulta para verificar a categoria do usuário
    const queryCategoria = `
        SELECT CategoriaID 
        FROM TbUsuario 
        WHERE UsuarioID = ?
    `;

    db.query(queryCategoria, [usuarioId], (err, results) => {
        if (err) {
            console.error('Erro ao verificar categoria do usuário:', err);
            return res.status(500).json({ error: 'Erro ao verificar categoria do usuário.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const categoriaId = results[0].CategoriaID;

        if (categoriaId === 1) {
            // Usuário é da categoria 1 (aluno), busca apenas materiais dos projetos associados ao aluno
            const queryMateriaisAluno = `
                SELECT m.*
                FROM TbAudiovisuais m
                INNER JOIN TbParticipantes p ON p.ProjetoID = m.ProjetoID
                WHERE p.UsuarioID = ?
            `;

            db.query(queryMateriaisAluno, [usuarioId], (err, materiais) => {
                if (err) {
                    console.error('Erro ao buscar materiais para o aluno:', err);
                    return res.status(500).json({ error: 'Erro ao buscar materiais para o aluno.' });
                }

                res.json(materiais);
            });
        } else {
            // Se não for aluno, retorna todos os materiais
            const queryTodosMateriais = 'SELECT * FROM TbAudiovisuais';

            db.query(queryTodosMateriais, (err, materiais) => {
                if (err) {
                    console.error('Erro ao buscar materiais:', err);
                    return res.status(500).json({ error: 'Erro ao buscar materiais.' });
                }

                res.json(materiais);
            });
        }
    });
});


// Rota para renderizar a página de materiais
app.get('/materiais', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'materiais.html')); // Corrigida duplicidade de rotas
});







// Rota para exibir cadastrar fotos
app.get('/cadastraralunos', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastraralunos.html'));
});

app.post('/associar-aluno-turma', (req, res) => {
    const { usuarioIDs, turmaID } = req.body; // Recebe o array de alunos e o ID da turma

    if (!usuarioIDs || !turmaID || usuarioIDs.length === 0) {
        return res.status(400).json({ error: 'IDs dos alunos e ID da turma são obrigatórios.' });
    }

    // Query para verificar alunos que já estão associados à turma
    const queryVerificar = `
        SELECT UsuarioID 
        FROM TbParticipantes 
        WHERE UsuarioID IN (?)
    `;

    db.query(queryVerificar, [usuarioIDs], (err, results) => {
        if (err) {
            console.error('Erro ao verificar associação:', err);
            return res.status(500).json({ error: 'Erro ao verificar associação.' });
        }

        // Garante que todos os IDs sejam convertidos para o mesmo tipo (número)
        const alunosJaAssociados = results.map(result => Number(result.UsuarioID));
        const novosAlunos = usuarioIDs.map(Number).filter(id => !alunosJaAssociados.includes(id));


        // Atualiza o registro para os alunos já associados
        const queryUpdate = `
            UPDATE TbParticipantes 
            SET TurmaID = ?,
           ProjetoID = (SELECT ProjetoID FROM TbTurma WHERE TurmaID = ?)
            WHERE UsuarioID = ?
        `;

        const updates = alunosJaAssociados.map(usuarioID => {
            return new Promise((resolve, reject) => {
                db.query(queryUpdate, [turmaID, turmaID, usuarioID], (err, result) => {
                    if (err) {
                        reject('Erro ao atualizar aluno na turma: ' + err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Insere novos registros para os alunos não associados
        const queryInserir = `
            INSERT INTO TbParticipantes (UsuarioID, ProjetoID, TurmaID)
            VALUES (?, (SELECT ProjetoID FROM TbTurma WHERE TurmaID = ?), ?)
        `;

        const inserts = novosAlunos.map(usuarioID => {
            return new Promise((resolve, reject) => {
                db.query(queryInserir, [usuarioID, turmaID, turmaID], (err, result) => {
                    if (err) {
                        reject('Erro ao associar aluno à turma: ' + err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Executa todas as promessas de updates e inserts
        Promise.all([...updates, ...inserts])
            .then(() => {
                res.json({ success: true, message: 'Associação atualizada com sucesso!' });
            })
            .catch(err => {
                console.error('Erro ao associar/alunos:', err);
                res.status(500).json({ error: 'Erro ao associar alunos à turma.' });
            });
    });
});


app.get('/listarProjetos', (req, res) => {
    const query = 'SELECT ProjetoID, NomeProjeto FROM tbprojeto';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar projetos:', err);
            return res.status(500).json({ error: 'Erro ao buscar projetos.' });
        }

        res.json(results);
    });
});







// Rota para exibir cadastrar fotos
app.get('/cadastrarFotos', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastrarFotos.html'));
});
// Rota para cadastrar fotos
app.post('/cadastrarFotos', verificarAutenticacao, upload.single('foto'), (req, res) => {
    const { descricao, usuarioID, projetoId } = req.body;
    const foto = req.file ? req.file.filename : null; // Se o arquivo foi enviado, captura o nome do arquivo

    if (!foto) {
        return res.status(400).json({ success: false, message: 'Nenhuma foto enviada.' });
    }

    // SQL para salvar no banco de dados
    const query = `INSERT INTO TbRegistros (UsuarioID, ProjetoID, Descricao, Foto, DataRegistro) 
                   VALUES (?, ?, ?, ?, NOW())`;
    db.query(query, [usuarioID, projetoId, descricao, foto], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar foto:', err);
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar foto.' });
        }
        res.json({ success: true, message: 'Foto cadastrada com sucesso!' });
    });
});

// Rota para exibir a tela de fotos
app.get('/fotos', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'fotos.html'));
});

// Servir arquivos estáticos do diretório 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para listar as fotos do banco de dados
app.get('/api/fotos', (req, res) => {
    const usuarioId = req.session?.usuario?.id; // Supondo que o ID do usuário logado está na sessão

    if (!usuarioId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }

    // Consulta para verificar a categoria do usuário
    const queryCategoria = `
        SELECT CategoriaID 
        FROM TbUsuario 
        WHERE UsuarioID = ?
    `;

    db.query(queryCategoria, [usuarioId], (err, results) => {
        if (err) {
            console.error('Erro ao verificar categoria do usuário:', err);
            return res.status(500).json({ success: false, message: 'Erro ao verificar categoria do usuário.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        const categoriaId = results[0].CategoriaID;

        if (categoriaId === 1) {
            // Usuário é da categoria 1 (aluno), busca apenas fotos dos projetos associados ao aluno
            const queryFotosAluno = `
                SELECT r.*
                FROM TbRegistros r
                INNER JOIN TbParticipantes p ON p.ProjetoID = r.ProjetoID
                WHERE p.UsuarioID = ?
            `;

            db.query(queryFotosAluno, [usuarioId], (err, fotos) => {
                if (err) {
                    console.error('Erro ao buscar fotos para o aluno:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao buscar fotos para o aluno.' });
                }

                res.json(fotos);
            });
        } else {
            // Se não for aluno, retorna todas as fotos
            const queryTodosFotos = `
                SELECT *
                FROM TbRegistros
            `;

            db.query(queryTodosFotos, (err, fotos) => {
                if (err) {
                    console.error('Erro ao buscar fotos:', err);
                    return res.status(500).json({ success: false, message: 'Erro ao buscar fotos.' });
                }

                res.json(fotos);
            });
        }
    });
});













// Rota para exibir sobre
app.get('/sobre', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sobre.html'));
});


// Rota para renderizar o formulário de projeto
app.get('/projeto', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/projeto.html'));
});

app.post('/projeto/criar', (req, res) => {
    console.log('Dados recebidos:', req.body); // Adicionando um log para inspecionar os dados

    // Certifique-se de que os nomes dos campos são consistentes com os enviados pelo frontend
    const { NomeProjeto, AnoEdicao, Local } = req.body;

    if (!NomeProjeto || !AnoEdicao || !Local) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    const newProjeto = {
        NomeProjeto,
        AnoEdicao,
        Local
    };

    Projeto.create(newProjeto, (err, projetoId) => {
        if (err) {
            console.error('Erro ao criar o projeto:', err);
            return res.status(500).send('Erro ao criar o projeto, tente novamente.');
        }

        // Se o cadastro for bem-sucedido, redireciona para a página de cadastrar turmas
        req.session.projetoId = projetoId;
        res.redirect('/cadastrarTurmas');

    });
});
app.get('/getProjetoId', (req, res) => {
    console.log(req.session.projetoId);
    if (!req.session.projetoId) {
        return res.status(404).json({ error: 'Projeto ID não encontrado.' });
    }
    res.json({ projetoId: req.session.projetoId });
});

app.get('/cadastrarTurmas', (req, res) => {


    // Renderizar a página HTML
    res.sendFile(path.join(__dirname, 'views', 'cadastrarTurmas.html'));
});

// Rota para cadastrar a turma
app.post('/cadastrarTurmas', (req, res) => {
    const { nomeTurma, horario, dataInicio, dataFim, limiteAlunos, projetoId } = req.body;

    // Verificar se os dados estão corretos
    if (!nomeTurma || !horario || !dataInicio || !dataFim || !limiteAlunos || !projetoId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Inserir os dados no banco de dados
    const sql = 'INSERT INTO TbTurma (NomeTurma, Horario, DataInicio, DataFim, LimiteAlunos, ProjetoID) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [nomeTurma, horario, dataInicio, dataFim, limiteAlunos, projetoId], (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar a turma no banco de dados.' });
        }
        return res.status(200).json({ message: 'Turma cadastrada com sucesso!' });
    });
});






// Rota para exibir a página turmas
app.get('/turma', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'turma.html'));
});

app.get('/listagemturma', verificarAutenticacao, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'listagemturma.html'));
});

app.get('/listarTurmas', (req, res) => {
    const usuarioId = req.session?.usuario?.id; // Supondo que o ID do usuário logado está armazenado na sessão
    
    if (!usuarioId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    // Consulta para buscar as turmas associadas ao usuário logado
    const queryTurmasUsuario = `
        SELECT t.TurmaID ,NomeTurma, horario, (select Local from tbprojeto where ProjetoID = t.ProjetoID) local
        FROM TbTurma t
        INNER JOIN TbParticipantes p ON t.TurmaID = p.TurmaID
        WHERE p.UsuarioID = ?
    `;

    db.query(queryTurmasUsuario, [usuarioId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar turmas:', err);
            return res.status(500).json({ error: 'Erro ao buscar turmas.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhuma turma encontrada para o usuário.' });
        }

        res.json(results);
    });
});
app.get('/turma/:turmaId/participantes', (req, res) => {
    const turmaId = req.params.turmaId; // Obtém o ID da turma a partir dos parâmetros da rota

    if (!turmaId) {
        return res.status(400).json({ error: 'O ID da turma é obrigatório.' });
    }

    // Consulta para buscar os participantes de uma turma
    const queryParticipantes = `
        SELECT u.UsuarioID, u.Nome
        FROM TbParticipantes p
        INNER JOIN TbUsuario u ON p.UsuarioID = u.UsuarioID
        WHERE p.TurmaID = ?
    `;

    db.query(queryParticipantes, [turmaId], (err, results) => {
        if (err) {
            console.error('Erro ao buscar participantes da turma:', err);
            return res.status(500).json({ error: 'Erro ao buscar participantes da turma.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum participante encontrado para esta turma.' });
        }

        res.json(results);
    });
});





// Rota para obter os usuários
app.get('/listar-usuarios', (req, res) => {
    const query = 'SELECT * FROM TbUsuario'; // Consulta para obter todos os usuários

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado' });
        }

        res.json(results); // Retorna os usuários encontrados
    });
});

// Rota para obter as turmas
app.get('/listar-turmas', (req, res) => {
    const query = 'SELECT * FROM TbTurma'; // Consulta para obter todas as turmas

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar turmas:', err);
            return res.status(500).json({ error: 'Erro ao buscar turmas' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhuma turma encontrada' });
        }

        res.json(results); // Retorna as turmas encontradas
    });
});
































// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});