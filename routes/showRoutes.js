const express = require('express');
const router  = express.Router();
const path    = require('path');
const data    = {};

data.shows = require('../models/anime.json');

// http://localhost:30000/shows/
router.route('/')
  .get(  (req, res) => {  res.json(data.shows);  })
  .post( (req, res) => {
    res.json({
      "name":   req.body.name,
      "genre":  req.body.genre,
      "rating": req.body.rating      
    });
  })

module.exports = router;