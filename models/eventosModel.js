const db = require('../db');

const Eventos = {
    create: (evento, callback) => {
        const query = `
            INSERT INTO TbEventos (NomeEvento, DataEvento, LocalEvento, ProjetoID)
            VALUES (?, ?, ?, ?)
        `;
        const values = [evento.NomeEvento, evento.DataEvento, evento.LocalEvento, evento.ProjetoID || null];

        db.query(query, values, (err, result) => {
            callback(err, result.insertId);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM TbEventos';
        db.query(query, (err, results) => {
            callback(err, results);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM TbEventos WHERE EventoID = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results[0]);
        });
    },

    update: (id, evento, callback) => {
        const query = `
            UPDATE TbEventos
            SET NomeEvento = ?, DataEvento = ?, LocalEvento = ?, ProjetoID = ?
            WHERE EventoID = ?
        `;
        const values = [evento.NomeEvento, evento.DataEvento, evento.LocalEvento, evento.ProjetoID || null, id];

        db.query(query, values, (err, results) => {
            callback(err, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM TbEventos WHERE EventoID = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = Eventos;
