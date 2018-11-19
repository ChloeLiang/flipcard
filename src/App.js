import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import NavBar from './components/navBar';
import LoginForm from './components/loginForm';
import RegisterFrom from './components/registerForm';
import Logout from './components/logout';
import Decks from './components/decks';
import CardForm from './components/cardForm';
import Card from './components/card';
import auth from './services/userService';

const styles = theme => ({
  root: {
    height: '100vh',
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <ToastContainer />
        <Grid
          container
          direction="column"
          alignItems="stretch"
          className={classes.root}
        >
          <NavBar user={user} />
          <Grid container direction="column" className={classes.container}>
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterFrom} />
              <Route path="/logout" component={Logout} />
              <Route path="/cards/new" component={CardForm} />
              />
              <Route path="/decks/:id/cards" component={Card} />
              <Route path="/decks" component={Decks} />} />
            </Switch>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
