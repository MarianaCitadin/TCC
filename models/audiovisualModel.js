const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Audiovisual = {
    // Método para criar um novo registro audiovisual
    create: (audiovisual, callback) => {
        const query = 'INSERT INTO TbAudiovisuais (NomeArquivo, TipoArquivo, ProjetoID) VALUES (?, ?, ?)';
        db.query(query, [audiovisual.NomeArquivo, audiovisual.TipoArquivo, audiovisual.ProjetoID], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Método para encontrar um registro audiovisual por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbAudiovisuais WHERE AudiovisualID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todos os registros audiovisuais
    getAll: (callback) => {
        const query = 'SELECT * FROM TbAudiovisuais';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para atualizar um registro audiovisual
    update: (id, audiovisual, callback) => {
        const query = 'UPDATE TbAudiovisuais SET NomeArquivo = ?, TipoArquivo = ?, ProjetoID = ? WHERE AudiovisualID = ?';
        db.query(query, [audiovisual.NomeArquivo, audiovisual.TipoArquivo, audiovisual.ProjetoID, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um registro audiovisual
    delete: (id, callback) => {
        const query = 'DELETE FROM TbAudiovisuais WHERE AudiovisualID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Audiovisual;
