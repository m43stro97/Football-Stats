import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import logos from './logos';

const initialState = {
  counter: 0,
  competitionsList: [],
  competitionStandings: [],
  scorers: [],
};

const Api = 'http://api.football-data.org/v2/';
const headerParams = {
  headers: {
    'X-Auth-Token': '6626f2ecbce8498db583aaf226e9fffd'
  }
};

export const actions = dispatch => ({
  increment: () => dispatch({type: 'INCREMENT'}),
  decrement: () => dispatch({type: 'DECREMENT'}),
  getAllCompetitions: () => dispatch({type: 'GET_ALL_COMPETITIONS'}),
  getStandingsPerCompetition:
    competitionId => dispatch({type: 'GET_STANDINGS_PER_COMPETITION', payload: competitionId},),
  getScorersPerCompetition:
    competitionId => dispatch({type: 'GET_SCORERS_PER_COMPETITION', payload: competitionId}),
});

//REDUCER

export function reducer (state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT_STORE':
      return {...state, counter: state.counter + 1};
    case 'DECREMENT_STORE':
      return {...state, counter: state.counter - 1};
    case 'GET_ALL_COMPETITIONS_STORE':
      return {...state, competitionsList: action.competitionsList};
    case 'GET_STANDINGS_PER_COMPETITION_STORE':
      return {...state, competitionStandings: action.competitionStandings.data};
    case 'GET_SCORERS_PER_COMPETITION_STORE':
      console.log(action.scorers.data.scorers);
      return {...state, scorers: action.scorers.data.scorers};
    default:
      return state;
  }
};

//FUNCTIONS
function* increment() {
  yield put({ type: 'INCREMENT_STORE' });
}

function* decrement() {
  yield put({ type: 'DECREMENT_STORE' });
}

function* getAllCompetitions() {

  try {
    const competitionsList
      = yield call(axios.get, Api + 'competitions/', headerParams);

    const competitionsFiltered
      = competitionsList.data.competitions.filter(competitions => competitions.plan === 'TIER_ONE');

    const nextList = competitionsFiltered.reduce((acc, it) => {
      if ([2001, 2002, 2003, 2013, 2014, 2015, 2016, 2017, 2019, 2021].includes(it.id)) {
        it.image = (logos.find(logo => it.id === logo.value) || {}).url;
        return [...acc, it];
      }
      return acc;
    }, []);
    yield put({ type: 'GET_ALL_COMPETITIONS_STORE', competitionsList: nextList });
  } catch (error) {
    console.log(error);
  }
}

function* getStandingsPerCompetition(competitionId) {

  try {
    const competitionStandings
    = yield call(axios.get,
      `${Api}competitions/${competitionId.payload}/standings/`, headerParams);

    yield put({ type: 'GET_STANDINGS_PER_COMPETITION_STORE', competitionStandings });
  } catch (error) {
    console.log(error);
  }
}

function* getScorersPerCompetition(competitionId) {

  try {
    const scorers
    = yield call(axios.get,
      `${Api}competitions/${competitionId.payload}/scorers/`, headerParams);

    yield put({ type: 'GET_SCORERS_PER_COMPETITION_STORE', scorers });
  } catch (error) {
    console.log(error);
  }

}

//SAGAS
export default function* rootSaga() {
  yield takeEvery('INCREMENT', increment);
  yield takeEvery('DECREMENT', decrement);
  yield takeEvery('GET_ALL_COMPETITIONS', getAllCompetitions);
  yield takeEvery('GET_STANDINGS_PER_COMPETITION', getStandingsPerCompetition);
  yield takeEvery('GET_SCORERS_PER_COMPETITION', getScorersPerCompetition);

}
