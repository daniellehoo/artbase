const artdb = require('../../models/artDB');

module.exports = {

  getAll(req, res, next) {
    artdb.getAllGenres()
      .then(data => {
        res.locals.genres = data;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getOne(req, res, next) {
    const genre_id = req.params.id;
    artdb.getOneGenre(genre_id)
      .then(data => {
        artdb.getAllArtistsByGenreId(genre_id)
          .then(genre_artists => {
            res.locals.genre = data;
            res.locals.genre_artists = genre_artists;
            next();
          });
      })
      .catch(err => {
        next(err);
      });
    },
};
