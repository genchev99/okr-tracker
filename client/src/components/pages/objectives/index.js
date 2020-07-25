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
import CreateKeyResult from "./CreateKeyResult";
import FeaturedPost from "../../FeaturedPost";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff1744',
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

  const clearFields = () => {
    setTitle('');
    setDepartment('');
    setDescription('');
  }


  const getDepartments = async () => {
    return await api.departments.get().then(({data}) => {
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
    getDepartments().then(() => getObjectives());
  }, []);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="md" style={{'paddingTop': '30px'}}>
        <CssBaseline/>
        <Grid container spacing={4}>
          <FeaturedPost post={{
            title: 'Objectives',
            date: 'direction',
            description:
              'Describes where you would like to go.',
            image: 'https://www.colorhexa.com/ff1744.png',
            imageText: 'Objectives',
          }}/>
          <FeaturedPost post={{
            title: 'Key results',
            date: 'points',
            description:
              'Describes how you will get there.',
            image: 'https://www.colorhexa.com/ffd64d.png',
            imageText: 'Key results',
          }}/>
        </Grid>
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
              // color="primary"
              className={classes.submit}
              style={{backgroundColor: '#ff1744', color: 'white'}}
              onClick={() => {
                createObjective({
                  title,
                  description,
                  department,
                })
                  .catch(err => console.error(err))
                  .then(() => getObjectives())
                  .finally(() => clearFields());
              }}
            >
              Create
            </Button>
          </form>
        </div>
      </Container>
      {objectives.map(objective => (<Container component="main" maxWidth="md" style={{'paddingTop': '10px'}}>
        <Objective getObjectives={getObjectives} objective={objective}/>
      </Container>))}
    </React.Fragment>
  );
};

export default Objectives;