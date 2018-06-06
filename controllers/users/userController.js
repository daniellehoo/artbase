const artdb = require('../../models/artDB');
const bcrypt = require('bcrypt');

module.exports = {

  getAll(req, res, next) {
    artdb.getAllUsers()
      .then(data => {
        res.locals.users = data;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getOne(req, res, next) {
    artdb.getOneUser(req.params.id)
      .then(data => {
        artdb.getAllFavorites(req.body.id)
          .then(favorites => {
            res.locals.user = data;
            res.locals.favorites = favorites;
            next();
          });
      })
      .catch(err => {
        next(err);
      });
  },

// Produces the form to create a new user and hashes the password
  async new(req, res, next) {
    req.body.hashword = await bcrypt.hash(req.body.password, 5);
    artdb.createUser(req.body)
      .then(() => {
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
  },

  create(req, res, next) {
    artdb.createUser(userData)
      .then(data => {
        res.locals.user = data;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getUserFavorites(req, res, next) {
    artdb.getFavoriteArtistsByUserId(req.params.id)
      .then( favorite_artists => {
        res.locals.favorite_artists = favorite_artists;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  destroy(req, res) {
    artdb.destroyUser(req.params.id)
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        res.status(500).json({
          message: err.message,
        });
      });
  },

};
