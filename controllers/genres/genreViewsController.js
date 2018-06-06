module.exports = {

  showAll(req, res) {
    res.render('genres/index', {
      genres: res.locals.genres,
    });
  },

  showOne(req, res) {
    res.render('genres/show', {
      genre: res.locals.genre,
      genre_artists: res.locals.genre_artists,
    });
  },

};
