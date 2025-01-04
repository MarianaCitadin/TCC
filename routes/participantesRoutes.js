const express = require('express');
const router = express.Router();
const participantesController = require('../controllers/participantesController');


// Definindo as rotas
router.get('/', participantesController.getAllparticipantes);
router.get('/new', participantesController.renderCreateForm);
router.post('/', participantesController.createparticipantes);
router.get('/:id', participantesController.getparticipantesById);
router.get('/:id/edit', participantesController.renderEditForm);
router.put('/:id', participantesController.updateparticipantes);
router.delete('/:id', participantesController.deleteparticipantes);



module.exports = router;
