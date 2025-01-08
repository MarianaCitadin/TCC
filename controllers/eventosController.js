const Eventos = require('../models/eventosModel');

const eventosController = {
    createEvento: (req, res) => {
        const { NomeEvento, DataEvento, LocalEvento, ProjetoID } = req.body;

        const newEvento = { NomeEvento, DataEvento, LocalEvento, ProjetoID };

        Eventos.create(newEvento, (err, eventoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Evento criado com sucesso', eventoId });
        });
    },

    getAllEventos: (req, res) => {
        Eventos.getAll((err, eventos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ eventos });
        });
    },

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

    updateEvento: (req, res) => {
        const eventoId = req.params.id;
        const updatedEvento = req.body;

        Eventos.update(eventoId, updatedEvento, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Evento atualizado com sucesso', result });
        });
    },

    deleteEvento: (req, res) => {
        const eventoId = req.params.id;

        Eventos.delete(eventoId, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Evento deletado com sucesso' });
        });
    }
};

module.exports = eventosController;
