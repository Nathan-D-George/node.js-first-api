const Show = require('../models/Anime');  
  
const listShows = async (req, res) => {  
  res.json({  
      "name":   req.body.name,  
      "genre":  req.body.genre,  
      "rating": req.body.rating  
    }  
  );  
}  

const getShow = async (req, res) => { 
  if (!req?.params?.id) { 
    return res.status(404).json({ 'Not Found': 'No ID provided' }); 
  } 
  console.log(` id given: ${req.params.id}`);
  const show = await Show.findById( req.params.id ); 
  if (!show){ 
    return res.status(404).json({ 'Not Found': 'No show match ID ${req.params.id}.' }); 
  } 
  res.status(200).json(show); 
} 

const createShow = async (req, res) => {  
  if (!req?.body?.name || !req?.body?.rating || !req?.body?.genre) {  
    res.status(400).json({ 'message': 'A name, rating and genre are all required!' });  
  }  
  
  try {  
    const show = await Show.create({  
      name: req.body.name,  
      rating: req.body.rating,  
      genre: req.body.genre  
    });  
    console.log(show);
    res.status(200).json({ 'success': `created model for ${show.name}` });
    
  } catch(err) {  [[]]
    console.log(err);  
  }  
}  

const updateShow = async (req, res) => { 
  if (!req?.body?.id){
    return res.status(400).json({ 'message': 'ID required'});
  }
  const show = await Show.findOne({ _id: req.body.id }).exec();
  if (!show) {
    return res.status(204).json({ 'message': `No show matches ID ${req.body.id}` });
  }
  if (req?.body?.name)   show.name   = req.body.name;
  if (req?.body?.rating) show.rating = req.body.rating;
  if (req?.body?.genre)  show.genre  = req.body.genre;
  const result = await show.save();
  console.log(result);
  res.status(200).json({ 'success': `Updated ${show.name}` });
}

const deleteShow = async (req, res) => { 
  if (!req?.body?.id){ 
    return res.status(400).json({ 'message': 'ID required!'}); 
  } 
  const show = await Show.findOne({ _id: req.body.id }).exec(); 
  if (!show) { 
    return res.status(404).json({ 'message': `Not Found. No show matches ID ${req.body.id}` });
  } 
  const deleteResult = await show.deleteOne();
  console.log(deleteResult);
  res.status(200).json({ 'success': 'Deleted the entry'});
} 

module.exports = { listShows, getShow, createShow, updateShow, deleteShow };  


