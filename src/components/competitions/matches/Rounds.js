import { get, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';

import { actions } from '../../../redux-sagas/sagas';
import '../../../App.css';
import '../../../css/Matches.css';
import Subtitle from '../../common/Subtitle';
import TableComponent from '../../common/TableComponent';
import Row from './Row';

const Rounds = ({title, competitionId}) => {
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
    // if (rounds === {}) {
    //   setRoundSelected(rounds[0]);
    // }

  }, [competitionId, getMatchesPerCompetition, rounds, state]);

  const headers = [
    {key: 'utcDate', text: ''},
    {key: 'homeTeam.name', text: ''},
    {key: ['score.fullTime.homeTeam', ' - ', 'score.fullTime.awayTeam'], text: 'Match'},
    {key: 'awayTeam.name', text: ''},

  ];

  const handleClick = round => {
    console.log(round);
    setRoundSelected(round);
  };

  return (
    <div>
      <Subtitle title={title} />
      <div className="matches">
        <div className="round-list">
          <FixedSizeList height={400} width={300} itemSize={40} itemCount={roundsSize}>
            {({index, style }) => <Row
                index={index}
                style={style}
                round={rounds[index]}
                onClick={() => handleClick(rounds[index])} />}
          </FixedSizeList>
        </div>
        <TableComponent headers={headers} rows={roundSelected.matches} css={'table-matches'} />
      </div>
    </div>
  );};

export default Rounds;
