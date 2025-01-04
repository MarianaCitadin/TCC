const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Participante = {
    // Método para criar um novo participante
    create: (participante, callback) => {
        const query = 'INSERT INTO TbParticipantes (UsuarioID, ProjetoID) VALUES (?, ?)';
        db.query(query, [participante.UsuarioID, participante.ProjetoID], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Método para encontrar um participante por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbParticipantes WHERE ParticipanteID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todos os participantes
    getAll: (callback) => {
        const query = 'SELECT * FROM TbParticipantes';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para atualizar um participante
    update: (id, participante, callback) => {
        const query = 'UPDATE TbParticipantes SET UsuarioID = ?, ProjetoID = ? WHERE ParticipanteID = ?';
        db.query(query, [participante.UsuarioID, participante.ProjetoID, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um participante
    delete: (id, callback) => {
        const query = 'DELETE FROM TbParticipantes WHERE ParticipanteID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Participante;
