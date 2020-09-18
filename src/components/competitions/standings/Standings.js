import { get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../../redux-sagas/sagas';
import '../../../App.css';
import TableComponent from '../../common/TableComponent';

const Standings = ({ competitionId}) => {

  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const {getStandingsPerCompetition} = actions(dispatch);
  const competitionStandings = useSelector(state => get(state, 'reducer.competitionStandings'));

  useEffect(() => {
    if (isEmpty(competitionStandings) || state) {
      getStandingsPerCompetition(competitionId);
      setState(false);
    }

  }, [competitionId, competitionStandings, getStandingsPerCompetition, state]);

  const headers = [
    {key: 'position', text: ''},
    {key: 'team.name', text: '', link: '/team/:id', propLink: 'team.id'},
    {key: 'playedGames', text: 'G'},
    {key: 'won', text: 'W'},
    {key: 'draw', text: 'D'},
    {key: 'lost', text: 'L'},
    {key: 'goalsFor', text: 'GF'},
    {key: 'goalsAgainst', text: 'GA'},
    {key: 'goalDifference', text: 'GD'},
    {key: 'points', text: 'P'},
  ];

  return (
    <div>
      <div className="row">
        {(competitionStandings.standings || []).map((it, index) => (
          <div className="column" key={`standings-${index}`}>
            <TableComponent title={it.type} rows={it.table} headers={headers} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Standings;
