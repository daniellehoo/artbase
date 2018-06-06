// Bring in Express and invoke router
const express = require('express');

// Require controllers
const artistController = require('../controllers/artists/artistController');
const artistViewsController = require('../controllers/artists/artistViewsController');
const genreController = require('../controllers/genres/genreController');
const genreViewsController = require('../controllers/genres/genreViewsController');
const userController = require('../controllers/users/userController');
const userViewsController = require('../controllers/users/userViewsController');
const favoritesController = require('../controllers/favorites/favoritesController');
const authController = require('../controllers/auth/authController');
const authViewsController = require('../controllers/auth/authViewsController');

// Invoke the router
const artRouter = express.Router();

// Routes

artRouter.get('/', (req, res) => {
  res.render('views/home/index');
});

// Artist Routes

artRouter.route('/artists/edit/:id')
  .get(artistController.edit, artistViewsController.form);

artRouter.route('/artists/new')
  .get(artistController.new, artistViewsController.form);

artRouter.route('/artists/:id')
  .get(artistController.getOne, artistViewsController.showOne)
  .put(artistController.update)
  .delete(artistController.destroy);

artRouter.route('/artists')
  .get(artistController.getAll, artistViewsController.showAll, sendError)
  .post(artistController.create);

artRouter.route('/artists/edit/:id')
  .get(artistController.edit, artistViewsController.form);

// Genre routes
artRouter.route('/genres/:id')
  .get(genreController.getOne, genreViewsController.showOne, sendError);

artRouter.route('/genres')
  .get(genreController.getAll, genreViewsController.showAll);

// User Routes
artRouter.route('/users/new')
  .get(userViewsController.form);

artRouter.route('/users/login')
  .get(authViewsController.showLoginForm, authViewsController.handleError)
  .post(authController.login, authViewsController.handleError);

artRouter.route('/users/logout')
  .get(authController.logout, authViewsController.handleLogout);

artRouter.route('/users/:id/favorites/')
  .post(authController.authorizationRequired, favoritesController.addNewFavorite)
  .delete(authController.authorizationRequired, favoritesController.destroy);

artRouter.route('/users/:id')
  .get(authController.authorizationRequired, userController.getOne, userController.getUserFavorites, userViewsController.showOne)
  .delete(userController.destroy);

artRouter.route('/users')
  .get(userController.getAll, userViewsController.showAll)
  .post(userController.getAll, userController.new, userViewsController.showAll);

function sendError(err, req, res, next) {
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
}

module.exports = artRouter;
