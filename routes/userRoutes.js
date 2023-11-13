const express = require('express');
const router  = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT       = require('../middleware/verifyJWT');

router.route('/create')
      .post(usersController.createUser);
router.route('/edit')
      .put(usersController.updateUser);
router.route('/delete')
      .delete(usersController.deleteUser);
router.route('/:id')
      .get(verifyJWT, usersController.getUser);
router.route('/')
      .get(usersController.listUsers);

module.exports = router; 

 /*
  *   God kept me safe when i had appendicitis. 
  * 
  *   God brought me through my driving test when the instructor was fighting to unfairly fail me. 
  * 
  *   God has blessed me to live a healthy life when the doctor's told my parents I would be mentally challenged. 
  *  
  *   God has brought me through my addiction to foul language. 
  * 
  *   God kept me from being kidnapped in the street as a child. 
  * 
  *   God never let me go even when I was enticed by my lusts. 
  * 
  *   God protected me from a truck driver who fell asleep on the highway. 
  * 
  *   God protected me from encountering someone who trespassed on our property. 
  * 
  *   God sent His Son, Jesus, to die on the cross for my sins. 
  *   God has forgiven my sins, and chooses not to bring them up again. 
  *   God has given me His Holy Spirit to live in me. 
  *   God has a destiny/purpose for me. To that end He has given me a certain grace. 
  * 
  *   Thank You, GOD! 
  */