import React, { Component } from 'react';

import cssClasses from './SignUp.module.css';
import Modal from '../../../components/UI/Modal/Modal';
import SignUpForm from './SignUpForm/SignUpForm';
import ConfirmationForm from './ConfirmationForm/ConfirmationForm';
import { withFirebase } from '../../../firebase';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUpForm: true
    };
    this.signUpButtonId = 'proceed-to-sign-up-button';
    this.confirmButtonId = 'confirm-verification-code-button';
  }

  reRenderRecaptchaVerifier = () => {
    this.recaptchaVerifier.render();
  };

  createRecaptchaVerifier = () => {
    const recaptchaConfig = {
      buttonId: this.signUpButtonId,
      renderParameters: {
        size: 'invisible'
      }
    };

    const { firebase } = this.props;
    return firebase.doCreateInvisibleRecaptchaVerifier(recaptchaConfig);
  };

  signUpRequestHandler = (formData) => {
    console.log({ formData });
    const { firebase } = this.props;
    this.signUpFormData = formData;
    this.recaptchaVerifier = this.createRecaptchaVerifier();
    firebase
      .doSignInWithPhoneNumber({
        formData: formData,
        applicationVerifier: this.recaptchaVerifier
      })
      .then((confirmationResult) => {
        console.log({ confirmationResult });
        this.confirmationResult = confirmationResult;
        // this.recaptchaVerifier.clear();
        this.setState({ showSignUpForm: false });
      })
      .catch((error) => {
        console.log({ error });
        this.reRenderRecaptchaVerifier();
      });
  };

  confirmPhoneAuthVerificationCode = ({ verificationCode }) => {
    const { firebase } = this.props;
    this.confirmationResult
      .confirm(verificationCode)
      .then((userCredential) => {
        console.log({ userCredential });
        firebase.currentUser = userCredential.user;
        const emailAuthCredential = firebase.doCreateEmailPasswordAuthCredential(
          this.signUpFormData
        );
        firebase
          .doLinkWithCredential({ credential: emailAuthCredential })
          .then((userCredential) => {
            console.log({ userCredential });
            firebase.currentUser = userCredential.user;
            firebase.doUserProfileUpdate(this.signUpFormData).then(() => {
              console.log('PROFILE UPDATED AS WELL!!');
            });
          });
      })
      .catch((error) => {
        console.log({ error });
        firebase.doDeleteUser();
      });
  };

  render() {
    return (
      <Modal showBackdrop={this.props.show} backdropClicked={this.props.hide}>
        <div className={cssClasses.SignUp}>
          {this.state.showSignUpForm ? (
            <SignUpForm
              proceedButtonId={this.signUpButtonId}
              doSignUp={this.signUpRequestHandler}
            />
          ) : (
            <ConfirmationForm
              confirmButtonId={this.confirmButtonId}
              confirmCode={this.confirmPhoneAuthVerificationCode}
            />
          )}
        </div>
      </Modal>
    );
  }
}

export default withFirebase(SignUp);
