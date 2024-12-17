const db = require('../config/db');

const Login = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(query, [user.username, user.password, user.email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    authenticate: (username, password, callback) => {
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        db.query(query, [username, password], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna o usuário autenticado ou null
        });
    },

    update: (id, user, callback) => {
        const query = 'UPDATE users SET username = ?, password = ?, email = ? WHERE id = ?';
        db.query(query, [user.username, user.password, user.email, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    recoverPassword: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results.length === 0) {
                return callback(new Error('E-mail não encontrado'));
            }

            // Aqui você poderia enviar um email ou gerar um token de recuperação
            callback(null, results[0]);
        });
    }
};

module.exports = Login;
