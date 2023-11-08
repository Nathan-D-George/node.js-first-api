const app    = require('express');
const router = app.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin); 

module.exports = router;
