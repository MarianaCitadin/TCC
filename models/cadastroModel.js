const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Cadastro = {
    // Método para criar um novo cadastro
    create: (cadastro, callback) => {
        const query = 'INSERT INTO cadastro (nome) VALUES (?)';
        db.query(query, [cadastro.nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Método para encontrar um cadastro por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM cadastro WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todos os cadastros
    getAll: (callback) => {
        const query = 'SELECT * FROM cadastro';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para atualizar um cadastro
    update: (id, cadastro, callback) => {
        const query = 'UPDATE cadastro SET nome = ? WHERE id = ?';
        db.query(query, [cadastro.nome, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um cadastro
    delete: (id, callback) => {
        const query = 'DELETE FROM cadastro WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Cadastro;

