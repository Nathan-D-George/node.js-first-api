const express = require('express');
const router  = express.Router();
const path    = require('path');
const aboutController = require('../controllers/aboutController');

// http://localhost:3000/about/

// router.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'views', 'about.html'));
// });
router.get('/',  aboutController.aboutApi);
router.post('/', (req, res) => {
  res.json({ 
    "firstname": req.body.firstname,
    "lastname":  req.body.lastname
  });
});
router.put('/', (req, res) => {
  res.json({ 
    "firstname": req.body.lastname,
    "lastname":  req.body.firstname
  });
});

module.exports = router;
