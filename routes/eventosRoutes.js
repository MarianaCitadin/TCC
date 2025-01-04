const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');


// Definindo as rotas
router.get('/', eventosController.getAlleventos);
router.get('/new', eventosController.renderCreateForm);
router.post('/', eventosController.createeventos);
router.get('/:id', eventosController.geteventosById);
router.get('/:id/edit', eventosController.renderEditForm);
router.put('/:id', eventosController.updateeventos);
router.delete('/:id', eventosController.deleteeventos);



module.exports = router;
