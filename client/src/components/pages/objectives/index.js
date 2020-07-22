import React, {useContext, useEffect, useState} from 'react';
import Objective from "./Objective";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {makeStyles} from "@material-ui/core/styles";
import api from "../../../api";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 292,
    maxWidth: 300,
  }
}));

const Objectives = () => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [description, setDescription] = useState('');
  const [existingDepartments, setExistingDepartments] = useState([]);
  const [objectives, setObjectives] = useState([]);

  const getDepartments = () => {
    api.departments.get().then(({data}) => {
      setExistingDepartments(data.departments);
    }).catch(err => {
      console.error(err);
    });
  };

  const getObjectives = () => {
    api.objectives.get().then(({data}) => {
      setObjectives(data.objectives);
    }).catch(err => {
      console.error(err);
    });
  };

  const createObjective = async (objective) => {
    return await api.objectives.create(objective)
      .catch(err => {
        console.error(err);
      })
  };

  useEffect(() => {
    getDepartments();
    getObjectives();
  }, []);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" style={{'paddingTop': '30px'}}>
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddBoxIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new objective
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={20} sm={8}>
                <TextField
                  autoComplete="title"
                  name="title"
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">Department</InputLabel>
                  <Select
                    fullWidth={true}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Department"
                    onChange={(event) => setDepartment(event.target.value)}
                  >
                    {existingDepartments.map(({name}) =>
                      (<MenuItem value={name}>{name}</MenuItem>)
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                createObjective({
                  title,
                  description,
                  department,
                })
                  .catch(err => console.error(err))
                  .then(() => getObjectives());
              }}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
      {objectives.map(objective => (<Container component="main" maxWidth="md" style={{'paddingTop': '10px'}}>
        <Objective objective={objective}/>
      </Container>))}

    </React.Fragment>
  );
};

export default Objectives;