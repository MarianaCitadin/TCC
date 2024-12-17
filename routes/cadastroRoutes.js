const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController');


// Definindo as rotas
router.get('/', cadastroController.getAllCadastro);
router.get('/new', cadastroController.renderCreateForm);
router.post('/', cadastroController.createCadastro);
router.get('/:id', cadastroController.getCadastroById);
router.get('/:id/edit', cadastroController.renderEditForm);
router.put('/:id', cadastroController.updateCadastro);
router.delete('/:id', cadastroController.deleteCadastro);



module.exports = router;
