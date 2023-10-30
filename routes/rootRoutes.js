const express = require('express');
const router  = express.Router();
const path    = require('path');
const sessionsController = require('../controllers/sessionsController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});



module.exports = router;