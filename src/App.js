import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Landing from './containers/Landing/Landing';
import Logout from './containers/Auth/Logout/Logout';
import { withFirebase } from './firebase';
import * as ROUTES from './constants/routes';
import * as actionCreators from './redux-store/redux-actions/actionCreators';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={ROUTES.LANDING_PAGE} exact component={Landing} />
        <Route path={ROUTES.LOGOUT} component={Logout} />
        <Redirect to={ROUTES.LANDING_PAGE} />
      </Switch>
    );
    return <Layout>{routes}</Layout>;
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.unsubscribeAuthStateObserver = firebase.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.props.dispatchUserSignedIn();
        } else {
          this.props.dispatchUserSignedOut();
        }
      }
    );
    this.unsubscribeIdTokenObserver = firebase.auth.onIdTokenChanged((user) => {
      firebase.currentUser = user;
      if (user) {
        localStorage.setItem('currentFirebaseUser', JSON.stringify(user));
      } else {
        localStorage.removeItem('currentFirebaseUser');
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuthStateObserver && this.unsubscribeAuthStateObserver();
    this.unsubscribeIdTokenObserver && this.unsubscribeIdTokenObserver();
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchUserSignedIn: () => dispatch(actionCreators.userSignedIn()),
    dispatchUserSignedOut: () => dispatch(actionCreators.userSignedOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withFirebase(App));
