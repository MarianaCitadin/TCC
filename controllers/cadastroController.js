const Cadastro = require('../models/cadastroModel');
const path = require('path');

const cadastroController = {
    // Criar um novo cadastro
    createCadastro: (req, res) => {
        const newCadastro = { nome: req.body.nome };

        Cadastro.create(newCadastro, (err, cadastroId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Cadastro criado com sucesso', cadastroId });
        });
    },

    // Obter um cadastro pelo ID
    getCadastroById: (req, res) => {
        const cadastroId = req.params.id;

        Cadastro.findById(cadastroId, (err, cadastro) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cadastro) {
                return res.status(404).json({ message: 'Cadastro não encontrado' });
            }
            res.json({ cadastro });
        });
    },

    // Obter todos os cadastros
    getAllCadastro: (req, res) => {
        Cadastro.getAll((err, cadastro) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ cadastro });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        // Enviar o arquivo HTML de criação
        res.sendFile(path.join(__dirname, '../views/cadastro.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const cadastroId = req.params.id;

        Cadastro.findById(cadastroId, (err, cadastro) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!cadastro) {
                return res.status(404).json({ message: 'Cadastro não encontrado' });
            }
            // Retorna o cadastro encontrado para preencher o formulário no frontend
            res.json({ cadastro });
        });
    },

    // Atualizar um cadastro
    updateCadastro: (req, res) => {
        const cadastroId = req.params.id;
        const updatedCadastro = { nome: req.body.nome };

        Cadastro.update(cadastroId, updatedCadastro, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Cadastro atualizado com sucesso' });
        });
    },

    // Deletar um cadastro
    deleteCadastro: (req, res) => {
        const cadastroId = req.params.id;

        Cadastro.delete(cadastroId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Cadastro deletado com sucesso' });
        });
    }
};

module.exports = cadastroController;
