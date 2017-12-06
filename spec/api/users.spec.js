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
  describe('Test database', () => {
    it('Saves the user data to usefulData correctly', () => {
      expect(usefulData.user.username).to.equal('northcoder');
    });
  });
  describe('GET /users/:username', () => {
    it('Correctly sends back a JSON object of the requested user details', () => {
      const username = usefulData.user.username;
      return request(app)
        .get(`/api/users/${ username }`)
        .expect(200)
        .then((res) => {
          const user = res.body.user;
          expect(user.username).to.be.a('string');
          expect(user.name).to.be.a('string');
          expect(user.avatar_url).to.be.a('string');
          expect(user).to.be.an('object');
        });
    });
    it('Sends back an error message when given an invalid username', () => {
      return request(app)
        .get('/api/users/harry')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Invalid username');
        });
    });
  });
});
