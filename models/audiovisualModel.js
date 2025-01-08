const db = require('../config/db'); // Supondo que você já tenha a conexão configurada
const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Defina o diretório de destino
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Gera um nome único para o arquivo
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Somente arquivos PDF são permitidos.'));
        }
        cb(null, true);
    }
}).single('pdf-upload');  // Certifique-se que 'pdf-upload' seja o nome correto do campo

const Audiovisual = {
    create: (audiovisual, callback) => {
        const query = 'INSERT INTO TbAudiovisuais (NomeArquivo, TipoArquivo, ProjetoID) VALUES (?, ?, ?)';
        db.query(query, [audiovisual.NomeArquivo, audiovisual.TipoArquivo, audiovisual.ProjetoID], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM TbAudiovisuais WHERE AudiovisualID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // Retorna apenas o primeiro resultado
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM TbAudiovisuais';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os registros
        });
    },

    update: (id, audiovisual, callback) => {
        const query = 'UPDATE TbAudiovisuais SET NomeArquivo = ?, TipoArquivo = ?, ProjetoID = ? WHERE AudiovisualID = ?';
        db.query(query, [audiovisual.NomeArquivo, audiovisual.TipoArquivo, audiovisual.ProjetoID, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM TbAudiovisuais WHERE AudiovisualID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    }
};

module.exports = Audiovisual;
