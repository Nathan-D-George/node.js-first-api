const express = require('express'); 
const router  = express.Router(); 
const path    = require('path'); 
const data    = {}; 
const showsController = require('../controllers/showsController'); 
 
data.shows = require('../models/anime.json');  
 
// http://localhost:30000/shows/  
router.route('/')  
  .get(  (req, res) => {  res.json(data.shows);  })
  .post(showsController.createShow)
  .put(showsController.updateShow)
  .delete(showsController.deleteShow);

router.route('/:id').get(showsController.getShow);

module.exports = router;   
