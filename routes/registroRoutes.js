const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');


// Definindo as rotas
router.post('/registros', registroController.createRegistro);  // Criar um novo registro
router.get('/registros/:id', registroController.getRegistroById);  // Obter um registro por ID
router.get('/registros', registroController.getAllRegistros);  // Obter todos os registros
router.put('/registros/:id', registroController.updateRegistro);  // Atualizar um registro
router.delete('/registros/:id', registroController.deleteRegistro);  // Deletar um registro


module.exports = router;
