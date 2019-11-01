import React, { Component } from 'react';
import { connect } from 'react-redux';

import cssClasses from './Landing.module.css';
import SignUpModal from '../../containers/Auth/SignUp/SignUp';
import LoginWidget from '../Auth/Login/LoginWidget/LoginWidget';

class Landing extends Component {
    state = {
        showSignUpModal: false,
        HeroImage: null
    };

    toggleSignUpFormHandler = () => {
        this.setState((prevState) => {
            return { showSignUpModal: !prevState.showSignUpModal }
        });
    };

    render() {
        return (
            <React.Fragment>
                <SignUpModal
                    show={this.state.showSignUpModal}
                    hide={this.toggleSignUpFormHandler} />
                <section className={cssClasses.Hero}>
                    <div className={cssClasses.HeroImage}>
                        <img
                            src={this.state.HeroImage}
                            alt="Hero"
                            width="100%"
                            height="40rem" />
                        <div className={cssClasses.Backdrop}></div>
                    </div>
                    {this.props.isUserAuthenticated ?
                        null :
                        <LoginWidget signUp={this.toggleSignUpFormHandler} />}
                </section>
            </React.Fragment>
        );
    };

    componentDidMount() {
        this.setState({ HeroImage: require('../../assets/images/hero-image.jpg') });
    };
}

const mapStateToProps = (state) => {
    return {
        isUserAuthenticated: state.firebase.isUserAuthenticated
    };
};

export default connect(mapStateToProps)(Landing);
