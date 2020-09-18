import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { actions } from '../../../redux-sagas/sagas';
import '../../../App.css';
import '../../../css/Matches.css';
import Subtitle from '../../common/Subtitle';
import TableComponent from '../../common/TableComponent';
import Row from './Row';

const Rounds = ({ competitionId}) => {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  const { getMatchesPerCompetition} = actions(dispatch);
  const rounds = useSelector(state => get(state, 'reducer.rounds'));
  const roundsSize = rounds.length;

  const [roundSelected, setRoundSelected] = useState({});

  useEffect(() => {
    if (isEmpty(rounds) || state) {
      getMatchesPerCompetition(competitionId);
      setState(false);
    }
    if (!isEmpty(rounds) && isEmpty(roundSelected)) {
      setRoundSelected(rounds[0]);
    }

  }, [competitionId, getMatchesPerCompetition, roundSelected, rounds, state]);

  const headers = [
    {key: 'utcDate', text: ''},
    {key: 'homeTeam.name', text: ''},
    {key: ['score.fullTime.homeTeam', ' - ', 'score.fullTime.awayTeam'],
      text: 'Match', type: 'button'},
    {key: 'awayTeam.name', text: ''},
  ];

  const handleClick = round => {
    setRoundSelected({...round});
  };

  return (
    <div>
      <Subtitle title={`Round ${roundSelected.title}`} />
      <div className="main">
        <div className="round-list">
          <FixedSizeList height={450} itemSize={40} itemCount={roundsSize}>
            {({index, style }) => <Row
                index={index}
                style={style}
                round={rounds[index]}
                onClick={() => handleClick(rounds[index])} />}
          </FixedSizeList>
        </div>
        <div className="matches-table">
          <div className="matches">
            <TableComponent
                headers={headers}
                rows={roundSelected.matches}
                css={'table-matches'} />
          </div>
        </div>

      </div>

    </div>
  );};

export default Rounds;
