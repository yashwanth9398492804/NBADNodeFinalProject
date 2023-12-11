// controllers/tests/authenticator.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../../server'); 
const authController = require('../authenticator');

chai.use(chaiHttp);

describe('authenticator', () => {
  afterAll(() => {
    server.close();
  });

  describe('Login', () => {
    it('should return a token and refresh token for valid credentials', async () => {
      const res = await chai.request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'admin', password: 'password' });

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('message').to.equal('Login route');
    });

    it('should return an error for invalid username', async () => {
      const res = await chai.request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'invalid', password: 'password' });

      chai.expect(res).to.have.status(401);
      chai.expect(res.body).to.have.property('error').to.equal('Invalid username');
    });

    it('should return an error for invalid password', async () => {
      const res = await chai.request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({ username: 'admin', password: 'wrongpassword' });

      chai.expect(res).to.have.status(401);
      chai.expect(res.body).to.have.property('error').to.equal('Invalid password');
    });
  });

  describe('Register', () => {
    it('should register a new user with valid credentials', async () => {
      const res = await chai.request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({ username: 'newuser', password: 'newpassword' });

      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.have.property('message').to.equal('Register route');
    });

    it('should return an error for existing username', async () => {
      const res = await chai.request(app)
        .post('/register')
        .set('Content-Type', 'application/json')
        .send({ username: 'admin', password: 'password' });

      chai.expect(res).to.have.status(409);
      chai.expect(res.body).to.have.property('error').to.equal('Username already exists');
    });
  });
});
