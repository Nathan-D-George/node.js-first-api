const express = require('express');
const router  = express.Router();
const path    = require('path');

router.get('/about2', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

module.exports = router;