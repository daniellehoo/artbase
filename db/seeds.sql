--remove records of tables and initiate id sequence
DROP DATABASE IF EXISTS artbase_db;

DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS artists CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;

--create tables for genres, artists, users, and favorites

CREATE TABLE genres (
id          SERIAL PRIMARY KEY NOT NULL,
name        VARCHAR(256),
img_url     VARCHAR(256)
);

CREATE TABLE artists (
id          SERIAL PRIMARY KEY,
name        VARCHAR(128),
year_born   INT,
nationality VARCHAR(128),
genre       INT REFERENCES genres (id),
img_url     VARCHAR(256)
);

CREATE TABLE users (
id          SERIAL PRIMARY KEY NOT NULL,
username    VARCHAR(128) UNIQUE,
password    VARCHAR(128) NOT NULL
);

CREATE TABLE favorites (
user_id     INT REFERENCES users (id),
artist_id   INT REFERENCES artists (id)
);

INSERT INTO genres
(name, img_url)
VALUES
('Arte Povera', 'http://i580.photobucket.com/albums/ss244/16milesofstring/merz3.jpg'),
('Minimalism', 'https://i.pinimg.com/originals/56/be/1b/56be1bf0c6d1211150f61ccdecb756bd.jpg'),
('Abstract Expressionism', 'http://tanyamelamori.files.wordpress.com/2014/05/black-in-deep-red.jpg?w=450'),
('Conceptualism', 'https://d5wt70d4gnm1t.cloudfront.net/media/a-s/articles/1221-116525114929/how-to-think-about-conceptual-art-900x450-c.jpg'),
('Contemporary Photography', 'http://www.bjp-online.com/wp-content/uploads/2017/03/Rineke-Dijkstra_Kolobrzeg-Poland-July-26-1992-798x1024.jpg'),
('Contemporary Chinese Art', 'https://eightartgallery.files.wordpress.com/2011/12/5-yue-minjun-lot-1029.jpg');


INSERT INTO artists
(name, year_born, nationality, genre, img_URL)
VALUES
('Ai Wei Wei', 1957, 'Chinese', 6,
  'https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/mT7/image/1F6GpxReiXpAaq6FeyZgo8AqJ0Y.jpg'),
('Frank Stella', 1936, 'American', 2,
  'https://www.interviewmagazine.com/wp-content/uploads/2014/11/img-frank-stella_195155794319-1000x630.jpg'),
('Mario Merz', 1925, 'Italian', 1, 'http://www.tate.org.uk/art/images/work/AR/AR00598_10.jpg'),
('Andreas Gursky', 1955, 'German', 6,
  'https://d7hftxdivxxvm.cloudfront.net/?resize_to=fit&width=528&height=300&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F0CGRSzEVHVpPnaFm6vZH6w%2Flarge.jpg'),
('Franz Kline', 1910, 'American', 3,
  'http://www.galleryintell.com/wp-content/uploads/2013/10/Franz-Kline_Mahoning-1956_ArtEx.jpg'),
('Sol LeWitt', 1928, 'American', 4,
  'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/t/collection_images/tvodiOgUKcDv.jpg');

INSERT INTO users
(username, password)
VALUES
('PhilYooSees', 'Iloveguns'),
('ACraftDraws', 'Ilovedraw');

INSERT INTO favorites
(user_id, artist_id)
VALUES
(1, 3),
(1, 4),
(2, 5),
(2, 6);
