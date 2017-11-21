process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const saveTestData = require('../../seed/test.seed');
const app = require('../../server');

describe('API - Comments', () => {
  let usefulData;
  beforeEach(() => mongoose.connection
    .dropDatabase()
    .then(saveTestData)
    .then((data) => {
      usefulData = data;
    })
    .catch((err) => console.log('Error!', err))
  );
  describe('PUT /comments/:comment_id', () => {
    it('correctly votes up a comment', () => {
      const commentId = usefulData.comments[0]._id;
      return request(app)
        .put(`/api/comments/${ commentId }?vote=UP`)
        .then((res) => {
          expect(res.body.comment.created_by).to.equal('northcoder');
          expect(res.body.comment.votes).to.equal(1);
        });
    });
  });
});
