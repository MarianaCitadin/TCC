const Turma = require('../models/turmaModel');
const path = require('path');

const turmaController = {
    // Criar uma nova turma
    createTurma: (req, res) => {
        const { nomeTurma, projetoID, horario, dataInicio, dataFim, limiteAlunos } = req.body;

        // Validação básica para garantir que os campos obrigatórios existam
        if (!nomeTurma || !horario || !dataInicio || !dataFim) {
            return res.status(400).json({ message: 'Nome da turma, horário, data de início e data de fim são obrigatórios.' });
        }

        // Se limiteAlunos não for fornecido, usa 20 como padrão
        const limite = parseInt(limiteAlunos, 10) || 20;

        // Verifica se limiteAlunos é um número válido
        if (isNaN(limite) || limite <= 0) {
            return res.status(400).json({ message: 'O limite de alunos deve ser um número válido maior que zero.' });
        }

        const newTurma = { 
            nomeTurma,
            projetoID,
            horario,
            dataInicio,
            dataFim,
            limiteAlunos: limite
        };

        // Chama o método de criação para adicionar a turma
        Turma.create(newTurma, (err, turmaId) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar a turma. Tente novamente mais tarde.' });
            }
            res.status(201).json({ message: 'Turma criada com sucesso', turmaId });
        });
    },

    // Obter uma turma pelo ID
    getTurmaById: (req, res) => {
        const turmaId = req.params.id;

        if (!turmaId) {
            return res.status(400).json({ message: 'ID da turma é obrigatório.' });
        }

        Turma.findById(turmaId, (err, turma) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar a turma.' });
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
                return res.status(500).json({ error: 'Erro ao buscar as turmas.' });
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

        if (!turmaId) {
            return res.status(400).json({ message: 'ID da turma é obrigatório.' });
        }

        Turma.findById(turmaId, (err, turma) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar a turma.' });
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
        const { nomeTurma, projetoID, horario, dataInicio, dataFim, limiteAlunos } = req.body;

        if (!nomeTurma  || !horario || !dataInicio || !dataFim) {
            return res.status(400).json({ message: 'Nome da turma, horário, data de início e data de fim são obrigatórios.' });
        }

        const limite = parseInt(limiteAlunos, 10) || null;
        if (limite !== null && (isNaN(limite) || limite <= 0)) {
            return res.status(400).json({ message: 'O limite de alunos deve ser um número válido maior que zero.' });
        }

        const updatedTurma = { 
            nomeTurma,
            projetoID,
            horario,
            dataInicio,
            dataFim,
            limiteAlunos: limite || undefined // Se não for fornecido, mantém como undefined
        };

        Turma.update(turmaId, updatedTurma, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar a turma. Tente novamente mais tarde.' });
            }
            res.json({ message: 'Turma atualizada com sucesso' });
        });
    }
};

module.exports = turmaController;
