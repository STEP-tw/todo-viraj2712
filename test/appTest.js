let chai = require('chai');
let assert = chai.assert;
let request = require('./requestSimulator.js');
let app = require('../app.js');
let th = require('./testHelper.js');

describe('app',()=>{
  describe('GET /bad',()=>{
    it('responds with 404',done=>{
      request(app,{method:'GET',url:'/bad'},(res)=>{
        assert.equal(res.statusCode,404);
        done();
      })
    })
  })
  describe('GET /',()=>{
    it('redirects to index.html',done=>{
      request(app,{method:'GET',url:'/'},(res)=>{
        th.status_is_ok(res);
        done();
      })
    })
  })
  describe('GET /index.html',()=>{
    it('gives the index page',done=>{
      request(app,{method:'GET',url:'/index.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'TODO APP');
        done();
      })
    })
  })
  describe('GET /login.html',()=>{
    it('serves the login page',done=>{
      request(app,{method:'GET',url:'/login.html'},res=>{
        th.status_is_ok(res);
        th.body_contains(res,'Name :');
        th.body_does_not_contain(res,'login failed');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('POST /login',()=>{
    it('redirects to homePage for valid user',done=>{
      request(app,{method:'POST',url:'/login',body:'name=viraj'},res=>{
        th.should_be_redirected_to(res,'/homePage.html');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('GET /logout',()=>{
    it('redirects to home page',done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        th.should_not_have_cookie(res,'message');
        done();
      })
    })
  })
  describe('GET /addList',()=>{
    it('redirects to add todo list page',done=>{
      request(app,{method:'GET',url:'/addList'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        done();
      })
    })
  })
  describe('GET /addList.html',()=>{
    it('serves add todo list page',done=>{
      request(app,{method:'GET',url:'/addList.html'},res=>{
        th.body_contains(res,'Title :');
        done();
      })
    })
  })
  describe('GET /logout',()=>{
    it('redirects to home page',done=>{
      request(app,{method:'GET',url:'/logout'},res=>{
        th.should_be_redirected_to(res,'/index.html');
        // th.body_contains(res,'Title :');
        done();
      })
    })
  })
})
