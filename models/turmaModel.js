const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Turma = {
    // Método para criar uma nova turma
    create: (turma, callback) => {
        const query = 'INSERT INTO TbTurma (NomeTurma, ProjetoID, LimiteAlunos) VALUES (?, ?, ?)';
        db.query(query, [turma.nomeTurma, turma.projetoID, turma.limiteAlunos || 20], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o ID da nova turma criada
        });
    },

    // Método para encontrar uma turma por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbTurma WHERE TurmaID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todas as turmas
    getAll: (callback) => {
        const query = 'SELECT * FROM TbTurma';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para atualizar uma turma
    update: (id, turma, callback) => {
        const query = 'UPDATE TbTurma SET NomeTurma = ?, ProjetoID = ?, LimiteAlunos = ? WHERE TurmaID = ?';
        db.query(query, [turma.nomeTurma, turma.projetoID, turma.limiteAlunos, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    
    };

module.exports = Turma;
