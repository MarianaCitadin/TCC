const db = require('../config/db'); // Supondo que você já tenha a conexão configurada

const Projeto = {
    // Método para criar um novo projeto
    create: (projeto, callback) => {
        const query = 'INSERT INTO TbProjeto (NomeProjeto, AnoEdicao, Local) VALUES (?, ?, ?)';
        db.query(query, [projeto.NomeProjeto, projeto.AnoEdicao, projeto.Local], (err, results) => {
            if (err) {
                console.error('Erro ao inserir no banco:', err);
                return callback('Erro ao criar o projeto. Tente novamente.');
            }
            callback(null, results.insertId); // Retorna o ID do projeto inserido
        });
    },
}

module.exports = Projeto;
