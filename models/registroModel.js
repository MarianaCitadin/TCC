const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Registro = {
    // Método para criar um novo registro
    create: (registro, callback) => {
        const query = 'INSERT INTO TbRegistros (UsuarioID, ProjetoID, Descricao, DataRegistro) VALUES (?, ?, ?, ?)';
        db.query(query, [registro.UsuarioID, registro.ProjetoID, registro.Descricao, registro.DataRegistro], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    // Método para encontrar um registro por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbRegistros WHERE RegistroID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    // Método para obter todos os registros
    getAll: (callback) => {
        const query = 'SELECT * FROM TbRegistros';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    // Método para atualizar um registro
    update: (id, registro, callback) => {
        const query = 'UPDATE TbRegistros SET UsuarioID = ?, ProjetoID = ?, Descricao = ?, DataRegistro = ? WHERE RegistroID = ?';
        db.query(query, [registro.UsuarioID, registro.ProjetoID, registro.Descricao, registro.DataRegistro, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um registro
    delete: (id, callback) => {
        const query = 'DELETE FROM TbRegistros WHERE RegistroID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Registro;
