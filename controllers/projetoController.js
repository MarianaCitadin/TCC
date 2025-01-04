const Projeto = require('../models/projetoModel');
const path = require('path');

const projetoController = {
    // Criar um novo projeto
    createProjeto: (req, res) => {
        const newProjeto = {
            NomeProjeto: req.body.NomeProjeto,
            DataInicio: req.body.DataInicio,
            DataFim: req.body.DataFim,
            Descricao: req.body.Descricao,
            Local: req.body.Local
        };

        Projeto.create(newProjeto, (err, projetoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Projeto criado com sucesso', projetoId });
        });
    },

    // Obter um projeto pelo ID
    getProjetoById: (req, res) => {
        const projetoId = req.params.id;

        Projeto.findById(projetoId, (err, projeto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!projeto) {
                return res.status(404).json({ message: 'Projeto não encontrado' });
            }
            res.json({ projeto });
        });
    },

    // Obter todos os projetos
    getAllProjeto: (req, res) => {
        Projeto.getAll((err, projetos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ projetos });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        // Enviar o arquivo HTML de criação
        res.sendFile(path.join(__dirname, '../views/projeto.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const projetoId = req.params.id;

        Projeto.findById(projetoId, (err, projeto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!projeto) {
                return res.status(404).json({ message: 'Projeto não encontrado' });
            }
            // Retorna o projeto encontrado para preencher o formulário no frontend
            res.json({ projeto });
        });
    },

    // Atualizar um projeto
    updateProjeto: (req, res) => {
        const projetoId = req.params.id;
        const updatedProjeto = {
            NomeProjeto: req.body.NomeProjeto,
            DataInicio: req.body.DataInicio,
            DataFim: req.body.DataFim,
            Descricao: req.body.Descricao,
            Local: req.body.Local
        };

        Projeto.update(projetoId, updatedProjeto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Projeto atualizado com sucesso' });
        });
    },

    // Deletar um projeto
    deleteProjeto: (req, res) => {
        const projetoId = req.params.id;

        Projeto.delete(projetoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Projeto deletado com sucesso' });
        });
    }
};

module.exports = projetoController;
