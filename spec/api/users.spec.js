process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../../seed/test.seed');
const app = require('../../server');

describe('API - Users', () => {
  let usefulData;
  beforeEach(() => mongoose.connection
    .dropDatabase()
    .then(saveTestData)
    .then((data) => {
      usefulData = data;
    })
    .catch((err) => console.log('Error!', err))
  );
  describe('GET /users/:username', () => {
    it('correctly sends back a JSON object of the requested user details', () => {
      const username = usefulData.user.username;
      return request(app)
        .get(`/api/users/${ username }`)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .then((res) => {
          expect(res.body.user.username).to.be.a('string');
          expect(res.body.user.name).to.be.a('string');
          expect(res.body.user.avatar_url).to.be.a('string');
          expect(res.body.user).to.be.an('object');
        });
    });
  });
});
