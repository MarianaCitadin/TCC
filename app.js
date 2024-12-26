const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Configurar o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Substitua conforme necessário
    password: 'M@riC2804',  // Substitua conforme necessário
    database: 'clicandonaterceiraidade'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

// Rota para processar o cadastro de usuários
app.post('/submit_form', (req, res) => {
    const { nome, dataNascimento, documento, genero, fone, estado, cidade, bairro, rua, numero, categoria, email, senha } = req.body;

    // Verificar se a categoria é válida (Aluno ou Professor)
    const categoriasValidas = ['Aluno', 'Professor'];
    if (!categoriasValidas.includes(categoria)) {
        return res.status(400).send('Categoria inválida. Escolha entre "Aluno" ou "Professor".');
    }

    // Obter o ID da categoria (Aluno = 1, Professor = 2)
    const categoriaID = categoria === 'Aluno' ? 1 : 2;

    const query = `
        INSERT INTO tbusuario
        (nome, dataNascimento, documento, genero, telefone, estado, cidade, bairro, logradouro, numero, categoriaID, email, senha)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [nome, dataNascimento, documento, genero, fone, estado, cidade, bairro, rua, numero, categoriaID, email, senha];

    db.execute(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao salvar no banco de dados:', err);
            res.status(500).send('Erro ao salvar no banco de dados.');
        } else {
            console.log('Usuário cadastrado:', results);
            res.send('Cadastro realizado com sucesso!');
        }
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
app.use(express(path.join(__dirname,'views')));

app.use(express(path.join(__dirname,'public')));
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.post('/seu-endpoint', (req, res) => {
    console.log(req.body); // Registrar o corpo da requisição para inspecioná-lo
    const { nome } = req.body;
    // Sua lógica aqui
});

// Middleware para fazer o parsing de corpos JSON
app.use(express.json()); // para payloads JSON

// Middleware para fazer o parsing de corpos URL-encoded
app.use(express.urlencoded({ extended: true })); // para dados de formulário

