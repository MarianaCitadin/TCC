const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController'); // Certifique-se de que este caminho está correto

// Rota para exibir o formulário de cadastro
router.get('/cadastrar', eventosController.showCadastroForm);

// Rota para processar o cadastro de eventos
router.post('/cadastrar', eventosController.cadastrarEvento);

// Rota para listar todos os eventos
router.get('/', eventosController.listarEventos);

module.exports = router;
