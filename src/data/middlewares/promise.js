const promiseMiddleware = () => (next) => (action) => {
    const { promise, type, ...rest } = action;

    if(!promise || typeof promise.then !== 'function') {
        return next();
    }

    const REQUEST = `${type}_REQUEST`;
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    next({ type: REQUEST, ...rest });

    return promise
        .then(response => response.json())
        .then(data => next({ type: SUCCESS, payload: data, ...rest}))
        .catch(error => next({ type: FAILURE, error, ...rest}));
};

export default promiseMiddleware;