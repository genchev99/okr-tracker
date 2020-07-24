import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/ExpansionPanel';
import AccordionDetails from '@material-ui/core/ExpansionPanelDetails';
import AccordionSummary from '@material-ui/core/ExpansionPanelSummary';
import AccordionActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CreateKeyResult from "./CreateKeyResult";
import api from '../../../api';
import KeyResult from "./KeyResult";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  desc: {
    fontSize: theme.typography.pxToRem(20),
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
  details: {
    alignItems: 'center',
  },
}));

export default function DetailedAccordion({getObjectives, objective: {_id, title, description, department, kr} = {}}) {
  const classes = useStyles();

  const [keyResults, setKeyResults] = useState([]);

  const getKeyResults = async () => {
    return await api.keyResults.get(_id)
      .then(({data}) => setKeyResults(data.keyResults || []))
      .catch(err => console.error(err))
  };

  useEffect(() => {
    getKeyResults();
  }, []);

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>{title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{department.name}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div style={{'width': '100%'}}>
            <Typography style={{marginBottom: '15px'}} className={classes.desc}>{description} </Typography>
            <Divider/>
            {keyResults.map(res => (
              <React.Fragment>
                <KeyResult getKeyResults={getKeyResults} objectId={_id} _id={res._id} description={res.description} range={res.range} title={res.title}/>
                <Divider/>
              </React.Fragment>
            ))}
            <CreateKeyResult objective={_id} getKeyResults={getKeyResults}/>
          </div>
        </AccordionDetails>
        <Divider/>
        <AccordionActions>
          <Button
            size="small"
            onClick={() => api.objectives.delete(_id).then(() => getObjectives())}
          >
            Delete
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => api.objectives.archive(_id).then(() => getObjectives())}
          >
            Archive
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}