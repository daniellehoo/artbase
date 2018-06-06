const bcrypt = require('bcrypt');
const artdb = require('../../models/artDB');

module.exports = {

  async login(req, res, next) {
    try {
    // 1. Retrieve the username and password from the POSTED body
      const { username, password } = req.body;
      const user = await artdb.findUserByUserName(username);
      const isValidPass = await bcrypt.compare(password, user.password);

      if (!isValidPass) {
        throw { message: 'Incorrect Password' };
      }

      req.session.currentUser = user;
      res.redirect('/users/' + user.id);
      next();
    } catch (err) {
      next(err);
    }
  },

  logout(req, res, next) {
    // destroy session
    // next will be called with either an error or undefined.
    // (negative or positive path)
    req.session.destroy(err => next(err));
  },
// Require authorization for certain pages//capabilities
  authorizationRequired: [
    async (req, res, next) => {
      if (req.session.currentUser.id == req.params.id) {
        next();
      } else {
        next('error');
        next();
      }
    },
    (err, req, res, next) => {
      res.redirect('/users/login');
    },
  ],
};
