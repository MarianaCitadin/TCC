const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

router.get('/', loginController.renderLoginForm);
router.post('/', loginController.processLogin);
router.get('/recover', loginController.renderRecoverForm);
router.post('/recover', loginController.processRecover);
router.get('/logout', loginController.logout);

module.exports = router;
