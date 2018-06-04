const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games');

// handle a request
router.get('/',(req, res) => res.render('home', {
  isHomepage: true
}));



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
