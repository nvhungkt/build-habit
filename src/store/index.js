import { applyMiddleware, createStore, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerReducer } from 'react-router-redux';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore);
const initialState = {};

class Store {
  constructor() {
    if (!Store.instance) {
      Store.instance = this;
    }

    return Store.instance;
  }

  configureStore() {
    this.store = createStoreWithMiddleware(this.createReducer(), initialState);
    this.store.asyncReducers = {};

    return this.store;
  }

  createReducer = asyncReducers => {
    return combineReducers({
      ...asyncReducers,
      routing: routerReducer
    });
  };

  injectReducer = (name, asyncReducer) => {
    this.store.asyncReducers[name] = asyncReducer;
    this.store.replaceReducer(this.createReducer(this.store.asyncReducers));
  };
}

export const store = new Store();