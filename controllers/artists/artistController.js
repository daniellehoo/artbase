const artdb = require('../../models/artDB');
const fetch = require('node-fetch');

module.exports = {

  getAll(req, res, next) {
    artdb.getAllArtists()
      .then(data => {
        res.locals.artists = data;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  async getOne(req, res, next) {
    // Get query parameter from req.body from search;
    // make fetch call to Artsy API with dynamic variable
    artdb.getOneArtist(req.params.id)
      .then(async function (artist) {
        res.locals.artist = artist;
        let str = artist.name;
        str = str.replace(/\s+/g, '-').toLowerCase();
        // Begin API query
        async function search(qry) {
          const response = await fetch(
            `https://api.artsy.net:443/api/artists/${qry}`,
            {
              headers: {
                'X-Xapp-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUyNDkyNDM5NiwiaWF0IjoxNTI0MzE5NTk2LCJhdWQiOiI1YWQ2YjcyYzc2MjJkZDMzOWNiMTM4N2QiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWFkYjQ1NmM3NjIyZGQyZTVhZmY0YjY4In0.oEXyM8TzHTvHZmneZdMHD7hNwgZBoF5XdXx5wIx363I',
                'Accept': 'application/vnd.artsy-v2+json',
              },
            },
          );
          const json = await response.json();
          res.locals.artistData = json;
          Object.keys(res.locals.artistData).forEach(x => {
          });
        }
        await search(str);
        // End API query
        next();
      })
      .catch(err => {
        res.json(err);
      });
  },

  new(req, res, next) {
    artdb.getAllGenres()
      .then(data=> {
        res.locals.action = 'new';
        res.locals.artist = {};
        res.locals.genres = data;
        next();
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  create(req, res, next) {
    artistData = {
      name: req.body.name,
      year_born: req.body.year_born,
      nationality: req.body.nationality,
      genre: req.body.genre,
      img_url: req.body.img_url,
    };
    artdb.createArtist(artistData)
      .then(data => {
        res.redirect('/artists/');
      })
      .catch(err => {
        next(err);
      });
  },

  edit(req, res, next) {
    artdb.getOneArtist(req.params.id)
      .then(artist => {
        artdb.getAllGenres()
          .then(genre => {
            res.locals.action = 'edit';
            res.locals.artist = artist;
            res.locals.genres = genre;
            next();
          });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  update(req, res) {
    req.body.id = req.params.id;
    artdb.updateArtist(req.body)
      .then(data => {
        res.redirect(`/artists/${req.body.id}`);
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  },

  destroy(req, res) {
    artdb.destroyArtist(req.params.id)
      .then(() => {
        res.redirect('/artists');
      })
      .catch(err => {
        res.status(500).json({
          message: err.message,
        });
    });
  },

};
