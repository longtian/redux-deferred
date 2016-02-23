# redux-deferred
[![](https://img.shields.io/travis/wyvernnot/redux-deferred.svg)](https://travis-ci.org/wyvernnot/redux-deferred)
[![](https://img.shields.io/npm/v/redux-deferred.svg)](https://www.npmjs.com/package/redux-deferred)
[![](https://img.shields.io/coveralls/wyvernnot/redux-deferred.svg)](https://coveralls.io/github/wyvernnot/redux-deferred)
[![](https://img.shields.io/npm/l/redux-deferred.svg)](https://github.com/wyvernnot/redux-deferred/blob/master/LICENSE)

Redux middleware for jQuery [Deferred](http://api.jquery.com/category/deferred-object/) Object.

[![NPM](https://nodei.co/npm/redux-deferred.png)](https://nodei.co/npm/redux-deferred/)

## Preface

To create an AJAX request in jQuery is easy.

```js
$.get('some.url',function(result){
  // do things with result
})
```

It is not known by everyone that all AJAX method in jQuery return an [Deferred](http://api.jquery.com/category/deferred-object/)
Object for you to use. So above code can be rewriten like this:

```js
let deferredObject = $.get('some.url');
deferredObject.done(function(result){
  // do things with result
})
```

For this middleware to work you `MUST` wrap the deferredObject into the [payload](https://github.com/acdlite/flux-standard-action#payload)
of an action and then dispatch it.

```js
let action = {
   type:'LOAD_SOME',
   payload: deferredObject
}

store.dispatch(action);
```

Since Deferred is often async, the action wrapping it will not be dispatched until it is resolved or rejected.

And when it does, the action will be really dispatched with payload changed to the result value of the deferred.

```js
(state={},action)=>{
  switch(action.type){
    case 'LOAD_SOME':
      return Object.assign({},state,{
        data:action.payload
      });
   default:
      return state;
  }
}
```

**Error handling**

If the request fail, your can get error detail infomation in action's `payload` property.
While action's `error` property equals true.

```js
(state={},action)=>{
  switch(action.type){
    case 'LOAD_SOME':
      if(action.error){
        return Object.assign({},state,{
          error:action.payload
        });
      }else{
        return Object.assign({},state,{
          data:action.payload
        });
      }
   default:
      return state;
  }
}
```

That's all. The `redux-deferred` core code is below 30 lines. And heavily inspired by [redux-promise](https://github.com/acdlite/redux-promise).

## Usage

**Install**
```sh
npm install redux-deferred
```
**ES6**

```js
import DeferredMiddleware from 'redux-deferred';
let reducers= YOUR_REDUCER_DEFINITION;
let store = createStore(reducers,applyMiddleware(DeferredMiddleware));
```

## Reference

- [promisejs.org](https://www.promisejs.org/)
- [redux-promise](https://github.com/acdlite/redux-promise)
- [flux-standard-action](https://github.com/acdlite/flux-standard-action)
- [Deferred](http://api.jquery.com/category/deferred-object)


## Example

[redux-deferred](https://github.com/wyvernnot/redux-deferred-example)

## License

MIT

