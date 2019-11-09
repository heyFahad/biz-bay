import React, { Component } from 'react';
import { connect } from 'react-redux';

import cssClasses from './Landing.module.css';
import SignUpModal from '../../containers/Auth/SignUp/SignUp';
import LoginWidget from '../Auth/Login/LoginWidget/LoginWidget';
import VideoPoster from '../../assets/images/intro-video-poster.jpg';
import * as ANCHORS from '../../constants/anchors';

class Landing extends Component {
  state = {
    showSignUpModal: false,
    HeroImage: null
  };

  toggleSignUpFormHandler = () => {
    this.setState((prevState) => {
      return { showSignUpModal: !prevState.showSignUpModal };
    });
  };

  render() {
    return (
      <React.Fragment>
        <SignUpModal
          show={this.state.showSignUpModal}
          hide={this.toggleSignUpFormHandler}
        />

        <section className={cssClasses.Hero}>
          <div className={cssClasses.HeroImage}>
            <img
              src={this.state.HeroImage}
              alt="Hero"
              width="100%"
              height="40rem"
            />
            <div className={cssClasses.Backdrop}></div>
          </div>
          {this.props.isUserAuthenticated ? null : (
            <LoginWidget signUp={this.toggleSignUpFormHandler} />
          )}
        </section>

        <section id={ANCHORS.HOW_IT_WORKS} className={cssClasses.Section}>
          <h1 className={cssClasses.SectionTitle}>How it Works</h1>
          <div className={cssClasses.Intro}>
            <div className={cssClasses.IntroText}>
              <h2 className={cssClasses.IntroTitle}>Lorem Ipsum</h2>
              <p className={cssClasses.IntroDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>
            <div className={cssClasses.IntroVideo}>
              <video width="784" poster={VideoPoster} controls>
                <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" />
                Sorry, your browser doesn't support embedded videos, but don't
                worry, you can{' '}
                <a href="https://archive.org/details/BigBuckBunny_124">
                  download it
                </a>{' '}
                and watch it with your favorite video player!
              </video>
            </div>
          </div>
        </section>

        <section
          id={ANCHORS.TOP_RATED_INFLUENCERS}
          className={cssClasses.Section}>
          <h1 className={cssClasses.SectionTitle}>Top Rated Influencers</h1>
          <div></div>
        </section>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState({ HeroImage: require('../../assets/images/hero-image.jpg') });
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.firebase.isUserAuthenticated
  };
};

export default connect(mapStateToProps)(Landing);
