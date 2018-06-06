const db = require('../config/connection');

// Methods for SQL queries

module.exports = {

// Artist Queries

  getAllArtists() {
    return db.many(`
      SELECT artists.*,
      artists.genre as genre_name
      FROM artists
      JOIN genres
      ON (artists.genre = genres.id)
      ORDER BY artists.name
      `);
  },

  getAllArtistsByGenreId(genre_id) {
    return db.many(`
      SELECT artists.*,
      artists.genre as genre_name
      FROM artists
      JOIN genres
      ON (artists.genre = genres.id)
      WHERE genres.id = $1
      ORDER BY artists.name
      `, genre_id);
  },

  getOneArtist(id) {
    return db.one(`
      SELECT artists.name,
      artists.year_born,
      genres.name as genre_name,
      artists.nationality,
      artists.img_url,
      artists.genre AS genre_id,
      artists.id
      FROM artists
      JOIN genres
      ON (artists.genre = genres.id)
      WHERE artists.id = ${id}`);
  },

  createArtist(artist) {
    return db.one(`
      INSERT INTO artists (
      name,
      year_born,
      nationality,
      genre,
      img_url
      ) VALUES (
      \'${artist.name}\',
      \'${artist.year_born}\',
      \'${artist.nationality}\',
      ${artist.genre},
      \'${artist.img_url}\'
      )
      RETURNING id
      `);
  },

  updateArtist(artist) {
    return db.one(`
      UPDATE artists
      SET
      name = $/name/,
      year_born = $/year_born/,
      nationality = $/nationality/,
      genre = $/genre/,
      img_url = $/img_url/
      WHERE id = $/id/
      RETURNING *`,
    artist);
  },

  destroyArtist(id) {
    return db.none(`
      DELETE FROM favorites WHERE favorites.artist_id=$1;
      DELETE FROM artists WHERE artists.id=$1;
      `, id);
  },

 // Genre queries

  getAllGenres() {
    return db.many(`
      SELECT name, id
      FROM genres
      ORDER BY genres.name
      `);
  },

  getOneGenre(id) {
    return db.one(`
      SELECT genres.*
      FROM genres
      WHERE genres.id = ${id}`);
  },

  // User queries

  getAllUsers() {
    return db.many(`
      SELECT username, id
      FROM users
      `);
  },

  getOneUser(id) {
    return db.one(`
      SELECT username, id
      FROM users
      WHERE users.id = ${id}`);
  },

  findUserByUserName(username) {
    return db.one(`
      SELECT *
      FROM users
      WHERE users.username='${username}'
      LIMIT 1
      `);
  },

  createUser(user) {
    return db.one(`
      INSERT INTO users (
      username,
      password
      ) VALUES (
      $/username/,
      $/hashword/
      )
      RETURNING *`,
    user,
    );
  },

  destroyUser(id) {
    return db.none(`
      DELETE FROM favorites
      WHERE favorites.user_id = $1;
      DELETE FROM users
      WHERE id = $1`, id);
  },

  // Favorites queries

  getFavoriteArtistsByUserId(userId) {
    return db.query(`
      SELECT artists.name AS name,
      artists.id AS id
      FROM favorites
      JOIN artists
      ON (favorites.artist_id = artists.id)
      WHERE favorites.user_id = $1
      `, userId);
  },

  getAllFavorites(userData) {
    return db.many(`
      SELECT artists.name AS artist_name
      FROM favorites
      JOIN artists
      ON (favorites.artist_id = artists.id)
      `);
  },

  addNewFavorite(userID, artistID) {
    return db.one(`
      INSERT INTO favorites (
      user_id,
      artist_id
      ) VALUES (
      ${userID},
      ${artistID}
      )
      RETURNING *`);
  },

  destroyFavorite(userID, artistID) {
    return db.none(`
      DELETE FROM favorites
      WHERE user_id = ${userID} AND
      artist_id = ${artistID}
      `);
  },
};
