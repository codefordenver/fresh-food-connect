export default function createApiPromise(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      return promise(client).then(
        (result) => next({...rest, result, type: SUCCESS}),
        (errors) => {
          alert(errors.join('\n'));
          next({...rest, errors, type: FAILURE});
        }
      );
    };
  };
}
