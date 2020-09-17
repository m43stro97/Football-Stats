// import { get } from 'lodash';
import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import DenseAppBar from './components/common/DenseAppBar';
import CompetitionInfo from './components/pages/CompetitionInfo';
import HomePage from './components/pages/HomePage';

// import { actions} from './redux-sagas/sagas';

function App() {

  // const dispatch = useDispatch();
  // const {increment, decrement} = actions(dispatch);

  // const counter = useSelector(state => get(state, 'reducer.counter'));

  return (
    <div className="App">
      <DenseAppBar />
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/competition/:teamId/standings" component={CompetitionInfo} />
          {/* <Route exact path="/team/:id/" component={TeamInfo} /> */}

        </Switch>
      </div>
    </div>
  );

}

export default App;
