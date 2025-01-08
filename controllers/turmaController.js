const Turma = require('../models/turmaModel');
const path = require('path');

const turmaController = {
    // Criar uma nova turma
    createTurma: (req, res) => {
        const newTurma = { 
            nomeTurma: req.body.nomeTurma,
            projetoID: req.body.projetoID,
            limiteAlunos: req.body.limiteAlunos || 20
        };

        Turma.create(newTurma, (err, turmaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Turma criada com sucesso', turmaId });
        });
    },

    // Obter uma turma pelo ID
    getTurmaById: (req, res) => {
        const turmaId = req.params.id;

        Turma.findById(turmaId, (err, turma) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            res.json({ turma });
        });
    },

    // Obter todas as turmas
    getAllTurmas: (req, res) => {
        Turma.getAll((err, turmas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ turmas });
        });
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/turma.html'));
    },

    // Renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const turmaId = req.params.id;

        Turma.findById(turmaId, (err, turma) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!turma) {
                return res.status(404).json({ message: 'Turma não encontrada' });
            }
            res.json({ turma });
        });
    },

    // Atualizar uma turma
    updateTurma: (req, res) => {
        const turmaId = req.params.id;
        const updatedTurma = { 
            nomeTurma: req.body.nomeTurma,
            projetoID: req.body.projetoID,
            limiteAlunos: req.body.limiteAlunos
        };

        Turma.update(turmaId, updatedTurma, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'Turma atualizada com sucesso' });
        });
    },


};

module.exports = turmaController;
