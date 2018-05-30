import axios from 'axios';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import getRootUrl from '../lib/getRootUrl';

const ROOT_URL = getRootUrl();

const initialState = {
  battleListReducer: {},
  battleCountReducer: {},
  battleStatsReducer: {},
  battleSearchReducer: {},
};

export const actionTypes = {
  FETCH_LIST: 'fetch_list',
  FETCH_COUNT: 'fetch_count',
  FETCH_STATS: 'fetch_stats',
  SEARCH_ACTION: 'search_action',
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
const battleStatsReducer = (state = initialState.battleStatsReducer, action) => {
  switch (action.type) {
    case actionTypes.FETCH_STATS:
      return Object.assign({}, state, {
        statsData: action.payload,
        statsRoute: action.route,
      }) || false;
    default:
      return state;
  }
};
const battleSearchReducer = (state = initialState.battleStatsReducer, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_ACTION:
      return Object.assign({}, state, {
        searchData: action.payload,
        searchRoute: action.route,
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
export const fetchBattleStats = () => async (dispatch) => {
  const route = `${ROOT_URL}/api/stats`;
  const res = await axios.get(route);
  dispatch({ type: actionTypes.FETCH_STATS, payload: res.data, route });
};
export const submitSearch = values => async (dispatch) => {
  const route = `${ROOT_URL}/api/search`;
  const res = await axios.post(route, values);
  dispatch({ type: actionTypes.SEARCH_ACTION, payload: res.data, route });
};

const rootReducer = combineReducers({
  battleListReducer,
  battleCountReducer,
  battleStatsReducer,
  battleSearchReducer,
});

export const initStore = (newInitialState = initialState) =>
  createStore(rootReducer, newInitialState, compose(applyMiddleware(thunkMiddleware)));
