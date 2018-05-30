import axios from 'axios';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getRootUrl from '../lib/getRootUrl';

const ROOT_URL = getRootUrl();

const initialState = {
  battleListReducer: {},
  battleCountReducer: {},
};

export const actionTypes = {
  FETCH_LIST: 'fetch_list',
  FETCH_COUNT: 'fetch_count',
};

const battleListReducer = (state = initialState.battleListReducer, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIST:
      return Object.assign({}, state, {
        listData: action.payload,
        listRoute: action.route,
      }) || false;
    default:
      return state;
  }
};
const battleCountReducer = (state = initialState.battleCountReducer, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COUNT:
      return Object.assign({}, state, {
        countData: action.payload,
        countRoute: action.route,
      }) || false;
    default:
      return state;
  }
};

// ACTIONS
export const fetchBattleLocationList = () => async (dispatch) => {
  const route = `${ROOT_URL}/api/list`;
  const res = await axios.get(route);
  dispatch({ type: actionTypes.FETCH_LIST, payload: res.data, route });
};
export const fetchBattleCount = () => async (dispatch) => {
  const route = `${ROOT_URL}/api/count`;
  const res = await axios.get(route);
  dispatch({ type: actionTypes.FETCH_COUNT, payload: res.data, route });
};

const rootReducer = combineReducers({
  battleListReducer,
  battleCountReducer,
});

export const initStore = (newInitialState = initialState) =>
  createStore(rootReducer, newInitialState, compose(applyMiddleware(thunkMiddleware)));
