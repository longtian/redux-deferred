/**
 * Created by yan on 16-2-23.
 */

import {applyMiddleware,createStore,compose} from 'redux';
import middleware from '../src/middleware.es6';
import {equal} from 'assert';
import {env} from 'jsdom';
import $ from 'jquery';

describe('middleware', function () {

  let Deferred;

  /**
   *  @link https://github.com/jquery/jquery/blob/2.2.1/test/promises_aplus_adapter.js
   */
  before(done=> {
    env("", function (error, window) {
      Deferred = $(window).Deferred;
      done();
    });
  });

  it('works with resolve', function (done) {

    var store = createStore((state = {}, action)=> {
      switch (action.type) {
        case 'AAA':
          equal(action.payload, 'ok');
          done();
          return state;
          break;
        default:
          return state;
      }
    }, applyMiddleware(middleware));

    var payload = new Deferred();

    store.dispatch({
      type: 'AAA',
      payload
    });

    setTimeout(()=> {
      payload.resolve('ok');
    });
  })

  it('works with reject', function (done) {

    var store = createStore((state = {}, action)=> {
      switch (action.type) {
        case 'AAA':
          equal(action.payload, 'error');
          equal(action.error, true);
          done();
          return state;
          break;
        default:
          return state;
      }
    }, applyMiddleware(middleware));

    var payload = new Deferred();

    store.dispatch({
      type: 'AAA',
      payload
    });

    setTimeout(()=> {
      payload.reject('error');
    });
  })
});