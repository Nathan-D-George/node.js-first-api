const aboutApi = async (req, res) => {
  res.json({ 'message': 'this is the about from the controller' });
}

module.exports = { aboutApi }; 
