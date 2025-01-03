const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController');

// Definindo as rotas
router.get('/', cadastroController.getAllCadastro); // Obter todos os cadastros
router.get('/new', cadastroController.renderCreateForm); // Formulário de criação de cadastro
router.post('/', cadastroController.createCadastro); // Criar um novo cadastro
router.get('/:id', cadastroController.getCadastroById); // Obter um cadastro pelo ID
router.get('/:id/edit', cadastroController.renderEditForm); // Formulário de edição de cadastro
router.put('/:id', cadastroController.updateCadastro); // Atualizar um cadastro existente
router.delete('/:id', cadastroController.deleteCadastro); // Deletar um cadastro existente

module.exports = router;
