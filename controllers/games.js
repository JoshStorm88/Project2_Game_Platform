const Game = require('../models/game.js');


function indexRoute(req, res){
  Game
    .find()
    .populate('creator')
    .exec()
    .then( games =>{
      res.render('games/index', {games});
    });
}
function showRoute(req, res){
  Game
    .findById(req.params.id)
    .exec()
    .then( game =>{
      res.render('games/show', {game});
    });
}
function newRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('games/new');
}
function createRoute(req, res){
  const gameData = req.body;
  gameData['creator'] = res.locals.user.id;
  Game
    .create(req.body)
    .then( game =>{
      return res.redirect(`/games/${game.id}`);
    });
}
function editRoute(req, res){
  Game
    .findById(req.params.id)
    .exec()
    .then( game =>{
      res.render('games/edit', {game});
    });
}
function updateRoute(req, res){
  console.log(req.body);
  Game
    .findById(req.params.id)
    .update(req.body)
    .then( game =>{
      return res.redirect(`/games/${req.params.id}`);
    });
}
function deleteRoute(req, res){
  Game
    .findById(req.params.id)
    .then( game =>{
      game.remove();
      return res.redirect('/games');
    });
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
