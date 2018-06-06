module.exports = {

  showAll(req, res) {
    res.render('artists/index', {
      artists: res.locals.artists,

    });
  },

  showOne(req, res) {
    res.render('artists/show', {
      artist: res.locals.artist,
      user: res.locals.user,
      artistData: res.locals.artistData,
    });
  },

  form(req, res) {
    res.render('artists/form', {
      action: res.locals.action,
      artist: res.locals.artist,
      genres: res.locals.genres,
    });
  },

};
