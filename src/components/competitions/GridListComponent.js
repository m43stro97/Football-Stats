import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { isEmpty } from 'lodash';
import get from 'lodash/get';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../../App.css';
import { actions } from '../../redux-sagas/sagas';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    alignContent: 'start',
    alignSelf: 'center',
    // justifySelf: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop: '100px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const GridListComponent = () => {

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {getAllCompetitions} = actions(dispatch);

  const competitionsList = useSelector(state => get(state, 'reducer.competitionsList'));

  useEffect(() => {
    if (isEmpty(competitionsList)) {
      getAllCompetitions();
    }
  }, [competitionsList, getAllCompetitions]);

  const handleClick = id => {
    history.push(`/competition/${id}/standings`);
  };

  return (

    <div className={classes.root}>
      <GridList cellHeight={180} spacing={10} cols={5} className={classes.gridList}>
        {competitionsList.map(res => {
          const area = get(res, ['area', 'name']);
          return (
            <GridListTile >
              <img src={res.image} alt={res.title} className={'logo'} />
              <GridListTileBar
                  className={'overlay'}
                  title={res.name}
                  subtitle={<span>
                    {area}
                  </span>}
                  actionIcon={
                    <IconButton className={classes.icon} onClick={() => handleClick(res.id)}>
                      <InfoIcon />
                    </IconButton>
                  }
              />
            </GridListTile>
          );})}
      </GridList>
    </div>
  );
};

export default GridListComponent;
