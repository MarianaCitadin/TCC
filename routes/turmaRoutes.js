const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turmaController');


// Definindo as rotas
router.get('/', turmaController.getAllturma);
router.get('/new', turmaController.renderCreateForm);
router.post('/', turmaController.createturma);
router.get('/:id', turmaController.getturmaById);
router.get('/:id/edit', turmaController.renderEditForm);
router.put('/:id', turmaController.updateturma);
router.delete('/:id', turmaController.deleteturma);



module.exports = router;
