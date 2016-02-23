/**
 * Created by yan on 16-2-23.
 */
function isDeferred(val) {
  return val && typeof val.then === 'function' && typeof val.state === 'function'
}

const middleware = ({dispatch,getState})=> {
  return (next)=>(action)=> {
    if (action.payload && isDeferred(action.payload)) {
      return action.payload.then(
        value=> {
          dispatch({
            ...action,
            payload: value
          });
        },
        error=> {
          dispatch({
            ...action,
            payload: error,
            error: true
          })
        });
    } else {
      return next(action);
    }
  }
}

export default middleware;