const express = require('express');
const router = express.Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const gamesController = require('../controllers/games');

router.get('/',(req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/')
  .get(gamesController.index);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);


router.route('/logout')
  .get(sessions.delete);


router.route('/games')
  .get(gamesController.index)
  .post(gamesController.create);

router.route('/games/new')
  .get(gamesController.new);

router.route('/games/:id')
  .get(gamesController.show)
  .put(gamesController.update)
  .delete(gamesController.delete);

router.route('/games/:id/edit')
  .get(gamesController.edit);


module.exports = router;
