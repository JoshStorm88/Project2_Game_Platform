const game = require('../models/game');

function gamesIndex(req, res){
  game
    .find()
    .exec()
    .then( games => {
      res.render('games/index', {
        title: 'All the RPG game goodness!',
        games
      });
    });
}

function gamesShow(req, res){
  game
    .findById(req.params.id)
    .exec()
    .then( game => {
      res.render('games/show', {game});
    });
}

function gamesNew(req, res){
  res.render('games/new');

}

function gamesCreate(req, res){
  game
    .create(req.body)
    .then((game) =>{
      return res.redirect(`/games/${game._id}`);
    });
}

function gamesEdit(req, res){
  game
    .findById(req.params.id)
    .exec()
    .then(game => {
      res.render('games/edit', {game});
    });
}
function gamesUpdate(req, res){
  game
    .findById(req.params.id)
    .exec()
    .then(game => {
      Object.assign(game, req.body);
      return game.save();
    });
  return res.redirect(`/games/${req.params.id}`);
}

function gamesDelete(req, res){
  game
    .findById(req.params.id)
    .exec()
    .then(game => {
      game.remove();
      return res.redirect('/games');
    });
}

module.exports = {
  index: gamesIndex,
  show: gamesShow,
  new: gamesNew,
  create: gamesCreate,
  edit: gamesEdit,
  update: gamesUpdate,
  delete: gamesDelete
};
