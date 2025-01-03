const editarUsuario = require('../models/editarUsuario'); // Importando o modelo para interagir com o banco de dados

const editarUsuarioController = {
    updateUsuario: (req, res) => {
        const usuarioId = req.params.id;
        const { nome, email, telefone } = req.body;

        // Verifique se os campos obrigatórios estão presentes
        if (!nome || !email || !telefone) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        // Chama o método de atualização do modelo
        editarUsuario.update(usuarioId, { nome, email, telefone }, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Usuário atualizado com sucesso.' });
        });
    },

    deleteUsuario: (req, res) => {
        const usuarioId = req.params.id;

        editarUsuario.delete(usuarioId, (err, results) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Usuário deletado com sucesso.' });
        });
    },
};

module.exports = editarUsuarioController;
