const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');


// Definindo as rotas
router.get('/', projetoController.getAllprojeto);
router.get('/new', projetoController.renderCreateForm);
router.post('/', projetoController.createprojeto);
router.get('/:id', projetoController.getprojetoById);
router.get('/:id/edit', projetoController.renderEditForm);
router.put('/:id', projetoController.updateprojeto);
router.delete('/:id', projetoController.deleteprojeto);



module.exports = router;
