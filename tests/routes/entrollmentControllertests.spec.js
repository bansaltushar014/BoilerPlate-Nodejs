const assert = require('assert');
const request = require('request');
const { describe, it } = require('mocha');

describe('Enrollment Login API', () => {
  describe('It should login with success', () => {
    it('status', () => {
      const requestBody = {
        email: 'email',
        password: 'password',
      };
      request.post('http://localhost:5002/enrollment/loginUser', { json: requestBody }, (error, response) => {
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.message, 'Loggedin!');
      });
    });
  });
  describe('It should catch error regarding credentials', () => {
    it('Login Error', () => {
      const requestBody = {
        email: 'email1',
        password: 'password',
      };
      request.post('http://localhost:5002/enrollment/loginUser', { json: requestBody }, (error, response) => {
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.message, 'Not Found Any!');
      });
    });
    it('Wrong Password', () => {
      const requestBody = {
        email: 'email',
        password: 'password1',
      };
      request.post('http://localhost:5002/enrollment/loginUser', { json: requestBody }, (error, response) => {
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.message, 'Wrong Credentials!');
      });
    });
  });
  describe('It should complete registration successfully', () => {
    it('Registration', () => {
      const requestBody = {
        name: 'test1',
        email: 'testemail1111',
        password: 'testpassword',
      };
      request.post('http://localhost:5002/enrollment/registerUser', { json: requestBody }, (error, response) => {
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.message, 'Registered!');
      });
    });
    it('Already Existing email', () => {
      const requestBody = {
        name: 'test',
        email: 'email',
        password: 'testpassword',
      };
      request.post('http://localhost:5002/enrollment/registerUser', { json: requestBody }, (error, response) => {
        assert.strictEqual(response.statusCode, 400);
        assert.strictEqual(response.body.message, 'Already existing email!');
      });
    });
  });
});
