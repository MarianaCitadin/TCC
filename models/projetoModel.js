const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Projeto = {
    // Método para criar um novo projeto
    create: (projeto, callback) => {
        const query = 'INSERT INTO TbProjeto (NomeProjeto, DataInicio, DataFim, Descricao, Local) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [projeto.NomeProjeto, projeto.DataInicio, projeto.DataFim, projeto.Descricao, projeto.Local], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o ID do projeto inserido
        });
    },

    // Método para encontrar um projeto por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbProjeto WHERE ProjetoID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todos os projetos
    getAll: (callback) => {
        const query = 'SELECT * FROM TbProjeto';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para obter participantes de categoria 2 e dados da turma
    getParticipantesDaCategoria2: (projetoId, callback) => {
        // Consulta para obter participantes da categoria 2 para um projeto específico
        const query = `
            SELECT p.ParticipanteID, p.Nome, p.CategoriaID, t.TurmaID, t.NomeTurma 
            FROM TbParticipante p
            INNER JOIN TbTurma t ON t.ProjetoID = p.ProjetoID
            WHERE p.CategoriaID = 2 AND t.ProjetoID = ?`;
        
        db.query(query, [projetoId], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna os participantes da categoria 2 e dados da turma
        });
    },

    // Método para atualizar um projeto
    update: (id, projeto, callback) => {
        const query = 'UPDATE TbProjeto SET NomeProjeto = ?, DataInicio = ?, DataFim = ?, Descricao = ?, Local = ? WHERE ProjetoID = ?';
        db.query(query, [projeto.NomeProjeto, projeto.DataInicio, projeto.DataFim, projeto.Descricao, projeto.Local, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um projeto
    delete: (id, callback) => {
        const query = 'DELETE FROM TbProjeto WHERE ProjetoID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Projeto;
