import { get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../../redux-sagas/sagas';
import '../../../App.css';
import Subtitle from '../../common/Subtitle';
import TableComponent from '../../common/TableComponent';

import '../../../css/TableStandings.css';

const Scorers = ({title, competitionId}) => {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const { getScorersPerCompetition} = actions(dispatch);
  const scorers = useSelector(state => get(state, 'reducer.scorers'));

  useEffect(() => {
    if (isEmpty(scorers) || state) {
      getScorersPerCompetition(competitionId);
      setState(false);
    }

  }, [competitionId, getScorersPerCompetition, scorers, state]);

  const headers = [
    {key: 'numberOfGoals', text: 'Goals'},
    {key: 'player.name', text: 'Player'},
    {key: 'player.position', text: 'Position'},
    {key: 'team.name', text: 'Team'},
  ];

  return (
    <div>
      <Subtitle title={title} />
      <div className="table-scorers">
        <TableComponent headers={headers} rows={scorers} />
      </div>
    </div>
  );
};
export default Scorers;
