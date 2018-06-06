module.exports = {
  showLoginForm(req, res) {
    res.render('users/login', {
      user: {},
    });
  },
  handleError(err, req, res, next) {
    res.render('users/error');
  },
  showRegisterForm(req, res) {
    res.render('users/form');
  },

  handleCreateUser(req, res) {
    res.redirect('/users/:id');
  },
  handleLogout(req, res) {
    res.redirect('/');
  },
  handleDelete(req, res) {
    res.redirect('/');
  },
};
