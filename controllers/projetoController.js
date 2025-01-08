const Projeto = require('../models/projetoModel');
const path = require('path');

const projetoApiController = {
    // Criar um novo projeto
    createProjeto: (req, res) => {
        const newProjeto = {
            NomeProjeto: req.body.NomeProjeto,
            AnoEdicao: req.body.AnoEdicao,
            Local: req.body.Local
        };

        Projeto.create(newProjeto, (err, projetoId) => {
            if (err) {
                console.error('Erro ao criar projeto:', err);
                return res.status(500).json({ error: 'Erro ao criar projeto, por favor tente novamente.' });
            }
            res.status(201).json({ message: 'Projeto criado com sucesso', projetoId });
        });
    },
};

const projetoViewController = {
    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/projeto.html'));
    },
};

module.exports = { projetoApiController, projetoViewController };
