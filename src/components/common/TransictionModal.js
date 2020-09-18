import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import '../../css/Modal.css';
import ButtonComponent from './ButtonComponent';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionModal({buttonText, match}) {
  console.log('MODAL', match);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonComponent title={buttonText} onClick={handleOpen} />
      <Modal
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {`${match.homeTeam.name} vs ${match.awayTeam.name}`}
            </h2>
            <div className="row-modal">
              <div className="column-modal">
                <p id="transition-modal-description" className="info-title">
                  Referees:
                </p>
                <ul>
                  {match.referees.map(it => <li className="info">
                    {it.name}
                  </li>)}
                </ul>
              </div>
              <div className="column-modal">
                <p id="transition-modal-description" className="info-title">
                  Odds:
                </p>
                <ul>
                  <li className="info">
                    Home Win :
                    {' '}
                    {match.odds.homeWin}
                  </li>
                  <li className="info">
                    Draw :
                    {' '}
                    {match.odds.draw}
                  </li>
                  <li className="info">
                    Away Win:
                    {' '}
                    {match.odds.awayWin}
                  </li>
                </ul>
              </div>
            </div>

            <p>

            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
