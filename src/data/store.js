
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

function configureStore() {
  const middlewares = [
    thunkMiddleware
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];

  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, {}, composedEnhancers);



  return store;
}

export default configureStore;