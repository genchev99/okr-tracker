import React, {useContext, useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddCircleIcon from '@material-ui/icons/Add';
import api from '../../../api';
import SnackbarContext from "../../../contexts/SnackbarContext";

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
}));

export default function CreateKeyResult({objective, getKeyResults}) {
  const {error, success, warn} = useContext(SnackbarContext);

  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(100);

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setQuantity(100);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddCircleIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Attach new key result
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="oktitle"
                name="oktitle"
                variant="outlined"
                required
                fullWidth
                id="oktitle"
                label="Title"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="okquantity"
                label="Quantity"
                name="okquantity"
                autoComplete="okquantity"
                value={quantity}
                isNumericString
                onChange={event => setQuantity(parseInt(event.target.value))}
              />
            </Grid>
            <Grid item xs={12} sm={20}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="okdesc"
                label="Description"
                name="okdesc"
                autoComplete="okdesc"
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{backgroundColor: '#ffd64d', color: '#2b2b2b'}}
            className={classes.submit}
            onClick={() => api.keyResults.create(objective, {
              title,
              description,
              quantity,
            }).then(() => success('Key result was successfully created!'))
              .catch(err => error(err.toString()))
              .then(() => getKeyResults())
              .finally(() => clearFields())
            }
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
