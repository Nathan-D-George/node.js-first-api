const express = require('express');
const router  = express.Router();
const path    = require('path');
const sessionsController = require('../controllers/sessionsController');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
});
router.post('/about', (req, res) => {
  res.json({ 
    "firstname": req.body.firstname,
    "lastname":  req.body.lastname
  });
});
router.put('/about', (req, res) => {
  res.json({
    "firstname": req.body.lastname,
    "lastname":  req.body.firstname
  });
});

router.post('/login',    sessionsController.newSession);
router.delete('/logout', sessionsController.endSession);

module.exports = router;