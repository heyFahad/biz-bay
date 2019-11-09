import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import cssClasses from './LoginForm.module.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { updateObject } from '../../../../utils/updateObject';
import { checkInputFieldValidity } from '../../../../utils/validators/checkInputFieldValidity';
import { withFirebase } from '../../../../firebase';
import * as ROUTES from '../../../../constants/routes';

class Login extends Component {
  state = {
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Username',
          autoComplete: 'username'
        },
        value: '',
        validationRules: {
          isRequired: true,
          isEmail: true
        },
        isValid: false,
        isTouched: false,
        isFocused: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          autoComplete: 'new-password'
        },
        value: '',
        validationRules: {
          isRequired: true,
          minLength: 6
        },
        isValid: false,
        isTouched: false,
        isFocused: false
      }
    }
  };

  focusGainedHandler = (formElementId) => {
    const formElement = this.state.loginForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isTouched: true,
      isFocused: true
    });
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      loginForm: updatedLoginForm
    });
  };

  inputChangedHandler = (event, formElementId) => {
    const formElement = this.state.loginForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      value: event.target.value
    });
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      loginForm: updatedLoginForm
    });
  };

  focusBlurredHandler = (event, formElementId) => {
    const formElement = this.state.loginForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isValid: checkInputFieldValidity(
        event.target.value,
        this.state.loginForm[formElementId].validationRules
      ),
      isFocused: false
    });
    const updatedLoginForm = updateObject(this.state.loginForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      loginForm: updatedLoginForm
    });
  };

  loginRequestHandler = (event) => {
    event.preventDefault();

    const formData = {};
    // eslint-disable-next-line
    for (let formField in this.state.loginForm) {
      formData[formField] = this.state.loginForm[formField].value;
    }

    const { firebase } = this.props;
    firebase
      .doSignInWithEmailAndPassword(formData)
      .then(() => {
        const clearedEmail = updateObject(this.state.loginForm.email, {
          value: ''
        });
        const clearedPassword = updateObject(this.state.loginForm.password, {
          value: ''
        });
        const updatedLoginForm = updateObject(this.state.loginForm, {
          email: clearedEmail,
          password: clearedPassword
        });
        this.setState({
          loginForm: updatedLoginForm
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    const inputElementsArray = [];
    // eslint-disable-next-line
    for (const inputIdentifier in this.state.loginForm) {
      inputElementsArray.push({
        id: inputIdentifier,
        config: this.state.loginForm[inputIdentifier]
      });
    }

    let loginForm = null;
    loginForm = (
      <form onSubmit={this.loginRequestHandler}>
        {inputElementsArray.map((inputElement) => {
          return (
            <Input
              key={inputElement.id}
              id={inputElement.id}
              elementType={inputElement.config.elementType}
              elementConfig={inputElement.config.elementConfig}
              required={inputElement.config.validationRules.isRequired}
              invalid={!inputElement.config.isValid}
              touched={inputElement.config.isTouched}
              isFocused={inputElement.config.isFocused}
              value={inputElement.config.value}
              focused={() => this.focusGainedHandler(inputElement.id)}
              changed={(event) =>
                this.inputChangedHandler(event, inputElement.id)
              }
              blurred={(event) =>
                this.focusBlurredHandler(event, inputElement.id)
              }
            />
          );
        })}
        <div className={cssClasses.LoginButton}>
          <Button>Login</Button>
        </div>
      </form>
    );

    return (
      <React.Fragment>
        {loginForm}
        <div className={cssClasses.ResetPassword}>
          Forgot your password?{' '}
          <span>
            <NavLink
              to={ROUTES.RESET_PASSWORD}
              activeClassName={cssClasses.active}>
              Click here
            </NavLink>
          </span>
        </div>
      </React.Fragment>
    );
  }
}

export default withFirebase(Login);
