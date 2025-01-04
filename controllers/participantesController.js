const Participante = require('../models/participanteModel');
const path = require('path');

const participanteController = {
    // Criar um novo participante
    createParticipante: (req, res) => {
        const newParticipante = {
            UsuarioID: req.body.UsuarioID,
            ProjetoID: req.body.ProjetoID,
        };

        Participante.create(newParticipante, (err, participanteId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Participante criado com sucesso', participanteId });
        });
    },

    // Obter um participante pelo ID
    getParticipanteById: (req, res) => {
        const participanteId = req.params.id;

        Participante.findById(participanteId, (err, participante) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
            res.json({ participante });
        });
    },

    // Obter todos os participantes
    getAllParticipantes: (req, res) => {
        Participante.getAll((err, participantes) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ participantes });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/participante.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const participanteId = req.params.id;

        Participante.findById(participanteId, (err, participante) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!participante) {
                return res.status(404).json({ message: 'Participante não encontrado' });
            }
            res.json({ participante });
        });
    },

    // Atualizar um participante
    updateParticipante: (req, res) => {
        const participanteId = req.params.id;
        const updatedParticipante = {
            UsuarioID: req.body.UsuarioID,
            ProjetoID: req.body.ProjetoID,
        };

        Participante.update(participanteId, updatedParticipante, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Participante atualizado com sucesso' });
        });
    },

    // Deletar um participante
    deleteParticipante: (req, res) => {
        const participanteId = req.params.id;

        Participante.delete(participanteId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Participante deletado com sucesso' });
        });
    }
};

module.exports = participanteController;
