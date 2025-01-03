const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Eventos = {
    // Método para criar um novo evento
    create: (evento, callback) => {
        const query = 'INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, ProjetoID) VALUES (?, ?, ?, ?)';
        db.query(query, [evento.NomeEvento, evento.DataEvento, evento.LocalEvento, evento.ProjetoID], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o ID do novo evento
        });
    },

    // Método para encontrar um evento por ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM TbEventos WHERE EventoID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna o evento encontrado
        });
    },

    // Método para obter todos os eventos
    getAll: (callback) => {
        const query = 'SELECT * FROM TbEventos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os eventos
        });
    },

    // Método para atualizar um evento
    update: (id, evento, callback) => {
        const query = 'UPDATE TbEventos SET NomeEvento = ?, DataEvento = ?, LocalEvento = ?, ProjetoID = ? WHERE EventoID = ?';
        db.query(query, [evento.NomeEvento, evento.DataEvento, evento.LocalEvento, evento.ProjetoID, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um evento
    delete: (id, callback) => {
        const query = 'DELETE FROM TbEventos WHERE EventoID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Eventos;
