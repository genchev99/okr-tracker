import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import clsx from "clsx";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from '@material-ui/core/Backdrop';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    marginTop: '10px',
    alignItems: 'center',
    display: 'flex'
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function valuetext(value) {
  return value;
}

export default function KeyResult({getKeyResults, objectId, _id, title, description, range: {current: currentProps, max, min}}) {
  const classes = useStyles();

  const [current, setCurrent] = useState(currentProps);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.details}>
      <div className={classes.column}>
        <Typography id="discrete-slider-always" gutterBottom>
          {title}
        </Typography>
        <Slider
          value={current}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-always"
          onChange={(event, value) => setCurrent(value)}
          onChangeCommitted={(event, value) => api.keyResults.update(objectId, _id, value)}
          step={1}
          min={min}
          max={max}
          valueLabelDisplay="auto"
          marks={[
            {
              value: min,
              label: min.toString(),
            },
            {
              value: max,
              label: max.toString(),
            },
          ]}
        />
      </div>
      <div className={classes.column} />
      <div className={clsx(classes.column, classes.helper)}>
        <Typography variant="caption">
          <IconButton onClick={handleOpen} aria-label="info" >
            <InfoIcon fontSize="small" />
          </IconButton>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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
                <h2 id="transition-modal-title">Description</h2>
                <p id="transition-modal-description">{description}</p>
              </div>
            </Fade>
          </Modal>

          <IconButton aria-label="delete" onClick={() => api.keyResults.delete(objectId, _id).then(() => getKeyResults())}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Typography>
      </div>
    </div>
  );
}