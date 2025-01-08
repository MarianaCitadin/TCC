const Audiovisual = require('../models/audiovisualModel');
const path = require('path');

// Criar um novo audiovisual
const createAudiovisual = (req, res) => {
    const newAudiovisual = {
        NomeArquivo: req.file.filename,  // O nome do arquivo gerado pelo Multer
        TipoArquivo: req.file.mimetype,   // Tipo do arquivo (PDF)
        ProjetoID: req.body.ProjetoID,
    };

    Audiovisual.create(newAudiovisual, (err, audiovisualId) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Audiovisual criado com sucesso', audiovisualId });
    });
};

// Obter um audiovisual pelo ID
const getAudiovisualById = (req, res) => {
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
};

// Obter todos os audiovisuais
const getAllAudiovisual = (req, res) => {
    Audiovisual.getAll((err, audiovisuais) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ audiovisuais });
    });
};

// Renderizar o formulário de criação
const renderCreateForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/audiovisual.html'));
};

// Atualizar um audiovisual
const updateAudiovisual = (req, res) => {
    const audiovisualId = req.params.id;
    const updatedAudiovisual = {
        NomeArquivo: req.file.filename,  // Atualiza o nome do arquivo
        TipoArquivo: req.file.mimetype,   // Atualiza o tipo do arquivo
        ProjetoID: req.body.ProjetoID,
    };

    Audiovisual.update(audiovisualId, updatedAudiovisual, (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Audiovisual atualizado com sucesso' });
    });
};

// Deletar um audiovisual
const deleteAudiovisual = (req, res) => {
    const audiovisualId = req.params.id;

    Audiovisual.delete(audiovisualId, (err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Audiovisual deletado com sucesso' });
    });
};

module.exports = {
    createAudiovisual,
    getAudiovisualById,
    getAllAudiovisual,
    renderCreateForm,
    updateAudiovisual,
    deleteAudiovisual
};
