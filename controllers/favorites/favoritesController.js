const artdb = require('../../models/artDB');

module.exports = {

  addNewFavorite(req, res, next) {
    artdb.getFavoriteArtistsByUserId(req.params.id)
      .then (favorite_artists => {
        let favoriteAlreadyExists = false;
        favorite_artists.forEach(artist => {
          if (artist.id == req.body.artist_id) {
            favoriteAlreadyExists = true;
          }
        });
        if (favoriteAlreadyExists) {
          res.redirect(`/users/${req.params.id}`);
        } else {
          artdb.addNewFavorite(req.session.currentUser.id, req.body.artist_id)
            .then(data => {
              res.redirect(`/users/${req.params.id}`);
            });
        }
      })
      .catch(err => {
        next(err);
      });
  },

  destroy(req, res) {
    artdb.destroyFavorite(req.params.id, req.body.artist_id)
      .then(() => {
        res.redirect(`/users/${req.params.id}`);
      })
      .catch(err => {
        res.status(500).json({
          message: err.message,
        });
      });
  },

  };
