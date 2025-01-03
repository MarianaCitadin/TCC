const Eventos = require('../models/eventosModel');
const path = require('path');

const eventosController = {
    // Criar um novo evento
    createEvento: (req, res) => {
        const newEvento = {
            NomeEvento: req.body.NomeEvento,
            DataEvento: req.body.DataEvento,
            LocalEvento: req.body.LocalEvento,
            ProjetoID: req.body.ProjetoID
        };

        Eventos.create(newEvento, (err, eventoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Evento criado com sucesso', eventoId });
        });
    },

    // Obter um evento pelo ID
    getEventoById: (req, res) => {
        const eventoId = req.params.id;

        Eventos.findById(eventoId, (err, evento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
            res.json({ evento });
        });
    },

    // Obter todos os eventos
    getAllEventos: (req, res) => {
        Eventos.getAll((err, eventos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ eventos });
        });
    },

    // Renderizar o formulário de criação de evento
    renderCreateForm: (req, res) => {
        // Enviar o arquivo HTML de criação de evento
        res.sendFile(path.join(__dirname, '../views/evento-create.html'));
    },

    // Renderizar o formulário de edição de evento
    renderEditForm: (req, res) => {
        const eventoId = req.params.id;

        Eventos.findById(eventoId, (err, evento) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
            // Retorna o evento encontrado para preencher o formulário no frontend
            res.json({ evento });
        });
    },

    // Atualizar um evento
    updateEvento: (req, res) => {
        const eventoId = req.params.id;
        const updatedEvento = {
            NomeEvento: req.body.NomeEvento,
            DataEvento: req.body.DataEvento,
            LocalEvento: req.body.LocalEvento,
            ProjetoID: req.body.ProjetoID
        };

        Eventos.update(eventoId, updatedEvento, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Evento atualizado com sucesso' });
        });
    },

    // Deletar um evento
    deleteEvento: (req, res) => {
        const eventoId = req.params.id;

        Eventos.delete(eventoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Evento deletado com sucesso' });
        });
    }
};

module.exports = eventosController;
