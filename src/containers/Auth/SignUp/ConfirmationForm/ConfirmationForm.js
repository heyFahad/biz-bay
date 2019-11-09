import React, { Component } from 'react';

import cssClasses from './ConfirmationForm.module.css';
import Input from '../../../../components/UI/Input/Input';
import Button from '../../../../components/UI/Button/Button';
import { updateObject } from '../../../../utils/updateObject';
import { checkInputFieldValidity } from '../../../../utils/validators/checkInputFieldValidity';

class ConfirmationForm extends Component {
  state = {
    confirmationForm: {
      verificationCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: '------'
        },
        value: '',
        validationRules: {
          isRequired: true
        },
        isValid: false,
        isTouched: false,
        isFocused: false
      }
    }
  };

  focusGainedHandler = (formElementId) => {
    const formElement = this.state.confirmationForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isTouched: true,
      isFocused: true
    });
    const updatedConfirmationForm = updateObject(this.state.confirmationForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      confirmationForm: updatedConfirmationForm
    });
  };

  inputChangedHandler = (event, formElementId) => {
    const formElement = this.state.confirmationForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      value: event.target.value
    });
    const updatedConfirmationForm = updateObject(this.state.confirmationForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      confirmationForm: updatedConfirmationForm
    });
  };

  focusBlurredHandler = (event, formElementId) => {
    const formElement = this.state.confirmationForm[formElementId];
    const updatedFormElement = updateObject(formElement, {
      isValid: checkInputFieldValidity(
        event.target.value,
        this.state.confirmationForm[formElementId].validationRules
      ),
      isFocused: false
    });
    const updatedConfirmationForm = updateObject(this.state.confirmationForm, {
      [formElementId]: updatedFormElement
    });

    this.setState({
      confirmationForm: updatedConfirmationForm
    });
  };

  submitVerificationCode = (event) => {
    event.preventDefault();

    const formData = {};
    // eslint-disable-next-line
    for (let formField in this.state.confirmationForm) {
      formData[formField] = this.state.confirmationForm[formField].value;
    }

    this.props.confirmCode(formData);
  };

  render() {
    const inputElementsArray = [];
    // eslint-disable-next-line
    for (const inputIdentifier in this.state.confirmationForm) {
      inputElementsArray.push({
        id: inputIdentifier,
        config: this.state.confirmationForm[inputIdentifier]
      });
    }

    let confirmationForm = null;
    confirmationForm = (
      <form onSubmit={this.submitVerificationCode}>
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
          <Button id={this.props.confirmButtonId}>Confirm</Button>
        </div>
      </form>
    );

    return (
      <React.Fragment>
        <h1 className={cssClasses.FormTitle}>Confirmation</h1>
        {confirmationForm}
      </React.Fragment>
    );
  }
}

export default ConfirmationForm;
