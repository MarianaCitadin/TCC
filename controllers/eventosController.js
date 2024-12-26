const path = require('path');
const eventosModel = require('../models/eventosModel');

// Função para exibir o formulário de cadastro de eventos
const showCadastroForm = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'adicionarEventos.html'));
};

// Função para processar o cadastro de um evento
const cadastrarEvento = (req, res) => {
    const { NomeEvento, DataEvento, LocalEvento, ProjetoID } = req.body;

    if (!NomeEvento || !DataEvento) {
        return res.status(400).send('Nome do evento e data do evento são obrigatórios.');
    }

    const evento = {
        NomeEvento,
        DataEvento,
        LocalEvento: LocalEvento || null, // Local é opcional
        ProjetoID: ProjetoID || null      // ProjetoID é opcional
    };

    eventosModel.addEvento(evento, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar evento:', err);
            return res.status(500).send('Erro ao cadastrar evento.');
        }
        res.status(201).send('Evento cadastrado com sucesso!');
    });
};

// Função para listar todos os eventos
const listarEventos = (req, res) => {
    eventosModel.getAllEventos((err, results) => {
        if (err) {
            console.error('Erro ao buscar eventos:', err);
            return res.status(500).send('Erro ao buscar eventos.');
        }
        res.status(200).json(results);
    });
};

// Exporta as funções
module.exports = {
    showCadastroForm,
    cadastrarEvento,
    listarEventos
};
