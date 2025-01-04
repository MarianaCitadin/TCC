const express = require('express');
const router = express.Router();
const audiovisualController = require('../controllers/audiovisualController');


// Definindo as rotas
router.get('/', audiovisualController.getAllaudiovisual);
router.get('/new', audiovisualController.renderCreateForm);
router.post('/', audiovisualController.createaudiovisual);
router.get('/:id', audiovisualController.getaudiovisualById);
router.get('/:id/edit', audiovisualController.renderEditForm);
router.put('/:id', audiovisualController.updateaudiovisual);
router.delete('/:id', audiovisualController.deleteaudiovisual);



module.exports = router;
