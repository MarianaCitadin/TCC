const db = require('../config/db'); // Conexão com o banco de dados

const editarUsuario = {
    // Método para atualizar um usuário
    update: (id, usuario, callback) => {
        const query = 'UPDATE usuario SET nome = ?, email = ?, telefone = ? WHERE id = ?';
        db.query(query, [usuario.nome, usuario.email, usuario.telefone, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    // Método para excluir um usuário
    delete: (id, callback) => {
        const query = 'DELETE FROM usuario WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = editarUsuario;
