# Project 2: Art App

## Project Description

Art Journal: Art Journal is a full-stack CRUD application that incorporates 
the Artsy Artist API and allows users to create a custom collection of 
their 'favorite' artists.

## Application Components

Landing/home page
Login/authentication
Logout
CRUD(create, read, update, delete) functionality
Sorting capabilities (by artist or genre)

## Video

![Video](https://vimeo.com/266235651)

## Deployed App
![Hosted App](https://artbasedb.herokuapp.com/)

## Whiteboarding: Wireframes/User Stories and Priority Matrix

![Whiteboard Wireframes/User Stories and Priority Matrix] (https://imgur.com/a/a1O53)
![Wireframe.cc Homepage rendering] (https://imgur.com/a/D9lfTwJ)
![Wireframe.cc Priority Matrix] (https://imgur.com/a/7Jw2yih)

## Technologies, APIs, and Modules Used

Artsy API: The Artsy API provides the public with access to artwork,
auction, and artist information from artsy.net for educational and
non-commercial user.

Modules Used:
-Node (a framework for CRUD functionality on a server/database)
-Express (a library used with node.js)
-Body-parser (body-parsing middleware to parse incoming requests)
-Ejs (templating to generate HTML with JavaScript)
-Eslint (used for linting//cleaning code)
-Fetch (used to make async fetch requests for incorporating APIs)
-Morgan (an HTTP request logger middlewware for Node.js)
-Path (module that provides a means of working with directories and file paths)
-Bcrypt (secures passwords with hashing functionality)
-dotenv (loads environmental variables)
-Express-session (used to maintain userdata)

## Code Snippet
![Code Snippet] (https://imgur.com/a/OPkLJuZ)
* This is a snippet of code from my 'Favorites' controller. 
The code here is requiring the models file and exporting functions that
manipulate a user's 'Favorites'. The 'addNewFavorite' function is a 
middleware function that uses the current user's id (req.params.id) and 
adds a new favorite to the database (in the reference table joining users 
and artists) if that artist does not already exist in that particular user's 
favorites. If the favorite already exists and the user tries to add the artist,
the user will be redirected to their user homepage.

## Art App 2.0 (Fixes and Added Features)
* Additional feature enabling a user to create a collection of favorites
* Additional feature populating a database of artworks for each individual artist
* Ability to 'follow' other users and view their favorites and collections

## Instructions for Downloading and Running on Local Host
* Step 1: Fork and clone the following git repo: https://git.generalassemb.ly/daniellehoo/project-2
* Step 2: CD into the DB file of the root directory
* Step 3: In terminal use the following command: psql -f seeds.sql
* Step 4: In terminal use the following command: npm init -y
* Step 5: In terminal use the following command: npm i [body-parser ejs express morgan path pg-promises fetch]
* Step 6: CD into the DB file
* Step 7: In terminal use the following command: psql -f seeds.sql
* Step 8: In terminal use the following command: npm run dev
* Step 9: In browser: open http://localhost:3000/
* Step 10: Begin exploring ArtBase!

## MVP

* CRUD Functionality
* CSS and styles
* Authenication//sessions login capabilities
* Full stack app

## POST MVP

* Artsy API
* Allowing users to 'favorite' individual artworks

| Component                 | Priority | Estimated Time | Actual Time |
| ---                       | :---:    |  :---:         | :---:       |
| README and Wireframes     | H        | 2.25 hrs       |  TBD hrs    | 
| Seed and Schema Data      | H        | 2 hrs          |  TBD hrs    | 
| Build Out Server          | H        | 2 hrs          |  TBD hrs    | 
| Build Controllers         | H        | 4 hrs          |  TBD hrs    | 
| Build Out Routes          | H        | 2 hrs          |  TBD hrs    | 
| Views/Partials            | H        | 4 hrs          |  TBD hrs    | 
| Page Layout/Design        | M        | 4 hrs          |  TBD hrs    |  
| CRUD functionality        | H        | 8 hrs          |  TBD hrs    |
| Authentication            | M        | 5 hrs          |  TBD hrs    | 
| Incorporate API           | M        | 5 hrs          |  TBD hrs    | 
| Video                     | M        | .5 hrs         |  TBD hrs    | 
| Total                     |          | 38.75 hrs      |  TBD hrs    | 
