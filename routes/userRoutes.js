const express = require('express');
const router  = express.Router();
const usersController = require('../controllers/usersController');

router.route('/create')
      .post(usersController.createUser);
router.route('/edit')
      .put(usersController.updateUser);
router.route('/delete')
      .delete(usersController.deleteUser);
router.route('/:id')
      .get(usersController.getUser);
router.route('/')
      .get(usersController.listUsers);

module.exports = router;

