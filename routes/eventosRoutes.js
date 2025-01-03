const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');


// Definindo as rotas
router.get('/', eventosController.getAllCadastro);
router.get('/new', eventosController.renderCreateForm);
router.post('/', eventosController.createCadastro);
router.get('/:id', eventosController.getCadastroById);
router.get('/:id/edit', eventosController.renderEditForm);
router.put('/:id', eventosController.updateCadastro);
router.delete('/:id', eventosController.deleteCadastro);



module.exports = router;
