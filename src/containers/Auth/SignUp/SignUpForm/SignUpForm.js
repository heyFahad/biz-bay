import React, { Component } from 'react';

import cssClasses from './SignUpForm.module.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { updateObject } from '../../../../utils/updateObject';
import { checkInputFieldValidity } from '../../../../utils/validators/checkInputFieldValidity';

class SignUpForm extends Component {
  state = {
    signUpForm: {
      displayName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Display Name*'
        },
        value: '',
        validationRules: {
          isRequired: true
        },
        isValid: false,
        isTouched: false,
        isFocused: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email*',
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
      phoneNo: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '+923XZYYYYYYY*',
          autoComplete: 'username'
        },
        value: '',
        validationRules: {
          isRequired: true,
          isPhoneNo: true
        },
        isValid: false,
        isTouched: false,
        isFocused: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password*',
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
    const formElement = this.state.signUpForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isTouched: true,
      isFocused: true
    });
    const updatedSignUpForm = updateObject(this.state.signUpForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      signUpForm: updatedSignUpForm
    });
  };

  inputChangedHandler = (event, formElementId) => {
    const formElement = this.state.signUpForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      value: event.target.value
    });
    const updatedSignUpForm = updateObject(this.state.signUpForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      signUpForm: updatedSignUpForm
    });
  };

  focusBlurredHandler = (event, formElementId) => {
    const formElement = this.state.signUpForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isValid: checkInputFieldValidity(
        event.target.value,
        this.state.signUpForm[formElementId].validationRules
      ),
      isFocused: false
    });
    const updatedSignUpForm = updateObject(this.state.signUpForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      signUpForm: updatedSignUpForm
    });
  };

  submitSignUpFormData = (event) => {
    event.preventDefault();

    const formData = {};
    // eslint-disable-next-line
    for (let formField in this.state.signUpForm) {
      formData[formField] = this.state.signUpForm[formField].value;
    }

    this.props.doSignUp(formData);

    /* const clearedDisplayName = updateObject(this.state.signUpForm.displayName, { value: '' });
        const clearedEmail = updateObject(this.state.signUpForm.email, { value: '' });
        const clearedPhoneNo = updateObject(this.state.signUpForm.phoneNo, { value: '' });
        const clearedPassword = updateObject(this.state.signUpForm.password, { value: '' });
        const updatedSignUpForm = updateObject(this.state.signUpForm, {
            displayName: clearedDisplayName,
            email: clearedEmail,
            phoneNo: clearedPhoneNo,
            password: clearedPassword
        });

        this.setState({
            signUpForm: updatedSignUpForm
        }); */
  };

  render() {
    const inputElementsArray = [];
    // eslint-disable-next-line
    for (const inputIdentifier in this.state.signUpForm) {
      inputElementsArray.push({
        id: inputIdentifier,
        config: this.state.signUpForm[inputIdentifier]
      });
    }

    let signUpForm = null;
    signUpForm = (
      <form onSubmit={this.submitSignUpFormData}>
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
        <div className={cssClasses.ProceedButton}>
          <Button id={this.props.proceedButtonId}>Proceed</Button>
        </div>
      </form>
    );

    return (
      <React.Fragment>
        <h1 className={cssClasses.FormTitle}>Sign Up</h1>
        {signUpForm}
      </React.Fragment>
    );
  }
}

export default SignUpForm;
