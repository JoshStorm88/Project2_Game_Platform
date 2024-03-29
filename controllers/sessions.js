const user = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}

function createRoute(req, res) {
  user
    .findOne({email: req.body.email })
    .then( (user)=>{
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).render('sessions/new', {message: 'Incorrect Login Information'});
      }
      req.session.userId = user.id;

      return res.redirect('/');
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
