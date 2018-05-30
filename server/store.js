import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getRootUrl from '../lib/getRootUrl';

const ROOT_URL = getRootUrl();

const initialState = {
  skycopReducer: 0,
};

export const actionTypes = {
  FETCH_RES: 'fetch_res',
};

const skycopReducer = (state = [], action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.FETCH_RES:
      return action.payload || false;
    default:
      return state;
  }
};

// ACTIONS
export const fetchSkycopResponse = () => async (dispatch) => {
  const url = `${ROOT_URL}/static/skycop-response.json`;
  await fetch(url)
    .then(jsonData => jsonData.json())
    .then((payload) => {
      // you can access your data here
      dispatch({ type: actionTypes.FETCH_RES, payload });
    });
};

const rootReducer = combineReducers({
  skycopReducer,
});

export const initStore = (newInitialState = initialState) =>
  createStore(rootReducer, newInitialState, compose(applyMiddleware(thunkMiddleware)));
