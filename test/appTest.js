const chai = require('chai');
const assert = chai.assert;
const request = require('supertest');
const app = require('../app.js');
const th = require('./testHelper');

describe('app', () => {

  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app)
        .get('/bad')
        .expect(404)
        .end(done)
    })
  })
  describe('GET /', () => {
    it('redirects to login.html', done => {
      request(app)
        .get('/')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /login', () => {
    it('serves login page', done => {
      request(app)
        .get('/login')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(/TODO APP/)
        .end(done)
    })
  })
  describe('get /login', () => {
    it('shows login failed message for invalid credentials', (done) => {
      request(app)
        .get('/login')
        .set('Cookie','logInFailed=true')
        .expect(/LOGIN FAILED/)
        .expect(200)
        .expect(th.doesNotHaveCookies)
        .end(done);
    })
  })
  describe.skip('GET /home', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/home')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe.skip('GET /logout', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/logout')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /createTodo', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/createTodo')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /viewTodo', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/viewTodo')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /editTodo', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/editTodo')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('GET /deleteTodo', () => {
    it('redirects to login if not loggedIn', done => {
      request(app)
        .get('/deleteTodo')
        .expect(302)
        .expect('Location', '/login')
        .end(done)
    })
  })
  describe('POST /login', () => {
    it('redirects to homePage when login credentials are valid', done => {
      request(app)
        .post('/login')
        .send('name=viraj')
        .expect(302)
        .expect('Location', '/home')
        .end(done);
    })
    it('redirects to login page when login credentials are invalid', done => {
      request(app)
        .post('/login')
        .send('name=vp')
        .expect(302)
        .expect('Location', '/login')
        .expect('set-cookie', 'logInFailed=true; Max-Age=5')
        .end(done);
    })
  })
  // describe('POST /addTodo', () => {
  //   it('stays at createTodo page', done => {
  //     request(app, {
  //         method: 'POST',
  //         url: '/addTodo',
  //         body: 'title=pg&description=sleep',
  //         headers: {
  //           cookie: 'sessionid=1234'
  //         }
  //       },
  //       (res) => {
  //         th.should_be_redirected_to(res, '/login');
  //         th.should_not_have_cookie(res, 'logInFailed');
  //         done();
  //       })
  //   })
  // })
  // describe('POST /addTask', () => {
  //   it('redirects to login if not loggedIn', done => {
  //     request(app, {
  //       method: 'POST',
  //       url: '/addTask',
  //       body: 'todoID=1&taskTitle=sleep',
  //       headers: {
  //         cookie: 'sessionid=1234'
  //       }
  //     }, (res) => {
  //       th.should_be_redirected_to(res, '/login');
  //       th.should_not_have_cookie(res, 'logInFailed');
  //       done();
  //     })
  //   })
  // })
  // describe('POST /deleteTodo', () => {
  //   it('redirects to login if not loggedIn', done => {
  //     request(app, {
  //       method: 'POST',
  //       url: '/deleteTodo'
  //     }, (res) => {
  //       th.should_be_redirected_to(res, '/login');
  //       done();
  //     })
  //   })
  // })
})
