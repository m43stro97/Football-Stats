import '../../App.css';
import '../../css/TableStandings.css';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { get } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';

import Title from '../common/Title';
import Scorers from '../competitions/scorers/Scorers';
import Standings from '../competitions/standings/Standings';

const CompetitionInfo = ({match}) => {

  const competitionId = match.params.teamId;

  const [value, setValue] = React.useState('1');

  const competitionStandings = useSelector(state => get(state, 'reducer.competitionStandings'));
  const name = get(competitionStandings, ['competition', 'name'], '');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Title title={name} />
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Standings" value="1" />
            <Tab label="Scorers" value="2" />
          </TabList>
        </AppBar>
        <TabPanel value="1">
          <Standings subtitle={'STANDINGS'} competitionId={competitionId} />
        </TabPanel>
        <TabPanel value="2">
          <Scorers title={'SCORERS'} competitionId={competitionId} />
        </TabPanel>
      </TabContext>

    </div>
  );
};

export default CompetitionInfo;
