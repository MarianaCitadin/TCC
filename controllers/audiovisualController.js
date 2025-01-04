const Audiovisual = require('../models/audiovisualModel');
const path = require('path');

const audiovisualController = {
    // Criar um novo audiovisual
    createAudiovisual: (req, res) => {
        const newAudiovisual = {
            NomeArquivo: req.body.NomeArquivo,
            TipoArquivo: req.body.TipoArquivo,
            ProjetoID: req.body.ProjetoID,
        };

        Audiovisual.create(newAudiovisual, (err, audiovisualId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Audiovisual criado com sucesso', audiovisualId });
        });
    },

    // Obter um audiovisual pelo ID
    getAudiovisualById: (req, res) => {
        const audiovisualId = req.params.id;

        Audiovisual.findById(audiovisualId, (err, audiovisual) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!audiovisual) {
                return res.status(404).json({ message: 'Audiovisual não encontrado' });
            }
            res.json({ audiovisual });
        });
    },

    // Obter todos os audiovisuais
    getAllAudiovisual: (req, res) => {
        Audiovisual.getAll((err, audiovisuais) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ audiovisuais });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/audiovisual.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const audiovisualId = req.params.id;

        Audiovisual.findById(audiovisualId, (err, audiovisual) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!audiovisual) {
                return res.status(404).json({ message: 'Audiovisual não encontrado' });
            }
            res.json({ audiovisual });
        });
    },

    // Atualizar um audiovisual
    updateAudiovisual: (req, res) => {
        const audiovisualId = req.params.id;
        const updatedAudiovisual = {
            NomeArquivo: req.body.NomeArquivo,
            TipoArquivo: req.body.TipoArquivo,
            ProjetoID: req.body.ProjetoID,
        };

        Audiovisual.update(audiovisualId, updatedAudiovisual, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Audiovisual atualizado com sucesso' });
        });
    },

    // Deletar um audiovisual
    deleteAudiovisual: (req, res) => {
        const audiovisualId = req.params.id;

        Audiovisual.delete(audiovisualId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Audiovisual deletado com sucesso' });
        });
    },
};

module.exports = audiovisualController;
