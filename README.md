# Northcoders News Project

My reimplementation of the Northcoders News Sprint, a Reddit style website with C.R.U.D method API endpoints. A fully tested backend API created using: `Node.js`, `Express.js` and `MongoDB`. The database has been deployed to [mLab](https://mlab.com/home "mLab homepage") and the API has been deployed to [Heroku](https://nrthcdrs-nws-api.herokuapp.com "Northcoders News API").
___

## Setup

To run this project, you will need `node.js` (v8.9.1) and `npm` (v5.5.1) installed.

1. To check whether you have `node.js` installed, run the following code in your terminal:

``` node
node -v
```

2. To install `node.js`, please refer to the following [documentation](https://nodejs.org/en/ "Node.js Homepage").

3. To check whether you have `npm` installed, run the following code in your terminal:

``` node
npm -v
```

4. To install `npm`, please refer to the following [documentation](https://docs.npmjs.com "NPM Homepage").

___

## Installation

1. In your _**main**_ terminal window, clone this repo to your local machine:

``` node
git clone https://github.com/Haribo7891/Northcoders-News-Project
```

2. And install the dependencies:

``` node
npm install
```

3. In a _**seperate**_ terminal window, run the following command:

``` node
mongod
```

4. Back in your _**main**_ terminal window, populate the database:

``` node
npm run seed:development
```

5. To run the tests:

``` node
npm test
```

6. To check the API, in a new browser window navigate to:

``` node
localhost:3000
```

___

## API Route Endpoints

The following endpoints are available on both the `localhost` and <https://nrthcdrs-nws-api.herokuapp.com>:

### Articles

Return all the articles:

``` HTML
GET /api/articles
```

Return all the comments for an individual article:

``` HTML
GET /api/articles/:article_id/comments
```

Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down':

``` HTML
PUT /api/articles/:article_id?vote=down
```

Add a new comment to an article. This route requires a JSON body with a comment key and value pair:

``` HTML
POST /api/articles/:article_id/comments
```

### Comments

Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down':

``` HTML
PUT /api/comments/:comment_id?vote=up
```

Deletes a comment if the comment was created by the Northcoder user:

``` HTML
DELETE /api/comments/:comment_id
```

### Topics

Return all the topics:

``` HTML
GET /api/topics
```

Return all the articles for a certain topic:

``` HTML
GET /api/topics/:topic/articles
```

### Users

Returns a JSON object with the profile data for the specified user:

``` HTML
GET /api/users/:username
```

___

## Dependencies

The following dependencies were used in the making of this project:

* [Mocha](https://mochajs.org "Mocha.js Homepage") - The testing framework.
* [Chai](http://chaijs.com "Chai.js Homepage") - The assertion library.
* [Supertest](https://www.npmjs.com/package/supertest "Supertest Homepage") - HTTP assertion package.
* [Express](https://expressjs.com "Express.js Homepage") - Web application framework.
* [Body-Parser](https://www.npmjs.com/package/body-parser "Body-Parser Homepage") - Body parsing middleware.
* [Dotenv](https://www.npmjs.com/package/dotenv "Dotenv Homepage") - Environment variables tool.
* [MongoDB](https://www.mongodb.com "MongoDB Homepage") - NoSQL document database.
* [Mongoose](http://mongoosejs.com "Mongoose.js Homepage") - Schema-based object modelling tool.

___

## Author

[Harry Crank](https://github.com/Haribo7891 "Harry's Github Homepage")
___

## Acknowledgments

Inspired by [Reddit](https://www.reddit.com "Reddit Homepage") and completed as part of a project at [Northcoders](https://northcoders.com/ "Northcoders Homepage") bootcamp.