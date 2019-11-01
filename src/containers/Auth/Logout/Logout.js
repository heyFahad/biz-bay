import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { withFirebase } from '../../../firebase';
import * as ROUTES from '../../../constants/routes';

class Logout extends Component {
    render() {
        return <Redirect to={ROUTES.LANDING_PAGE} />;
    };
    componentDidMount() {
        this.props.firebase.doSignOut();
    };
};

export default withFirebase(Logout);
