process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');

const saveTestData = require('../../seed/test.seed');
const app = require('../../server');
const { Comment } = require('../../models');

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
  describe('Test database', () => {
    it('Saves the comments data to usefulData correctly', () => {
      expect(usefulData.comments.length).to.equal(2);
    });
  });
  describe('PUT /comments/:comment_id', () => {
    it('Correctly votes up a comment', () => {
      const commentId = usefulData.comments[0]._id;
      return request(app)
        .put(`/api/comments/${ commentId }?vote=UP`)
        .then((res) => {
          const comment = res.body.comment;
          expect(comment.created_by).to.equal('northcoder');
          expect(comment.votes).to.equal(1);
        });
    });
    it('Correctly votes down a comment', () => {
      const commentId = usefulData.comments[0]._id;
      return request(app)
        .put(`/api/comments/${ commentId }?vote=DOWN`)
        .then((res) => {
          const comment = res.body.comment;
          expect(comment.votes).to.equal(-1);
        });
    });
  });
  describe('DELETE /comments/:comment_id', () => {
    it('Correctly deletes the comment of a given comment_id', () => {
      const commentId = usefulData.comments[0]._id;
      return request(app)
        .delete(`/api/comments/${ commentId }`)
        .then((res) => {
          return Comment.findById(commentId)
            .then((comment) => {
              expect(comment).to.equal(null);
              expect(res.body.msg).to.equal('Comment deleted!');
            });
        });
    });
  });
});
