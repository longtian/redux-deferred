/**
 * Created by yan on 16-2-23.
 */

const middleware = ({dispatch,getState})=> {
  return (next)=>(action)=> {
    if (action.payload && action.payload.then) {
      action.payload.then(value=> {
        next({
          ...action,
          payload: value
        });
      }, error=> {
        next({
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