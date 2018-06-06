module.exports = {

  showAll(req, res) {
    res.render('users/index', {
      favorites: res.locals.favorites,
      artists: res.locals.artists,
    });
  },

  showOne(req, res) {
    // console.log("favorites in the view controller is: " + res.locals.favorites)
    res.render('users/show', {
      users: res.locals.users,
      user: res.locals.user,
      favorite_artists: res.locals.favorite_artists,
    });
  },

  form(req, res) {
    res.render('users/form', {
      user: res.locals.user,
    });
  },
};
